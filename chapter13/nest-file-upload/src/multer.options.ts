import {diskStorage} from "multer";
import { join, extname } from 'path';
import {randomUUID} from "crypto";

// multerOption 객체 선언
export const multerOptions = {
    // 디스크 스토리지 사용
    storage: diskStorage({
        // 파일 저장 경로 설정
        destination: join(__dirname, '..', 'uploads'),
        // 파일명 설정
        filename: (req, file, cb) => {
            cb(null, randomUUID() + extname(file.originalname));
        },
    }),
};