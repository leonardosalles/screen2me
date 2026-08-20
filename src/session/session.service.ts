import { Injectable } from "@nestjs/common";
import { randomUUID } from "node:crypto";
import type { Request, Response } from "express";

const COOKIE_NAME = "screen2me_sid";
const COOKIE_OPTIONS = "Path=/; HttpOnly; SameSite=Lax";

@Injectable()
export class SessionService {
  getSessionId(req: Request, res: Response) {
    const existing = this.parseCookies(req.headers.cookie || "")[COOKIE_NAME];
    const sessionId = existing && /^[a-f0-9-]{36}$/i.test(existing) ? existing : randomUUID();

    if (sessionId !== existing) {
      const secure = this.isSecureRequest(req) ? "; Secure" : "";
      res.setHeader(
        "set-cookie",
        `${COOKIE_NAME}=${sessionId}; ${COOKIE_OPTIONS}; Max-Age=31536000${secure}`
      );
    }

    return sessionId;
  }

  clearSession(req: Request, res: Response) {
    const secure = this.isSecureRequest(req) ? "; Secure" : "";
    res.setHeader("set-cookie", `${COOKIE_NAME}=; ${COOKIE_OPTIONS}; Max-Age=0${secure}`);
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

  private isSecureRequest(req: Request) {
    return req.headers["x-forwarded-proto"] === "https" || req.secure;
  }
}
