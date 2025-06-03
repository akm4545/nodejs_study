import http from "k6/http";

// 테스트 옵션
export const options = {
    vus: 100,
    duration: "10s",
};

export default function () {
    // 테스트에 사용할 함수 지정
    http.get("http://localhost:8000");
}