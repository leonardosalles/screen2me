import { Controller, Get, Inject, Param, Res } from "@nestjs/common";
import { join } from "node:path";
import type { Response } from "express";
import { AuthService } from "../auth/auth.service";

@Controller()
export class SiteController {
  constructor(@Inject(AuthService) private readonly auth: AuthService) {}

  @Get(["/", "/watch", "/account"])
  app(@Res() res: Response) {
    res.sendFile(join(process.cwd(), "public", "index.html"));
  }

  @Get(["@:handle", "@:handle/live"])
  async userPage(@Param("handle") handle: string, @Res() res: Response) {
    const user = await this.auth.publicUserByUsername(handle);
    if (!user) {
      res.redirect(302, "/");
      return;
    }
    res.sendFile(join(process.cwd(), "public", "index.html"));
  }
}
