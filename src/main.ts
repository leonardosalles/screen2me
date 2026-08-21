import "reflect-metadata";
import { NestFactory } from "@nestjs/core";
import { join } from "node:path";
import express from "express";
import { AppModule } from "./app.module";
import { RealtimeService } from "./realtime/realtime.service";

const noStoreHeaders = {
  "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
  Pragma: "no-cache",
  Expires: "0",
  "Surrogate-Control": "no-store"
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const publicDir = join(process.cwd(), "public");

  app.use(
    express.static(publicDir, {
      index: false,
      maxAge: 0,
      etag: false,
      lastModified: false,
      setHeaders(res, filePath) {
        if (/\.(html|js|css|webmanifest)$/.test(filePath) || filePath.endsWith("sw.js")) {
          for (const [header, value] of Object.entries(noStoreHeaders)) {
            res.setHeader(header, value);
          }
        }
      }
    })
  );
  app.enableShutdownHooks();

  const realtime = app.get(RealtimeService);
  realtime.bind(app.getHttpServer());

  const port = Number(process.env.PORT || 3000);
  const host = process.env.HOST || "0.0.0.0";
  await app.listen(port, host);
  console.log(`screen2.me running on http://${host}:${port}`);
}

bootstrap();
