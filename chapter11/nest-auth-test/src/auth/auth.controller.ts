import {Body, Controller, Post} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {CreateUserDto} from "../user/user.dto";

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
}
