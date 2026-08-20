import "reflect-metadata";
import { NestFactory } from "@nestjs/core";
import { join } from "node:path";
import express from "express";
import { AppModule } from "./app.module";
import { RealtimeService } from "./realtime/realtime.service";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const publicDir = join(process.cwd(), "public");

  app.use(express.static(publicDir, { index: false, maxAge: 0 }));
  app.enableShutdownHooks();

  const realtime = app.get(RealtimeService);
  realtime.bind(app.getHttpServer());

  const port = Number(process.env.PORT || 3000);
  const host = process.env.HOST || "0.0.0.0";
  await app.listen(port, host);
  console.log(`screen2.me running on http://${host}:${port}`);
}

bootstrap();
