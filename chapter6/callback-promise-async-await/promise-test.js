const DB = [];

function saveDB(user) {
    const oldDBSize = DB.length;
    DB.push(user);

    console.log(`save ${user.name} to DB`);

    // 콜백 대신 Promise 객체 반환
    return new Promise((resolve, reject) => {
        if(DB.length > oldDBSize){
            resolve(user); // 성공 시 유저 정보 반환
        } else {
            reject(new Error(("Save DB Error!"))); // 실패 시 에러 발생
        }
    });
}

function sendEmail(user) {
    console.log(`email to ${user.email}`);

    // 실패 처리 없음
    return new Promise((resolve) => {
        resolve(user);
    });
}

function getResult(user) {
    return new Promise((resolve, reject) => {
       // 성공 시 성공 메시지와 유저명 반환
       resolve(`success register ${user.name}`)
    });
}

function registerByPromise(user) {
    // 비동기 호출이지만 순서를 지켜서 실행
    const result = saveDB(user)
        .then(sendEmail)
        .then(getResult)
        .catch(error => new Error(error))
        .finally(() => console.log("완료!"));

    // 아직 완료되지 않았으므로 지연(pending) 상태
    console.log(result);

    return result;
}

const myUser = { email: "andy@test.com", password: "1234", name: "andy"}
const result = registerByPromise(myUser);

// 결괏값이 Promise이므로 then() 메서드에 함수를 넣어서 결괏값을 볼 수 있음
result.then(console.log);

allResult = Promise.all([saveDB(myUser), sendEmail(myUser), getResult(myUser)]);
allResult.then(console.log);

