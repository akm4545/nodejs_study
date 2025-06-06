// express 모듈 불러오기
const express = require("express");

//express를 초기화 후 app에 할당
const app = express();
const port = 3000;

// /으로 요청이 오는 경우 실행됨
app.get("/", (req, res) => {
    // 헤더값 설정
    res.set({"Content-Type": "text/html; charset=utf-8"});
    res.end("헬로 Express");
});

// 서버를 기동해 클라이언트 요청을 기다림
app.listen(port, () => {
    console.log(`START SERVER : user ${port}`);
});