// socket.io 인스턴스 생성
// 네임스페이스 추가
const socket = io('http://localhost:3000/chat');
// 채팅방용 네임스페이스 생성
const roomSocket = io('http://localhost:3000/room');

// 채팅방 조깃값
let currentRoom = '';

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

// 채팅방 생성 버튼 클릭 시 실행하는 함수
function createRoom() {
    const room = prompt('생성할 방의 이름을 입력해주세요.');
    roomSocket.emit('createRoom', { room, nickname });
}

// notice 이벤트를 받아서 처리
socket.on('notice', (data) => {
    $('#notice').append(`<div>${data.message}</div>`);
});

// 클라이언트 측에서 채팅방 추가하는 함수
roomSocket.on("rooms", (data) => {
    console.log(data);
    // 채팅방 갱신 시 일단 리스트를 비움
    $('#rooms').empty();

    // 루프를 돌면서 서베에서 준 데이터 추가
    data.forEach((room) => {
        $('#rooms').append(`<li>${room} <button onclick="joinRoom(`${room}`)">join</button><li>`);
    });
});

// 방에 들어갈 떄 기존에 있던 방에서는 나가기
function joinRoom(room) {
    // 서버 측의 joinRoom 이벤트를 발생시킴
    roomSocket.emit('joinRoom', { room, nickname, toLeaveRoom: currentRoom });
    // 현재 들어 있는 방의 값을 변경
    currentRoom = room;
}