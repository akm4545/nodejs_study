// 글쓰기
async function writePost(collection, post){
    // 생성일시와 조회수를 넣는다
    post.hits = 0;
    // 날짜는 ISO 포맷으로 저장
    post.createDt = new Date().toISOString();

    return await collection.insertOne(post);
}

// require로 파일을 임포트 시 외부로 노출하는 객체
module.exports = {
    writePost,
}