// arrow 함수를 사용할 수 있는 ES6 문법으로 작성 => IE 같은 ES6을 지원하지 않는 브라우저에서는 동작하지 않는다.

// const alert = (msg) => window.alert(msg);

// new Promise();

/*** 일부러 에러가 나는 코드 */
console.log()(function () {})();
