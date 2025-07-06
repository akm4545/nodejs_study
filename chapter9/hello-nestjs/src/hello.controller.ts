// 필요한 함수 임포트
import { Controller, Get } from "@nestjs/common";

// 컨트롤러 데코레이터
@Controller()
// 외부에서 사용하므로 export를 붙인다
export class HelloController {
    // GET 요청 처리 데코레이터
    @Get()
    hello() {
        return "안녕하세요! NestJS로 만든 첫 애플리케이션입니다.";
    }
}