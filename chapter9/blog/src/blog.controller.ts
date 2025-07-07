// 데코레이터 함수 임포트
import { Controller, Param, Body, Delete, Get, Post, Put } from "@nestjs/common";

// 클래스에 붙이는 Controller 데코레이터
@Controller('blog')
export class BlogController {
    // GET 요청 처리
    @Get()
    getAllPosts() {
        console.log('모든 게시글 가져오기');
    }

    // POST 요청 처리
    @Post()
    // HTTP 요청의 body 내용을 post에 할당
    createPost(@Body() post: any) {
        console.log('게시글 작성');
        console.log(post);
    }

    // GET에 URL 매개변수에 id가 있는 요청 처리
    @Get('/:id')
    getPost(@Param('id') id: string){
        console.log(`[id: ${id}]게시글 하나 가져오기`);
    }

    // DELETE 방식에 URL 매개변수로 id가 있는 요청 처리
    @Delete('/:id')
    deletePost() {
        console.log('게시글 삭제');
    }

    // PUT 방식에 URL 매개변수로 전달된 id가 있는 요청 처리
    @Put('/:id')
    updatePost(@Param('id') id, @Body() post: any){
        console.log(`[${id}] 게시글 업데이트`);
        console.log(post);
    }
}