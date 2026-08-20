import { BadRequestException, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import bcrypt from "bcryptjs";
import { PrismaService } from "../prisma.service";

type PublicUser = {
  id: string | null;
  username: string | null;
  name: string | null;
  email: string | null;
  language: string | null;
};

@Injectable()
export class AuthService {
  private readonly memoryUsersBySession = new Map<string, PublicUser>();
  private readonly memoryUsersByEmail = new Map<string, PublicUser>();
  private readonly memoryUsersByUsername = new Map<string, PublicUser>();
  private readonly memoryPasswordsByEmail = new Map<string, string>();

  constructor(@Inject(PrismaService) private readonly prisma: PrismaService) {}

  get persistenceEnabled() {
    return this.prisma.enabled;
  }

  async currentUser(sessionId: string) {
    if (!this.prisma.enabled) {
      return this.memoryUsersBySession.get(sessionId) || null;
    }

    return this.prisma.user.findUnique({
      where: { sessionId },
      select: { id: true, username: true, name: true, email: true, language: true }
    });
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
      const user = { id: null, username, name, email, language };
      this.memoryUsersBySession.set(sessionId, user);
      this.memoryUsersByEmail.set(email, user);
      this.memoryUsersByUsername.set(username, user);
      this.memoryPasswordsByEmail.set(email, passwordHash);
      return user;
    }

    try {
      return await this.prisma.user.upsert({
        where: { sessionId },
        update: { username, name, email, language, passwordHash },
        create: { sessionId, username, name, email, language, passwordHash },
        select: { id: true, username: true, name: true, email: true, language: true }
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
      const user = existing || { id: null, username: null, name: null, email, language: null };
      this.memoryUsersBySession.set(sessionId, user);
      return user;
    }

    const user = await this.prisma.user.findUnique({
      where: { email },
      select: { id: true, username: true, name: true, email: true, language: true, passwordHash: true }
    });

    if (!user?.passwordHash || !(await bcrypt.compare(password, user.passwordHash))) {
      throw new UnauthorizedException("Invalid email or password");
    }

    return this.prisma.user.update({
      where: { id: user.id },
      data: { sessionId },
      select: { id: true, username: true, name: true, email: true, language: true }
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
      this.memoryUsersByUsername.set(username, user);
      if (user.email) this.memoryUsersByEmail.set(user.email, user);
      this.memoryUsersBySession.set(sessionId, user);
      return user;
    }

    try {
      return await this.prisma.user.update({
        where: { sessionId },
        data: { username, name },
        select: { id: true, username: true, name: true, email: true, language: true }
      });
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
    if (typeof value !== "string" || value.length < 10) {
      throw new BadRequestException("Password must be at least 10 characters");
    }
    return value;
  }
}
