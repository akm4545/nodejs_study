import { Injectable } from '@nestjs/common';
// 레포지토리 주입 데코레이터
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.entity";
// 레포지토리 임포트
import {DeepPartial, Repository} from "typeorm";

@Injectable()
export class UserService {
    constructor(
        // 레포지토리 주입
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}

    // 유저 생성
    async createUser(user): Promise<(DeepPartial<User> & User)[]> {
        return await this.userRepository.save(user);
    }

    // 한 명의 유저 정보 찾기
    async getUser(email: string) {
        const result = await this.userRepository.findOne({
            where: { email },
        });

        return result;
    }

    // 유저 정보 업데이트
    async updateUser(email, _user) {
        const user: User | null = await this.getUser(email);

        console.log(_user);

        if (user instanceof User) {
            user.username = _user.username;
            user.password = _user.password;

            console.log(user);

            await this.userRepository.save(user);
        }
    }

    // 유저 정보 삭제
    deleteUser(email: any) {
        return this.userRepository.delete({ email });
    }
}
