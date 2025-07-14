import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
// ConfigService 임포트
import { ConfigService } from "@nestjs/config";

@Controller()
export class AppController {
  // constructor(private readonly appService: AppService) {}

  // ConfigService 주입
  constructor(private configService: ConfigService) {}

  @Get()
  getHello(): string {
    // return this.appService.getHello();

    // configService.get 호출
    const message = this.configService.get('MESSAGE');
    return message;
  }
}
