const express = require("express");
const app = express();
// 게시글 리스트로 사용할 posts에 빈 리스트 할당
let posts = [];

// req.body를 사용하려면 JSON 미들웨어를 사용해야 한다
// 사용하지 않으면 undefined로 반환

// JSON 미들웨어 활성화
app.use(express.json());

// POST 요청 시 컨텐츠 타입이 application/x-www-form-urlencoded인 경우 파싱
// JSON 미들웨어와 함께 사용
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.json(posts);
});

app.post("/posts", (req, res) => {
    const { title, name, text } = req.body;

    // 게시글 리스트에 새로운 게시글 정보 추가
    posts.push({ id: posts.length + 1, title, name, text, createDt: Date()});
    res.json({ title, name, text })
})

app.delete("/posts/:id", (req, res) => {
    // app.delete에 설정한 path 정보에서 id 값을 가져옴
    const id = req.params.id;
    // 글 삭제 로직
    const filteredPosts = posts.filter((post) => post.id !== +id);
    // 삭제 확인
    const isLengthChanged = posts.length !== filteredPosts.length;
    
    posts = filteredPosts;
    
    // 삭제 성공 응답
    if(isLengthChanged){
        res.json("OK");
        return;
    }
    
    // 실패 응답
    res.json("NOT CHANGED");
})

app.listen(3000, () => {
    console.log("welcome posts START!");
})