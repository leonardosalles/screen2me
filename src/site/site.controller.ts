import { Controller, Get, Res } from "@nestjs/common";
import { join } from "node:path";
import type { Response } from "express";

@Controller()
export class SiteController {
  @Get(["/", "/watch", "/account"])
  app(@Res() res: Response) {
    res.sendFile(join(process.cwd(), "public", "index.html"));
  }
}
