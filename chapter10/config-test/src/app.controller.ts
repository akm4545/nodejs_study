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
  
  // http://localhost:3000/service-url에 경로 진입 시 실행

  @Get('service-url')
  getServiceUrl(): string {
    // SERVICE_URL 환경 변수 반환
    return <string>this.configService.get('SERVICE_URL');
  }

  // 라우팅 정보
  @Get('db-info')
  getTest(): string {
    console.log(this.configService.get('logLevel'));
    console.log(this.configService.get('apiVersion'));

    return <string>this.configService.get('dbInfo');
  }
}
