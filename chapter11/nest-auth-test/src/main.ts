import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ValidationPipe} from "@nestjs/common";
import * as cookieParser from 'cookie-parser';
import session from "express-session";
import passport from "passport";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 전역 파이프에 validationPipe 객체 추가
  app.useGlobalPipes(new ValidationPipe());

  // 쿠키 파서 설정
  app.use(cookieParser());
  
  app.use(
      session({
        // 세션 암호화에 사용되는 키
        secret: 'very-important-secret',
        // 세션을 항상 저장할지 여부
        resave: false,
        // 세션이 저장되기 전에는 초기화되지 않은 상태로 세션을 미리 만들어 저장
        saveUninitialized: false,
        // 쿠키 유효기간 1시간
        cookie: { maxAge: 3600000 }
      }),
  );

  // passport 초기화 및 세션 저장소 초기화
  app.use(passport.initialize());
  app.use(passport.session());

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
