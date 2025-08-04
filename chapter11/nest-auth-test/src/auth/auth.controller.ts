import {Body, Controller, Get, Post, Request, Response, UseGuards} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {CreateUserDto} from "../user/user.dto";
import {LoginGuard} from "./auth.guard";

// 컨트롤러 생성
@Controller('auth')
export class AuthController {
    // AuthService를 주입받음
    constructor(private authService: AuthService) {}

    @Post('register')
    // class-validator가 자동으로 유효성 검증
    async register(@Body() userDto: CreateUserDto) {
        // authService를 사용해 user 정보 저장
        return await this.authService.register(userDto);
    }

    @Post('login')
    async login(@Request() req, @Response() res) {
        // validateUser를 호출해 유저 정보 획득
        const userInfo = await this.authService.validateUser(
            req.body.email,
            req.body.password,
        );

        // 유저 정보가 있으면 쿠키 정보를 Response에 저장
        if(userInfo) {
            res.cookie('login', JSON.stringify(userInfo), {
                // 브라우저에서 읽을 수 있도록 함
                httpOnly: false,
                maxAge: 1000 * 60 * 60 * 24 * 7,
            });
        }

        return res.send({ message: 'login success' });
    }

    // LoginGuard 사용
    @UseGuards(LoginGuard)
    @Post('login2')
    async login2(@Request() req, @Response() res){
        // 쿠키 정보는 없지만 request에 user 정보가 있다면 응답값에 쿠키 정보 추가
        if(!req.cookies['login'] && req.user){
            // 응답에 쿠키 정보 추가
            res.cookie('login', JSON.stringify(req.user), {
                httpOnly: true,
                maxAge: 1000 * 10,
            });
        }

        return res.send({ message: 'login2 success' })
    }

    // 로그인을 한 때만 실행되는 메서드
    @UseGuards(LoginGuard)
    @Get("test-guard")
    testGuard() {
        return '로그인된 때만 이 글이 보입니다.';
    }
}
