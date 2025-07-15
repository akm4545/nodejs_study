import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { WeatherModule } from './weather/weather.module';

// 기동 시 환경 변수 출력
console.log('env : ' + process.env.NODE_ENV);

@Module({
  // ConfigModule 설정
  // 전역 모듈 설정 추가
  imports: [ConfigModule.forRoot({ isGlobal: true }), WeatherModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
