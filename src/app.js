import form from './form';
// import result from './result';
// app.js 번들링할 때 위 두 파일 내용도 같이 묶여 번들링 되어 파일 크기가 커진다.
// 엔트리 분리 / splitChunks로 중복을 제거하고 분리 / 자동 변경 다이나믹 임포트
import './app.css';

let resultEl;
let formEl;
document.addEventListener('DOMContentLoaded', async () => {
  formEl = document.createElement('div');
  formEl.innerHTML = form.render();
  document.body.appendChild(formEl);

  import(/* webpackChunkName: "result" */ './result.js').then(async m => {
    const result = m.default;

    resultEl = document.createElement('div');
    resultEl.innerHTML = await result.render();
    document.body.appendChild(resultEl);
  });
  // result.js 모듈 가져오는 부분을 webpackChunkName: "result"를 이용해 작성함
  // 이것은 웹팩이 이 파일을 처리할 때 Chunk로 분리하는데 그 chunk 파일 이름을 설정한 것.
});

if (module.hot) {
  console.log('핫 모듈 켜짐!');
  // 부분 갱신 제어 코드
  // module.hot.accept 함수 안에서 ./result 파일을 주시하고 있다가
  // 파일에 변경이 생긴 경우에 resultEl.innerHTML 함수로 resultEl에 HTML 부분만 다시 가져와 셋팅하는 코드
  module.hot.accept('./result', async () => {
    resultEl.innerHTML = await result.render();
  });

  module.hot.accept('./form', () => {
    console.log('form 모듈 변경됨');
    formEl.innerHTML = form.render();
  });
}
