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
        // 접속한 클라이언트들에 메시지 전송
        this.server.emit('message', `client-${socket.id.substring(0, 4)} : ${data}` as any,);
    }
}