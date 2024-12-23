import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from "cors";
import * as cookieParser from "cookie-parser";
import { ValidationPipe } from '@nestjs/common';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cors({ origin: "*" }));
  app.use(cookieParser())
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  const port = process.env.PORT ?? 3000;
  await app.listen(port, () => console.log(`server is running on http://localhost:${port}`));
}
bootstrap();
