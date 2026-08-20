import { Inject, Injectable, Logger } from "@nestjs/common";
import { PrismaService } from "../prisma.service";

type UserProfile = {
  id: string | null;
  username: string | null;
  name: string | null;
  email: string | null;
  language: string | null;
};

@Injectable()
export class TrackingService {
  private readonly logger = new Logger(TrackingService.name);
  private readonly memoryUsers = new Map<string, UserProfile>();

  constructor(@Inject(PrismaService) private readonly prisma: PrismaService) {}

  get persistenceEnabled() {
    return this.prisma.enabled;
  }

  async findUser(sessionId: string) {
    if (!this.prisma.enabled) {
      return this.memoryUsers.get(sessionId) || null;
    }

    return this.prisma.user.findUnique({
      where: { sessionId },
      select: { id: true, username: true, name: true, email: true, language: true }
    });
  }

  async track(sessionId: string, input: unknown) {
    const body = this.object(input);
    const eventName = this.cleanText(body.eventName, 120);
    if (!eventName) return;

    if (!this.prisma.enabled) {
      this.logger.log(`tracking ${JSON.stringify({ eventName, sessionId, roomId: body.roomId || null })}`);
      return;
    }

    const user = await this.prisma.user.findUnique({
      where: { sessionId },
      select: { id: true }
    });

    await this.prisma.userEvent.create({
      data: {
        userId: user?.id || null,
        sessionId,
        eventName,
        roomId: this.cleanText(body.roomId, 120),
        path: this.cleanText(body.path, 300),
        metadata: this.object(body.metadata)
      }
    });
  }

  private object(input: unknown): Record<string, any> {
    return input && typeof input === "object" && !Array.isArray(input) ? (input as Record<string, any>) : {};
  }

  private cleanText(value: unknown, maxLength: number) {
    if (typeof value !== "string") return null;
    const trimmed = value.trim();
    return trimmed ? trimmed.slice(0, maxLength) : null;
  }
}
