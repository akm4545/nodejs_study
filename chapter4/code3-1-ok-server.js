const http = require("http");
const server = http.createServer((req, res) => {
    // 응답 헤더 설정
    res.setHeader("Content-Type", "text/html");
    // OK를 응답하고 종료
    res.end("OK");
});

// 접속 대기
server.listen("3000", () => console.log("OK 서버 시작!"));