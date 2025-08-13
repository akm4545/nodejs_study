// 데코레이터 임포트
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity() // 엔티티 객체임을 알려주기 위한 데코레이터
export class User {
    @PrimaryGeneratedColumn()
    id?: number; // id는 pk이며 autoIncrement

    @Column({ unique: true })
    email: string; // email은 유니크한 값

    // 패스워드 빈 값 허용
    @Column({ nullable: true })
    password: string;

    @Column()
    username: string;

    @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
    // 기본값을 넣어줌
    createDt: Date = new Date();
    
    // providerId 빈 값 허용
    @Column({ nullable: true })
    // providerId 추가
    providerId: string;
}