import {Injectable} from "@nestjs/common";
import {PassportStrategy} from "@nestjs/passport";
import {Profile, Strategy} from "passport-google-oauth20";
import {UserService} from "../user/user.service";
import {User} from "../user/user.entity";

@Injectable()
// PassportStrategy(Strategy) 상속
export class GoogleStrategy extends PassportStrategy(Strategy) {
    // 생성자
    constructor(private userService: UserService) {
        // 부모 클래스의 생성자 호출
        super({
            // 클라이언트 ID
            clientID: process.env.GOOGLE_CLIENT_ID,
            // 시크릿
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            // 콜백 URL
            callbackURL: 'http://localhost:3000/auth/google',
            scope: ['email', 'profile'],
        } as any);
    }

    // OAuth 인증이 끝나고 콜백으로 실행되는 메서드
    async validate(accessToken: string, refreshToken: string, profile: Profile){
        const {id, name, emails} = profile;

        console.log(accessToken);
        console.log(refreshToken);

        const providerId = id;
        if (emails) {
            const email = emails[0].value;

            if (name) {
                console.log(providerId, email, name.familyName, name.givenName);

                // 유저 정보 저장 혹은 가져오기
                const user: User = await this.userService.findByEmailOrSave(
                    email,
                    name.familyName + name.givenName,
                    providerId,
                );
            }
        }

        return profile;
    }
}