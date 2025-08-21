import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {ChatGateway, RoomGateway} from "./app.gateway";

@Module({
  imports: [],
  controllers: [AppController],
  // 게이트웨이를 프로바이더로 등록
  providers: [AppService, ChatGateway, RoomGateway],
})
export class AppModule {}
