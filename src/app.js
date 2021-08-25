import form from './form';
import result from './result';

let resultEl;
let formEl;
document.addEventListener('DOMContentLoaded', async () => {
  formEl = document.createElement('div');
  formEl.innerHTML = form.render();
  document.body.appendChild(formEl);

  resultEl = document.createElement('div');
  resultEl.innerHTML = await result.render();
  document.body.appendChild(resultEl);
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
