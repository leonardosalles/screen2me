import { Body, Controller, Get, HttpCode, Inject, Post, Req, Res } from "@nestjs/common";
import type { Request, Response } from "express";
import { SessionService } from "../session/session.service";
import { AuthService } from "./auth.service";

@Controller("api/auth")
export class AuthController {
  constructor(
    @Inject(SessionService) private readonly sessions: SessionService,
    @Inject(AuthService) private readonly auth: AuthService
  ) {}

  @Get("me")
  async me(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const sessionId = this.sessions.getSessionId(req, res);
    const user = await this.auth.currentUser(sessionId);
    return { persistence: this.auth.persistenceEnabled, user };
  }

  @Post("register")
  @HttpCode(200)
  async register(@Req() req: Request, @Res({ passthrough: true }) res: Response, @Body() body: unknown) {
    const sessionId = this.sessions.getSessionId(req, res);
    const user = await this.auth.register(sessionId, body);
    return { persistence: this.auth.persistenceEnabled, user };
  }

  @Post("login")
  @HttpCode(200)
  async login(@Req() req: Request, @Res({ passthrough: true }) res: Response, @Body() body: unknown) {
    const sessionId = this.sessions.getSessionId(req, res);
    const user = await this.auth.login(sessionId, body);
    return { persistence: this.auth.persistenceEnabled, user };
  }

  @Post("logout")
  @HttpCode(200)
  async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const sessionId = this.sessions.getSessionId(req, res);
    await this.auth.logout(sessionId);
    this.sessions.clearSession(req, res);
    return { ok: true };
  }
}
