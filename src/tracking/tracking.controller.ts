import { Body, Controller, Get, HttpCode, Inject, Post, Req, Res } from "@nestjs/common";
import type { Request, Response } from "express";
import { SessionService } from "../session/session.service";
import { TrackingService } from "./tracking.service";

@Controller("api")
export class TrackingController {
  constructor(
    @Inject(SessionService)
    private readonly sessions: SessionService,
    @Inject(TrackingService)
    private readonly tracking: TrackingService
  ) {}

  @Get("session")
  async session(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const sessionId = this.sessions.getSessionId(req, res);
    const user = await this.tracking.findUser(sessionId);
    return { persistence: this.tracking.persistenceEnabled, user };
  }

  @Post("events")
  @HttpCode(202)
  async events(@Req() req: Request, @Res({ passthrough: true }) res: Response, @Body() body: unknown) {
    const sessionId = this.sessions.getSessionId(req, res);
    await this.tracking.track(sessionId, body);
    res.status(202);
    return { ok: true, persistence: this.tracking.persistenceEnabled };
  }
}
