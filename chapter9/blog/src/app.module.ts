import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';
import {BlogFileRepository, BlogMongoRepository} from "./blog.repository";
import {MongooseModule} from "@nestjs/mongoose";
import {Blog, BlogSchema} from "./blog.schema";

//
// @Module({
//   imports: [],
//   controllers: [AppController],
//   providers: [AppService],
// })
@Module({
  // 몽고디비 연결 설정
  imports: [
      MongooseModule.forRoot(
          'mongodb+srv://<아이디>:<패스워드>@<클러스터정보>/blog',
      ),
      // 몽고디비 스키마 설정
      MongooseModule.forFeature([{ name: Blog.name, schema: BlogSchema }]),
  ],
  controllers: [BlogController],
  // 프로바이더 설정
  providers: [BlogService, BlogFileRepository, BlogMongoRepository],
})

export class AppModule {}
