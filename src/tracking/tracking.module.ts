import { Module } from "@nestjs/common";
import { SessionModule } from "../session/session.module";
import { TrackingController } from "./tracking.controller";
import { TrackingService } from "./tracking.service";

@Module({
  imports: [SessionModule],
  controllers: [TrackingController],
  providers: [TrackingService],
  exports: [TrackingService]
})
export class TrackingModule {}
