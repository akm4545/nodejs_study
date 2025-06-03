const http = require("http");

// url 모듈을 로딩
const url = require("url");

http
    .createServer((req, res) => {
        // 패스명 할당
        const path = url.parse(req.url, true).pathname;
        res.setHeader("Content-Type", "text/html");

        if(path === "/user"){
            // /user 결괏값 설정
            res.end("[user] name : andy, age: 30");
        }else if(path === "/feed") {
            // /feed에 대한 결괏값 지정
            res.end(`<ul>
                <li>picture1</li>
                <li>picture2</li>
                <li>picture3</li>
                </ul>
            `);
        }else{
            // 결괏값으로 에러 메시지 설정
            res.statusCode = 404;
            res.end("404 page not found");
        }
    })
    .listen("3000", () => console.log("라우터를 만들어보자!"));