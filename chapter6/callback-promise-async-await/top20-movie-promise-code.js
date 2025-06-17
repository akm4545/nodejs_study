// axios 임포트
const axios = require("axios");

// 영화 순위 정보 URL
const url = "https://raw.githubusercontent.com/wapj/jsbackend/main/movieinfo.json";

axios
    // GET 요청
    .get(url)
    // 결괏값 처리
    .then((result) => {
        // 상태가 200이 아니면 에러
        if(result.status != 200) {
            throw new Error("요청에 실패했습니다!");
        }

        // result.data가 있으면 결과를 반환
        if(result.data) {
            return result.data;
        }

        // data가 없으면 에러
        throw new Error("데이터가 없습니다.");
    })
    // 데이터 처리
    .then((data) => {
        // 크기가 0이면 에러
        if(!data.articleList || data.articleList.size == 0) {
            throw new Error("데이터가 없습니다.");
        }

        // 영화 리스트 반환
        return data.articleList;
    })
    .then((articles) => {
        // 영화 리스트를 제목과 순위 정보로 분리
        return articles.map((article, idx) => {
            return { title: article.title, rank: idx + 1};
        })
    })
    .then((results) => {
        // 받은 영화 리스트 정보 출력
        for (let movieInfo of results) {
            console.log(`[${movieInfo.rank}위 ${movieInfo.title}`);
        }
    })
    // 중간에 발생한 에러들을 여기서 처리
    .catch((err) => {
        console.log("<<에러 발생>>");
        console.error(err);
    });