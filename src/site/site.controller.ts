import { Controller, Get, Inject, Param, Res } from "@nestjs/common";
import { join } from "node:path";
import type { Response } from "express";
import { AuthService } from "../auth/auth.service";

const indexPath = join(process.cwd(), "public", "index.html");
const noStoreHeaders = {
  "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
  Pragma: "no-cache",
  Expires: "0",
  "Surrogate-Control": "no-store"
};

@Controller()
export class SiteController {
  constructor(@Inject(AuthService) private readonly auth: AuthService) {}

  @Get(["/", "/watch", "/account"])
  app(@Res() res: Response) {
    this.sendIndex(res);
  }

  @Get(["@:handle", "@:handle/live"])
  async userPage(@Param("handle") handle: string, @Res() res: Response) {
    const user = await this.auth.publicUserByUsername(handle);
    if (!user) {
      res.redirect(302, "/");
      return;
    }
    this.sendIndex(res);
  }

  private sendIndex(res: Response) {
    for (const [header, value] of Object.entries(noStoreHeaders)) {
      res.setHeader(header, value);
    }
    res.sendFile(indexPath);
  }
}
