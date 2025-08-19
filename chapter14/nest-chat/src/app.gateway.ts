import {SubscribeMessage, WebSocketGateway, WebSocketServer} from "@nestjs/websockets";
import { Server, Socket } from 'socket.io';

// 웹소켓 서버 설정 데코레이터
// 네임스페이스 추가
@WebSocketGateway({ namespace: 'chat'})
export class ChatGateway {
    // 웹소켓 서버 인스턴스 선언
    @WebSocketServer() server: Server;
    
    // message 이벤트 구독
    @SubscribeMessage('message')
    handleMessage(socket: Socket, data: any): void {
        // 메시지이ㅘ 닉네임을 데이터에서 추출
        const { message, nickname } = data;
        
        // 접속한 클라이언트들에 메시지 전송
        // 닉네임을 포함한 메시지 전송
        socket.broadcast.emit('message', `${nickname}: ${message}` as any,);
    }
}