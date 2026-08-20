import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { PrismaModule } from "./prisma.module";
import { RealtimeModule } from "./realtime/realtime.module";
import { SessionModule } from "./session/session.module";
import { SiteModule } from "./site/site.module";
import { TrackingModule } from "./tracking/tracking.module";

@Module({
  imports: [PrismaModule, SessionModule, AuthModule, TrackingModule, RealtimeModule, SiteModule]
})
export class AppModule {}
