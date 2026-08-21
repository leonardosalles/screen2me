import { BadRequestException, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import bcrypt from "bcryptjs";
import {
  createCipheriv,
  createDecipheriv,
  createHash,
  generateKeyPairSync,
  privateDecrypt,
  randomBytes,
  constants
} from "node:crypto";
import { PrismaService } from "../prisma.service";

type PublicUser = {
  id: string | null;
  username: string | null;
  name: string | null;
  email: string | null;
  language: string | null;
  roomPasswordEnabled: boolean;
  roomPasswordShareToken?: string | null;
};

type MemoryUser = PublicUser & {
  roomPasswordHash: string | null;
};

@Injectable()
export class AuthService {
  private readonly memoryUsersBySession = new Map<string, MemoryUser>();
  private readonly memoryUsersByEmail = new Map<string, MemoryUser>();
  private readonly memoryUsersByUsername = new Map<string, MemoryUser>();
  private readonly memoryPasswordsByEmail = new Map<string, string>();
  private readonly clientSecretKeys = generateKeyPairSync("rsa", { modulusLength: 2048 });
  private readonly roomPasswordTokenKey = createHash("sha256")
    .update(
      process.env.ROOM_PASSWORD_TOKEN_SECRET ||
        process.env.SESSION_SECRET ||
        process.env.DATABASE_URL ||
        "screen2.me-local-room-password-secret"
    )
    .digest();

  constructor(@Inject(PrismaService) private readonly prisma: PrismaService) {}

  get persistenceEnabled() {
    return this.prisma.enabled;
  }

  clientCryptoKey() {
    return this.clientSecretKeys.publicKey.export({ format: "jwk" });
  }

  async currentUser(sessionId: string) {
    if (!this.prisma.enabled) {
      return this.publicMemoryUser(this.memoryUsersBySession.get(sessionId));
    }

    return this.prisma.user.findUnique({
      where: { sessionId },
      select: { id: true, username: true, name: true, email: true, language: true, roomPasswordEnabled: true }
    });
  }

  async publicUserByUsername(username: string) {
    const cleanUsername = username.replace(/^@+/, "").toLowerCase();
    if (!/^[a-z0-9_]{3,40}$/.test(cleanUsername)) return null;

    if (!this.prisma.enabled) {
      const user = this.memoryUsersByUsername.get(cleanUsername);
      return user
        ? {
            id: user.id,
            username: user.username,
            name: user.name,
            displayName: user.username ? `@${user.username}` : user.name,
            roomPasswordEnabled: user.roomPasswordEnabled
          }
        : null;
    }

    const user = await this.prisma.user
      .findUnique({
        where: { username: cleanUsername },
        select: { id: true, username: true, name: true, roomPasswordEnabled: true }
      })
      .catch(() => null);

    return user
      ? {
          id: user.id,
          username: user.username,
          name: user.name,
          displayName: user.username ? `@${user.username}` : user.name,
          roomPasswordEnabled: user.roomPasswordEnabled
        }
      : null;
  }

  async verifyRoomPassword(username: string, password: unknown) {
    const cleanUsername = username.replace(/^@+/, "").toLowerCase();
    if (!/^[a-z0-9_]{3,40}$/.test(cleanUsername)) return true;
    const providedPassword =
      this.decryptClientSecret(password) || this.decryptRoomPasswordToken(typeof password === "string" ? password : "") || "";

    if (!this.prisma.enabled) {
      const user = this.memoryUsersByUsername.get(cleanUsername);
      if (!user?.roomPasswordEnabled || !user.roomPasswordHash) return true;
      return providedPassword ? bcrypt.compare(providedPassword, user.roomPasswordHash) : false;
    }

    const user = await this.prisma.user
      .findUnique({
        where: { username: cleanUsername },
        select: { roomPasswordEnabled: true, roomPasswordHash: true }
      })
      .catch(() => null);

    if (!user?.roomPasswordEnabled || !user.roomPasswordHash) return true;
    return providedPassword ? bcrypt.compare(providedPassword, user.roomPasswordHash) : false;
  }

  async register(sessionId: string, input: unknown) {
    const body = this.object(input);
    const email = this.email(body.email);
    const username = this.username(body.username);
    const password = this.password(body.password);
    const name = this.cleanText(body.name, 120);
    const language = this.cleanText(body.language, 12);
    const passwordHash = await bcrypt.hash(password, 12);

    if (!this.prisma.enabled) {
      if (this.memoryPasswordsByEmail.has(email) || this.memoryUsersByUsername.has(username)) {
        throw new BadRequestException("Email or username already registered");
      }
      const user = { id: null, username, name, email, language, roomPasswordEnabled: false, roomPasswordHash: null };
      this.memoryUsersBySession.set(sessionId, user);
      this.memoryUsersByEmail.set(email, user);
      this.memoryUsersByUsername.set(username, user);
      this.memoryPasswordsByEmail.set(email, passwordHash);
      return this.publicMemoryUser(user);
    }

    try {
      return await this.prisma.user.upsert({
        where: { sessionId },
        update: { username, name, email, language, passwordHash },
        create: { sessionId, username, name, email, language, passwordHash },
        select: { id: true, username: true, name: true, email: true, language: true, roomPasswordEnabled: true }
      });
    } catch {
      throw new BadRequestException("Email or username already registered");
    }
  }

  async login(sessionId: string, input: unknown) {
    const body = this.object(input);
    const email = this.email(body.email);
    const password = this.password(body.password);

    if (!this.prisma.enabled) {
      const hash = this.memoryPasswordsByEmail.get(email);
      if (!hash || !(await bcrypt.compare(password, hash))) {
        throw new UnauthorizedException("Invalid email or password");
      }
      const existing = this.memoryUsersByEmail.get(email);
      const user = existing || {
        id: null,
        username: null,
        name: null,
        email,
        language: null,
        roomPasswordEnabled: false,
        roomPasswordHash: null
      };
      this.memoryUsersBySession.set(sessionId, user);
      return this.publicMemoryUser(user);
    }

    const user = await this.prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        username: true,
        name: true,
        email: true,
        language: true,
        roomPasswordEnabled: true,
        passwordHash: true
      }
    });

    if (!user?.passwordHash || !(await bcrypt.compare(password, user.passwordHash))) {
      throw new UnauthorizedException("Invalid email or password");
    }

    return this.prisma.user.update({
      where: { id: user.id },
      data: { sessionId },
      select: { id: true, username: true, name: true, email: true, language: true, roomPasswordEnabled: true }
    });
  }

  async updateProfile(sessionId: string, input: unknown) {
    const current = await this.currentUser(sessionId);
    if (!current) {
      throw new UnauthorizedException("Login required");
    }

    const body = this.object(input);
    const username = this.username(body.username);
    const name = this.cleanText(body.name, 120);
    const shouldUpdateRoomPassword = typeof body.roomPasswordEnabled === "boolean";
    const roomPasswordEnabled = shouldUpdateRoomPassword ? body.roomPasswordEnabled === true : current.roomPasswordEnabled;
    const roomPassword = this.optionalRoomPassword(body.roomPassword);

    if (!this.prisma.enabled) {
      const user = this.memoryUsersBySession.get(sessionId);
      if (!user) throw new UnauthorizedException("Login required");
      const existing = this.memoryUsersByUsername.get(username);
      if (existing && existing !== user) {
        throw new BadRequestException("Username already registered");
      }
      if (user.username) this.memoryUsersByUsername.delete(user.username);
      user.username = username;
      user.name = name;
      if (shouldUpdateRoomPassword) {
        user.roomPasswordEnabled = roomPasswordEnabled;
        if (roomPassword) user.roomPasswordHash = await bcrypt.hash(roomPassword, 12);
        if (roomPasswordEnabled && !user.roomPasswordHash) {
          throw new BadRequestException("Room password required");
        }
        if (!roomPasswordEnabled) user.roomPasswordHash = null;
      }
      this.memoryUsersByUsername.set(username, user);
      if (user.email) this.memoryUsersByEmail.set(user.email, user);
      this.memoryUsersBySession.set(sessionId, user);
      return this.publicMemoryUser(user, roomPassword);
    }

    const currentConfig = await this.prisma.user.findUnique({
      where: { sessionId },
      select: { roomPasswordHash: true }
    });
    if (shouldUpdateRoomPassword && roomPasswordEnabled && !roomPassword && !currentConfig?.roomPasswordHash) {
      throw new BadRequestException("Room password required");
    }

    try {
      const user = await this.prisma.user.update({
        where: { sessionId },
        data: {
          username,
          name,
          ...(shouldUpdateRoomPassword
            ? {
                roomPasswordEnabled,
                roomPasswordHash: roomPasswordEnabled
                  ? roomPassword
                    ? await bcrypt.hash(roomPassword, 12)
                    : undefined
                  : null
              }
            : {})
        },
        select: { id: true, username: true, name: true, email: true, language: true, roomPasswordEnabled: true }
      });
      return {
        ...user,
        roomPasswordShareToken: roomPasswordEnabled && roomPassword ? this.encryptRoomPasswordToken(roomPassword) : null
      };
    } catch {
      throw new BadRequestException("Username already registered");
    }
  }

  async logout(sessionId: string) {
    if (!this.prisma.enabled) {
      this.memoryUsersBySession.delete(sessionId);
      return;
    }

    await this.prisma.user.update({ where: { sessionId }, data: { sessionId: `${sessionId}:logged-out` } }).catch(() => {});
  }

  private object(input: unknown): Record<string, any> {
    return input && typeof input === "object" && !Array.isArray(input) ? (input as Record<string, any>) : {};
  }

  private cleanText(value: unknown, maxLength: number) {
    if (typeof value !== "string") return null;
    const trimmed = value.trim();
    return trimmed ? trimmed.slice(0, maxLength) : null;
  }

  private email(value: unknown) {
    const email = this.cleanText(value, 180)?.toLowerCase();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      throw new BadRequestException("Valid email required");
    }
    return email;
  }

  private username(value: unknown) {
    const username = this.cleanText(value, 40)?.replace(/^@+/, "").toLowerCase() || null;
    if (!username || !/^[a-z0-9_]{3,40}$/.test(username)) {
      throw new BadRequestException("Username must use 3-40 letters, numbers, or underscores");
    }
    return username;
  }

  private password(value: unknown) {
    const password = this.decryptClientSecret(value) || "";
    if (password.length < 10) {
      throw new BadRequestException("Password must be at least 10 characters");
    }
    return password;
  }

  private optionalRoomPassword(value: unknown) {
    if (value === undefined || value === null || value === "") return null;
    const password = this.decryptClientSecret(value) || "";
    if (password.length < 3 || password.length > 80) {
      throw new BadRequestException("Room password must be 3-80 characters");
    }
    return password;
  }

  private encryptRoomPasswordToken(password: string) {
    const iv = randomBytes(12);
    const cipher = createCipheriv("aes-256-gcm", this.roomPasswordTokenKey, iv);
    const encrypted = Buffer.concat([cipher.update(password, "utf8"), cipher.final()]);
    const tag = cipher.getAuthTag();
    return ["v1", iv.toString("base64url"), tag.toString("base64url"), encrypted.toString("base64url")].join(".");
  }

  private decryptRoomPasswordToken(token: string) {
    const [version, iv, tag, encrypted] = token.split(".");
    if (version !== "v1" || !iv || !tag || !encrypted) return null;
    try {
      const decipher = createDecipheriv("aes-256-gcm", this.roomPasswordTokenKey, Buffer.from(iv, "base64url"));
      decipher.setAuthTag(Buffer.from(tag, "base64url"));
      return Buffer.concat([decipher.update(Buffer.from(encrypted, "base64url")), decipher.final()]).toString("utf8");
    } catch {
      return null;
    }
  }

  private decryptClientSecret(value: unknown) {
    if (!value || typeof value !== "object" || Array.isArray(value)) return null;
    const body = value as Record<string, unknown>;
    if (body.encrypted !== "rsa-oaep-v1" || typeof body.value !== "string") return null;
    try {
      return privateDecrypt(
        {
          key: this.clientSecretKeys.privateKey,
          oaepHash: "sha256",
          padding: constants.RSA_PKCS1_OAEP_PADDING
        },
        Buffer.from(body.value, "base64url")
      ).toString("utf8");
    } catch {
      return null;
    }
  }

  private publicMemoryUser(user?: MemoryUser | null, roomPassword?: string | null): PublicUser | null {
    if (!user) return null;
    return {
      id: user.id,
      username: user.username,
      name: user.name,
      email: user.email,
      language: user.language,
      roomPasswordEnabled: user.roomPasswordEnabled,
      roomPasswordShareToken: user.roomPasswordEnabled && roomPassword ? this.encryptRoomPasswordToken(roomPassword) : null
    };
  }
}
