// 데코레이터 함수 임포트
import { Controller, Param, Body, Delete, Get, Post, Put } from "@nestjs/common";
import { BlogService } from "./blog.service";

// 클래스에 붙이는 Controller 데코레이터
@Controller('blog')
export class BlogController {
    blogService: BlogService;

    // 생성자에서 블로그 서비스 생성
    constructor() {
        this.blogService = new BlogService();
    }

    // GET 요청 처리
    @Get()
    getAllPosts() {
        console.log('모든 게시글 가져오기');

        return this.blogService.getAllPosts();
    }

    // POST 요청 처리
    @Post()
    // HTTP 요청의 body 내용을 post에 할당
    createPost(@Body() postDto) {
        console.log('게시글 작성');
        // console.log(post);

        this.blogService.createPost(postDto);

        return 'success';
    }

    // GET에 URL 매개변수에 id가 있는 요청 처리
    @Get('/:id')
    // 비동기를 지원하는 메서드로 시그니처 변경
    async getPost(@Param('id') id: string){
        console.log(`[id: ${id}]게시글 하나 가져오기`);

        // return this.blogService.getPost(id);
        // 블로그 서비스에서 사용하는 메서드가 비동기로 변경되었으므로 await 사용
        const post = await this.blogService.getPost(id);
        console.log(post);
        return post;
    }

    // DELETE 방식에 URL 매개변수로 id가 있는 요청 처리
    @Delete('/:id')
    deletePost(@Param('id') id: string) {
        console.log('게시글 삭제');

        this.blogService.delete(id);

        return 'success';
    }

    // PUT 방식에 URL 매개변수로 전달된 id가 있는 요청 처리
    @Put('/:id')
    updatePost(@Param('id') id: string, @Body() postDto){
        console.log(`[${id}] 게시글 업데이트`);

        return this.blogService.updatePost(id, postDto);
    }
}