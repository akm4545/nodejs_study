import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import {UserModule} from "../user/user.module";
import {PassportModule} from "@nestjs/passport";
import {LocalStrategy} from "./local.strategy";
import {SessionSerializer} from "./session.serializer";

@Module({
  // 패스포트 모듈 추가
  imports: [UserModule, PassportModule.register({ session: true })],
  // 프로바이더 설정 추가
  providers: [AuthService, LocalStrategy, SessionSerializer],
  controllers: [AuthController]
})
export class AuthModule {}
