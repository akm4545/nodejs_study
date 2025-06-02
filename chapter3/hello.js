// http 객체 생성
const http = require("http");
let count = 0;

// 서버 객체 생성
const server = http.createServer((req, res) => {
    //카운트 1 증가
    log(count);

    // 결괏값 200
    res.statusCode = 200;
    // 헤더 설정
    res.setHeader("Content-Type", "text/plain");
    // 응답값 설정
    res.write("hello\n");

    // 2초 후 Node.js 출력
    setTimeout(() => {
        res.end("Node.js");
    }, 2000);
});

function log(count) {
    console.log((count += 1));
}

// 8000번 포트로 서버 실행
server.listen(8000, () => console.log("Hello Node.js"));