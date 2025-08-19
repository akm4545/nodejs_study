// socket.io 인스턴스 생성
// 네임스페이스 추가
const socket = io('http://localhost:3000/chat');

// 닉네임 입력하기
const nickname = prompt('닉네임을 입력해주세요.');

// 전송 버튼 클릭 시 입력된 글을 message 이벤트로 보냄
function sendMessage() {
    const message = $('#message').val();
    // 내가 보낸 메시지 바로 추가
    $('#chat').append(`<div>나 : ${message}</div>`);
    // 메시지 보낼 때 닉네임 같이 전송
    socket.emit('message', { message, nickname });
    
}

// 서버 접속 확인을 위한 이벤트
socket.on('connect', () => {
    console.log('connected');
});

// 서버에서 message 이벤트 발생 시 처리
socket.on('message', (message) => {
    $('#chat').append(`<div>${message}</div>`);
});