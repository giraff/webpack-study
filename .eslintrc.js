// 1. npm i -D eslint eslint 설치
// 2. eslint는 무조건 config 파일을 필요로 한다 => .eslintrc.js
// 3. eslintrc.js에 rules:에 필요한 규칙 명세 가능
// 4. babel에 presets이 있듯이 lint에도 규칙 세트가 있다. extendsible config 를 사용한다. (eslint: recommended)
// 5. eslintrc.js를 직접 작성하지 않고 간편하게 구성하려면 $npx eslint --init 을 사용

module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    amd: true,
  },
  extends: "eslint:recommended",
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  rules: {},
};
