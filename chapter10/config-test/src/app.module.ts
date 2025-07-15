import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { WeatherModule } from './weather/weather.module';

// 기동 시 환경 변수 출력
console.log('env : ' + process.env.NODE_ENV);
// 현재 디렉터리 출력
console.log('current working directory : ' + process.cwd());

@Module({
  // ConfigModule 설정
  // 전역 모듈 설정 추가
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    // 환경 변수 파일 경로 지정
    envFilePath: `${process.cwd()}/envs/${process.env.NODE_ENV}.env`,
  }), WeatherModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
