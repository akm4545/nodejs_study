import {Controller, Get, Post, UploadedFile, UseInterceptors} from '@nestjs/common';
import { AppService } from './app.service';
import {FileInterceptor} from "@nestjs/platform-express";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // POST 메서드로 localhost:3000/file-upload 호출 시 동작
  @Post('file-upload')
  // 파일 인터셉터
  @UseInterceptors(FileInterceptor('file', multerOption))
  // 인터셉터에서 준 파일을 받음
  fileUpload(@UploadedFile() file: Express.Multer.File)
  {
    // 텍스트 파일 내용 출력
    // console.log(file.buffer.toString('utf-8'));
    console.log(file);

    return 'File Upload';
  }
}
