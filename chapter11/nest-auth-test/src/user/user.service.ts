import { Injectable } from '@nestjs/common';
// 레포지토리 주입 데코레이터
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.entity";
// 레포지토리 임포트
import { Repository } from "typeorm";

@Injectable()
export class UserService {
    constructor(
        // 레포지토리 주입
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}
}
