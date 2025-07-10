import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';
import { BlogFileRepository } from "./blog.repository";

//
// @Module({
//   imports: [],
//   controllers: [AppController],
//   providers: [AppService],
// })
@Module({
  imports: [],
  controllers: [BlogController],
  // 프로바이더 설정
  providers: [BlogService, BlogFileRepository],
})

export class AppModule {}
