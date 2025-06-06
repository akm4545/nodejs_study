// 모듈을 require 함수로 포함시킬 때 실행된다.
console.log("require로 부르면 실행됩니다.");

// 외부로 노출할 객체를 저장한다
module.exports = {
    add: (a, b) => a + b,
    sub: (a, b) => a - b,
    multi: (a, b) => a * b,
    div: (a, b) => a / b
}