import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';

//
// @Module({
//   imports: [],
//   controllers: [AppController],
//   providers: [AppService],
// })
@Module({
  imports: [],
  controllers: [BlogController],
  providers: [BlogService],
})

export class AppModule {}
