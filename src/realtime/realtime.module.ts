import { Module } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { PrismaModule } from "../prisma.module";
import { RealtimeService } from "./realtime.service";

@Module({
  imports: [PrismaModule, AuthModule],
  providers: [RealtimeService],
  exports: [RealtimeService]
})
export class RealtimeModule {}
