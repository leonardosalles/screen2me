import { Module } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { SiteController } from "./site.controller";

@Module({
  imports: [AuthModule],
  controllers: [SiteController]
})
export class SiteModule {}
