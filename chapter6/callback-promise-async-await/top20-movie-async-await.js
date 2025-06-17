// axios 임포트
const axios = require("axios");

// await를 사용하므로 async를 붙임
async function getTop20Movies() {
    const url = "https://raw.githubusercontent.com/wapj/jsbackend/main/movieinfo.json";

    try {
        // 네트워크에서 데이터를 받아오므로 await로 기다림
        const result = await axios.get(url);
        // 결괏값에는 data 프로퍼티가 있음
        const { data } = result;

        if(!data.articleList || data.articleList.size == 0) {
            throw new Error("데이터가 없습니다.");
        }

        const movieInfos = data.articleList.map((article, idx) => {
            return { title: article.title, rank: idx + 1};
        })

        for (let movieInfo of movieInfos) {
            console.log(`[${movieInfo.rank}위 ${movieInfo.title}`);
        }
    }catch (err){
        throw new Error(err);
    }
}

getTop20Movies();