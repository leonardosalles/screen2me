import { Inject, Injectable, Logger, OnModuleDestroy } from "@nestjs/common";
import { randomUUID } from "node:crypto";
import type { IncomingMessage } from "node:http";
import type { Server as HttpServer } from "node:http";
import { RawData, WebSocket, WebSocketServer } from "ws";
import { PrismaService } from "../prisma.service";

const SESSION_COOKIE = "screen2me_sid";
const ANONYMOUS_LIMIT_SECONDS = 15 * 60;

type ClientUser = {
  id: string | null;
  username: string | null;
  name: string | null;
  email: string | null;
};

type Client = WebSocket & {
  id: string;
  sessionId: string;
  roomId: string | null;
  role: "host" | "viewer" | null;
  user: ClientUser | null;
  usageId: bigint | null;
  usageStartedAt: number | null;
  trialTimer: NodeJS.Timeout | null;
  trialEndsAt: number | null;
};

type Room = {
  host: Client | null;
  viewers: Set<Client>;
};

@Injectable()
export class RealtimeService implements OnModuleDestroy {
  private readonly logger = new Logger(RealtimeService.name);
  private readonly rooms = new Map<string, Room>();
  private readonly memoryAnonymousUsage = new Map<string, number>();
  private server: WebSocketServer | null = null;

  constructor(@Inject(PrismaService) private readonly prisma: PrismaService) {}

  bind(httpServer: HttpServer) {
    if (this.server) return;

    this.server = new WebSocketServer({ server: httpServer });
    this.server.on("connection", (socket, request) => this.handleConnection(socket as Client, request));
    this.logger.log("WebSocket signaling server attached");
  }

  onModuleDestroy() {
    this.server?.close();
  }

  private async handleConnection(socket: Client, request: IncomingMessage) {
    socket.id = randomUUID();
    socket.sessionId = this.sessionIdFromRequest(request);
    socket.roomId = null;
    socket.role = null;
    socket.user = await this.findUser(socket.sessionId);
    socket.usageId = null;
    socket.usageStartedAt = null;
    socket.trialTimer = null;
    socket.trialEndsAt = null;

    socket.on("message", (raw) => this.handleMessage(socket, raw));
    socket.on("close", () => this.leaveRoom(socket));
    this.send(socket, {
      type: "profile",
      user: this.publicUser(socket),
      anonymousLimitSeconds: ANONYMOUS_LIMIT_SECONDS
    });
  }

  private async handleMessage(socket: Client, raw: RawData) {
    let message: any;
    try {
      message = JSON.parse(raw.toString());
    } catch {
      return;
    }

    if (message.type === "host-room") {
      this.applyClientProfile(socket, message.profile);
      await this.hostRoom(socket, message.roomId);
      return;
    }

    if (message.type === "join-room") {
      this.applyClientProfile(socket, message.profile);
      await this.joinRoom(socket, message.roomId);
      return;
    }

    if (message.type === "leave-room") {
      this.leaveRoom(socket);
      return;
    }

    if (message.type === "signal") {
      const delivered = this.sendTo(message.to, {
        type: "signal",
        from: socket.id,
        signal: message.signal
      });
      if (!delivered) {
        this.send(socket, { type: "peer-missing", peerId: message.to });
      }
    }

    if (message.type === "request-relay") {
      const room = socket.roomId ? this.rooms.get(socket.roomId) : null;
      if (socket.role === "viewer" && room?.host?.readyState === WebSocket.OPEN) {
        this.send(room.host, { type: "relay-requested", viewerId: socket.id });
      }
      return;
    }

    if (message.type === "relay-start" || message.type === "relay-chunk" || message.type === "relay-stop") {
      if (socket.role !== "host") return;
      const payload = {
        ...message,
        from: socket.id
      };
      if (typeof message.to === "string") {
        this.sendTo(message.to, payload);
      }
      return;
    }
  }

  private async hostRoom(socket: Client, requestedRoomId?: string) {
    const roomId = requestedRoomId || this.makeRoomId();
    const existing = this.rooms.get(roomId);

    if (existing?.host && existing.host.readyState === WebSocket.OPEN) {
      this.send(socket, { type: "room-error", message: "Essa sala ja tem um apresentador." });
      return;
    }

    this.leaveRoom(socket);
    socket.role = "host";
    socket.roomId = roomId;
    const usageStarted = await this.startUsage(socket, roomId, "host");
    if (!usageStarted) {
      socket.role = null;
      socket.roomId = null;
      return;
    }

    const room = existing || { host: null, viewers: new Set<Client>() };
    room.host = socket;
    this.rooms.set(roomId, room);

    const readyViewers: Client[] = [];
    for (const viewer of [...room.viewers]) {
      if (!(await this.ensureViewerUsage(viewer, roomId))) {
        room.viewers.delete(viewer);
        continue;
      }
      readyViewers.push(viewer);
      this.send(viewer, {
        type: "host-ready",
        roomId,
        hostId: socket.id,
        host: this.publicUser(socket),
        trial: this.trialPayload(viewer)
      });
    }

    this.send(socket, {
      type: "room-hosted",
      roomId,
      viewers: readyViewers.map((viewer) => viewer.id),
      host: this.publicUser(socket),
      audience: this.audience(room),
      trial: this.trialPayload(socket)
    });
    this.broadcastAudience(room);
  }

  private async joinRoom(socket: Client, roomId?: string) {
    if (!roomId) {
      this.send(socket, { type: "room-error", message: "Link sem sala." });
      return;
    }

    const room = this.rooms.get(roomId) || { host: null, viewers: new Set<Client>() };
    const hostOnline = Boolean(room.host && room.host.readyState === WebSocket.OPEN);

    this.leaveRoom(socket);
    socket.role = "viewer";
    socket.roomId = roomId;
    if (hostOnline && !(await this.startUsage(socket, roomId, "viewer"))) {
      socket.role = null;
      socket.roomId = null;
      return;
    }

    room.viewers.add(socket);
    this.rooms.set(roomId, room);

    this.send(socket, {
      type: "viewer-joined",
      roomId,
      viewerId: socket.id,
      hostOnline,
      host: room.host ? this.publicUser(room.host) : null,
      audience: this.audience(room),
      trial: this.trialPayload(socket)
    });

    if (hostOnline && room.host) {
      this.send(room.host, { type: "viewer-ready", viewerId: socket.id, viewer: this.publicUser(socket) });
    }
    this.broadcastAudience(room);
  }

  private leaveRoom(socket: Client) {
    this.endUsage(socket);
    if (socket.trialTimer) {
      clearTimeout(socket.trialTimer);
      socket.trialTimer = null;
    }
    socket.trialEndsAt = null;
    if (!socket.roomId) return;

    const room = this.rooms.get(socket.roomId);
    if (!room) return;

    if (socket.role === "host" && room.host === socket) {
      room.host = null;
      for (const viewer of room.viewers) {
        this.pauseUsage(viewer);
        this.send(viewer, { type: "host-left" });
      }
    }

    if (socket.role === "viewer") {
      room.viewers.delete(socket);
      if (room.host && room.host.readyState === WebSocket.OPEN) {
        this.send(room.host, { type: "viewer-left", viewerId: socket.id });
      }
      this.broadcastAudience(room);
    }

    if (!room.host && room.viewers.size === 0) {
      this.rooms.delete(socket.roomId);
    }

    socket.roomId = null;
    socket.role = null;
  }

  private broadcastAudience(room: Room) {
    const payload = {
      type: "audience-updated",
      audience: this.audience(room),
      viewerCount: room.viewers.size
    };
    if (room.host && room.host.readyState === WebSocket.OPEN) {
      this.send(room.host, payload);
    }
    for (const viewer of room.viewers) {
      this.send(viewer, payload);
    }
  }

  private sendTo(socketId: string, payload: unknown) {
    for (const room of this.rooms.values()) {
      const sockets = [room.host, ...room.viewers].filter(Boolean) as Client[];
      const target = sockets.find((candidate) => candidate.id === socketId);
      if (target) {
        this.send(target, payload);
        return true;
      }
    }
    return false;
  }

  private send(socket: Client, payload: unknown) {
    if (socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify(payload));
    }
  }

  private makeRoomId() {
    return `${Math.random().toString(36).slice(2, 6)}-${Math.random().toString(36).slice(2, 6)}`;
  }

  private audience(room: Room) {
    return [...room.viewers]
      .map((viewer) => this.publicUser(viewer))
      .filter((user): user is NonNullable<ReturnType<typeof this.publicUser>> => Boolean(user?.username || user?.name));
  }

  private publicUser(socket: Client) {
    if (!socket.user) return null;
    return {
      id: socket.user.id,
      username: socket.user.username,
      name: socket.user.name,
      displayName: socket.user.username ? `@${socket.user.username}` : socket.user.name || socket.user.email || null
    };
  }

  private trialPayload(socket: Client) {
    if (socket.user || !socket.trialEndsAt) return null;
    return {
      limitSeconds: ANONYMOUS_LIMIT_SECONDS,
      endsAt: socket.trialEndsAt
    };
  }

  private pauseUsage(socket: Client) {
    this.endUsage(socket);
    if (socket.trialTimer) {
      clearTimeout(socket.trialTimer);
      socket.trialTimer = null;
    }
    socket.trialEndsAt = null;
  }

  private async ensureViewerUsage(socket: Client, roomId: string) {
    if (socket.role !== "viewer") return false;
    if (socket.user) {
      if (socket.usageId || socket.usageStartedAt) return true;
      return this.startUsage(socket, roomId, "viewer");
    }
    if (socket.usageStartedAt) return true;
    return this.startUsage(socket, roomId, "viewer");
  }

  private async startUsage(socket: Client, roomId: string, role: "host" | "viewer") {
    if (!socket.user) {
      const usedSeconds = await this.getAnonymousUsedSeconds(socket.sessionId);
      const remainingSeconds = Math.max(0, ANONYMOUS_LIMIT_SECONDS - usedSeconds);
      if (remainingSeconds <= 0) {
        this.send(socket, { type: "trial-ended", role });
        socket.close(4000, "anonymous trial ended");
        return false;
      }

      socket.usageStartedAt = Date.now();
      socket.trialEndsAt = Date.now() + remainingSeconds * 1000;
      socket.trialTimer = setTimeout(() => {
        this.send(socket, { type: "trial-ended", role });
        socket.close(4000, "anonymous trial ended");
      }, remainingSeconds * 1000);
    }

    if (!this.prisma.enabled) return true;

    try {
      const usage = await this.prisma.streamUsage.create({
        data: {
          userId: socket.user?.id || null,
          sessionId: socket.sessionId,
          roomId,
          role,
          limitSeconds: socket.user ? null : ANONYMOUS_LIMIT_SECONDS
        },
        select: { id: true }
      });
      socket.usageId = usage.id;
      socket.usageStartedAt = Date.now();
    } catch (error: any) {
      this.logger.warn(`Could not create stream usage: ${error.message}`);
    }

    return true;
  }

  private endUsage(socket: Client) {
    if (!socket.usageId || !this.prisma.enabled) {
      if (!this.prisma.enabled && !socket.user && socket.usageStartedAt) {
        const elapsedSeconds = Math.max(0, Math.round((Date.now() - socket.usageStartedAt) / 1000));
        this.memoryAnonymousUsage.set(socket.sessionId, this.getMemoryAnonymousUsedSeconds(socket.sessionId) + elapsedSeconds);
      }
      socket.usageId = null;
      socket.usageStartedAt = null;
      return;
    }

    const usageId = socket.usageId;
    socket.usageId = null;
    socket.usageStartedAt = null;
    this.prisma.streamUsage
      .findUnique({ where: { id: usageId }, select: { startedAt: true } })
      .then((usage) => {
        if (!usage) return null;
        const durationSeconds = Math.max(0, Math.round((Date.now() - usage.startedAt.getTime()) / 1000));
        return this.prisma.streamUsage.update({
          where: { id: usageId },
          data: { endedAt: new Date(), durationSeconds }
        });
      })
      .catch((error) => this.logger.warn(`Could not update stream usage: ${error.message}`));
  }

  private async getAnonymousUsedSeconds(sessionId: string) {
    if (!this.prisma.enabled) {
      return this.getMemoryAnonymousUsedSeconds(sessionId);
    }

    const usages = await this.prisma.streamUsage.findMany({
      where: { sessionId, userId: null },
      select: { startedAt: true, endedAt: true, durationSeconds: true }
    });

    const now = Date.now();
    return usages.reduce((total, usage) => {
      if (usage.endedAt) return total + usage.durationSeconds;
      return total + Math.max(0, Math.round((now - usage.startedAt.getTime()) / 1000));
    }, 0);
  }

  private getMemoryAnonymousUsedSeconds(sessionId: string) {
    return this.memoryAnonymousUsage.get(sessionId) || 0;
  }

  private async findUser(sessionId: string) {
    if (!this.prisma.enabled) return null;
    return this.prisma.user
      .findUnique({
        where: { sessionId },
        select: { id: true, username: true, name: true, email: true }
      })
      .catch(() => null);
  }

  private applyClientProfile(socket: Client, profile: unknown) {
    if (this.prisma.enabled || socket.user) return;
    if (!profile || typeof profile !== "object" || Array.isArray(profile)) return;
    const body = profile as Record<string, unknown>;
    const rawUsername = typeof body.username === "string" ? body.username.replace(/^@+/, "").slice(0, 40).toLowerCase() : null;
    const username = rawUsername && /^[a-z0-9_]{3,40}$/.test(rawUsername) ? rawUsername : null;
    const name = typeof body.name === "string" ? body.name.slice(0, 120) : null;
    if (!username && !name) return;
    socket.user = {
      id: null,
      username,
      name,
      email: null
    };
  }

  private sessionIdFromRequest(request: IncomingMessage) {
    const value = this.parseCookies(request.headers.cookie || "")[SESSION_COOKIE];
    return value && /^[a-f0-9-]{36}$/i.test(value) ? value : randomUUID();
  }

  private parseCookies(cookieHeader: string) {
    return Object.fromEntries(
      cookieHeader
        .split(";")
        .map((part) => part.trim().split("="))
        .filter(([key, value]) => key && value)
        .map(([key, value]) => [key, decodeURIComponent(value)])
    );
  }
}
