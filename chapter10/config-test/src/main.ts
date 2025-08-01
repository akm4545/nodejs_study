import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ConfigService} from "@nestjs/config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // ConfigService를 app.get()에 추가
  const configService = app.get(ConfigService);
  // await app.listen(process.env.PORT ?? 3000);
  // configService 사용
  await app.listen(configService.get("SERVER_PORT"));
}
bootstrap();
