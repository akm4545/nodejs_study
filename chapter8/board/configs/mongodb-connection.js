const { MongoClient } = require("mongodb");

// 몽고디비 연결 주소
const uri = "mongodb+srv://<아이디>:<패스워드>@<클러스터정보>/board";

// 몽고디비 커넥션 연결 함수 반환
module.exports = function (callback) {
    return MongoClient.connect(uri, callback);
};