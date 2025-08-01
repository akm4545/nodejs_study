// 파일을 읽고 쓰는 모듈 임포트
import { readFile, writeFile } from "fs/promises";
import { PostDto } from "./blog.model";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Blog, BlogDocument } from "./blog.schema";

// 블로그 리포지토리 인터페이스 정의
export interface BlogRepository {
    getAllPost(): Promise<PostDto[]>;
    createPost(postDto: PostDto);
    getPost(id: String): Promise<PostDto>;
    deletePost(id: String);
    updatePost(id: String, postDto: PostDto);
}

// BlogRepository를 구현한 클래스
// 파일을 읽고 쓰기
@Injectable()
export class BlogFileRepository implements BlogRepository {
    FILE_NAME = './src/blog.data.json';

    // 파일을 읽어서 모든 게시글 불러오기
    async getAllPost(): Promise<PostDto[]> {
        const datas = await readFile(this.FILE_NAME, 'utf8');
        const posts = JSON.parse(datas);

        return posts;
    }

    // 게시글 쓰기
    async createPost(postDto: PostDto) {
        const posts = await this.getAllPost();
        const id = posts.length + 1;
        const createPost = { id: id.toString(), ...postDto, createDt: new Date() };

        posts.push(createPost);

        await writeFile(this.FILE_NAME, JSON.stringify(posts));
    }

    // 게시글 하나 가져오기
    async getPost(id: string): Promise<PostDto> {
        const posts = await this.getAllPost();
        const result = posts.find((post) => post.id === id);

        return result;
    }

    // 게시글 하나 삭제
    async deletePost(id: string){
        const posts = await this.getAllPost();
        const filteredPosts = posts.filter((post) => post.id !== id);

        await writeFile(this.FILE_NAME, JSON.stringify(filteredPosts));
    }

    // 게시글 하나 수정하기
    async updatePost(id: string, postDto: PostDto) {
        const posts = await this.getAllPost();
        const index = posts.findIndex((post) => post.id === id);
        const updatePost = { id, ...postDto, updateDt: new Date() };

        posts[index] = updatePost;

        await writeFile(this.FILE_NAME, JSON.stringify(posts));
    }
}

@Injectable()
// 몽고디비용 리포지토리
export class BlogMongoRepository implements BlogRepository {
    // Model<BlogDocument> 타입인 blogModel 주입
    constructor(@InjectModel(Blog.name) private blogModel: Model<BlogDocument>) {}

    // 모든 게시글을 읽어오는 함수
    async getAllPost(): Promise<Blog[]> {
        return await this.blogModel.find().exec();
    }

    // 게시글 작성
    async createPost(postDto: PostDto) {
        const createPost = {
            ...postDto,
            createDt: new Date(),
            updateDt: new Date()
        };

        this.blogModel.create(createPost);
    }

    // 하나의 게시글 읽기
    async getPost(id: string): Promise<PostDto> {
        return await this.blogModel.findById(id);
    }

    // 하나의 게시글 삭제
    async deletePost(id: string) {
        await this.blogModel.findByIdAndDelete(id);
    }

    // 게시글 업데이트
    async updatePost(id: string, postDto: PostDto) {
        const updatePost = { id, ...postDto, updateDt: new Date() };

        await this.blogModel.findByIdAndUpdate(id, updatePost);
    }
}