# **자바스크립트에서 비동기 처리하기 (아는 내용이므로 간단하게 정리)**  
# **자바스크립트 비동기 소개**  
동기(synchronous) 프로그래밍에서 작업은 차례로 실행. 이전 작업이 완료될 때까지 중단할 수 없음. 비동기(asynchronous) 프로그래밍에서는 임의의 순서로 
또는 동시에 작업 실행 가능.  
  
자바스크립트는 런타임(브라우저나 Node.js)에서 싱글 스레드로 동작. 싱글 스레드는 한 번에 하나의 작업만 처리 가능. 콜백, 프로미스, 어싱크 어웨이트 
방법을 사용하면 자바스크립트에서 비동기 처리 가능.  
  
콜백은 함수의 파라미터로 함수를 전달하며 비동기 처리가 끝났을 때 전달된 함수를 실행. 가독성이 좋지 못하여 유지보수 및 디버깅이 힘들다.  
  
프로미스(Promise 객체 사용)는 콜백 대신 사용할 수 있는 방법으로 비동기 작업이 완료되면 결과를 반환하는 객체. 처음에는 대기였다가 작업이 완료되면 
성공 또는 실패 상되가 된다. then(), catch() 메서드를 사용하여 성공과 실패 처리 가능.  
  
어싱크 어웨이트(async, await 키워드 사용)는 프로미스를 사용하는 비동기 작업을 동기적으로 처리하는 것처럼 코드를 작성할 수 있게 해줌. async가 
붙어 있는 함수를 실행할 때 await 키워드를 사용하여 비동기 작업이 완료될 때까지 기다릴 수 있다.  
  
# **콜백 함수 소개**  
비동기는 현재 코드의 실행 결과를 받지 않고 이후 코드를 수행하는 기법. 컴퓨팅 자원을 효율적으로 사용하지만 정확한 순서를 지켜 수행해야 하는지를 
고려해서 처리해야함. 이 방법으로 콜백이 있음. 콜백은 실행 가능한 함수를 인자로 전달하여 특정 상황이 발생할 때 호출되게 하는 방식.  
  
## **콜백 함수 작성해보기**  
시나리오  
DB 저장, 이메일 전송, 성공 메시지 출력 순  
  
1. callback-promise-aync-await 디렉터리 생성  
2. callback-test.js 작성  
  
매우 간단한 코드인데도 콜백을 사용하는 경우 다소 복잡해진다. 콜백의 깊은 곳에서 데이터를 주고받을 때 에러가 발생하면 에러를 추척하기 어렵다.  
  
프로미스(프라미스로도 읽음)는 콜백의 문제를 해결할 목적으로 ES6에 도입.  
  
# **Promise 객체**  
Promise는 자바스크립에서 비동기 실행을 동기화하는 구문으로 사용. 이행, 거절, 대기 세 가지의 상태를 가질 수 있다.    
  
자바스크립에서 '이 코드는 미래의 어느 시점에 실행할 거야'라고 약속하는 객체로 사용. Promise는 객체이므로 new 연산자로 인스턴스를 생성할 수 있다.  
  
Promise 객체가 생성되면 대기 상태. resolve() 함수가 실행되면 이행 상태로 변경. 실패해 reject() 함수가 실행되면 거절로 변경.  
  
1. 콜백으로 만든 회원 가입 예제를 프로미스로 변경  
callback-promise-async-await/promise-test.js  
  
Promise에는 then(Promise) 메서드가 있어서 비동기 호출이지만 promise1.then(promise2).then(promise3) 이런 식으로 순서대로 함수를 호출할 수 
있다.  
  
Promise 객체의 실행 결과로 실패를 주어야 하는 경우 reject() 함수를 사용한다.  
then(onFulfilled, onRejected)  
  
Promise에서 발생하는 에러에는 .catch()를 사용한다.  
then().catch(error => new Error(error)  
  
# **동시에 여러 Promise 객체 호출하기**  
Promise.all([Promise1, Promise2...]) 처럼 사용하면 된다. 결과는 배열로 반환된다.  
  
# **Promise 에외 처리하기**  
.catch()와 .finally를 사용한다.  
  
# **프로미스의 문제점**  
콜백보단 편리하지만 then과 catch 함수를 연결하는 체이닝 방식을 사용하기가 만만하지는 않다. 거기에 더 복잡한 로직을 추가하고 예외 처리까지 해야 
되는 상황이면 더욱 힘들다.  
  
이상적인 상황의 Promise 코드는 다음과 같다.  
callback-promise-async-await/ideal-promise-code.js  
  
아쉽게도 이렇게 깔끔한 Promise 코드는 실전에서는 거의 없다. 실전에서는 더욱 복잡하고 더욱 까다로운 로직을 수행해야 하는 경우가 많으므로 로직이 
복잡해진다.  
  
## **복잡한 프로미스 예제**  
1. 조금 더 복잡한 예제를 다루기 위해 영화 API를 호출해 영화 상위 20위까지 출력하는 코드를 작성한다. 예제를 실행하기 위해 axios라는 http 클라이언트 
패키지가 필요하다. callback-promise-aync-await 폴더에 axios 설치를 진행한다.  
  
npm install axios  
  
2. 현재 상영 영화 순위를 20위까지 보여주는 코드를 구현한다.  
callback-promise-async-await/top20-movie-promise-code.js  
  
## **문제점 및 대안 찾기**  
프로미스가 콜백보다는 깔끔한 코드를 유지할 수 있지만 잘못 사용될 수 있는 여지가 남아 있다. 첫 번째 예로는 프로미스의 then() 함수에 성공 시와 실패 시 
처리할 함수를 둘 다 넘기는 경우를 들 수 있다. 이렇게 둘 다 넘기면 프로미스는 장식에 불과하며 기존의 콜백 함수에 결과와 에러를 동시에 넘기는 myWork(function(result, error)) 
형태와 다를 바가 없다. 좋은 방법은 catch() 함수로 예외 처리를 하는 것이다.  
  
callback-promise-async-await/promise-anti-pattern1.js  
  
프로미스를 사용하긴 했지만 콜백 방식에서 사용하던 습관이 그대로 들어 있다. 이런 식으로 then을 사용하면 에러가 나는 경우 확인해야 할 곳이 많아진다.  
  
두 번째는 프로미스를 중첩해서 사용하는 경우다. 콜백에는 익숙한데 프로미스에 익숙하지 않은 때 이런 실수를 할 수 있다.  
  
callback-promise-aync-await/promise-anti-pattern2.js  
  
위 코드는 프로미스를 중첩해서 사용했다. 이것은 콜백보다 가독성이 더 나쁘다.  
  
# **async await 구문**  
기존의 비동기 처리 방식인 콜백 함수와 프로미스의 단점을 보완, 가독성 높은 코드를 작성할 수 있다. async가 붙은 함수는 프로미스를 반환한다.  
  
1. 간단한 async 코드를 작성  
callback-promise-async-await/async-await.js  
  
결괏값이 Promise로 나온다.  
  
2. await은 Promise 객체의 실행이 완료되기를 기다린다.  
callback-promise-async-await/async-await.js  
  
3. async await, setTimeout()을 사용해서 1부터 10까지 1초에 하나씩 출력하는 코드를 작성한다.  
callback-promise-async-await/async-await.js  
  
4. Promise로 만든 영화 랭킹 예제를 async await로 변경한다.  
callback-promise-async-await/top20-movie-async-await.js  
  
Promise가 필요한 경우(setTimeout(), 여러 태스크를 동시에 실행해야 하는 경우) 이외에는 async await를 사용한다. 읽기 편한 코드는 디버깅에 유리하기 
때문이다. async, await는 내부적으로는 제네레이터를 활용해 동작한다.  
  
# **핵심용어**  
1. 동기는 모든 코드가 순차적으로 실행된다는 의미이며 비동기는 순서대로 실행되지 않는다. Node.js에서 비동기 코드는 이벤트 루프에 의해서 실행된다.  
2. 콜백은 비동기 프로그래밍을 구현하는 기법이다. 요청이 완료되었을 때 실행해야 하는 콜백 함수를 매개변수로 같이 넘기는 방법이다.  
3. Promise는 병행 프로그래밍 언어에서 프로그램 실행을 동기화하는 데 쓰는 객체다.  
4. async와 await는 프로미스를 반환하는 함수를 실행할 때 사용하는 키워드다.  
  

  
