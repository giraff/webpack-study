module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          chrome: "79", // 크롬 79 까지 지원하는 코드
          ie: "11",
        },
        useBuiltIns: "usage", //폴리필 사용 방식 지정 ["usage", "entry", "false"]
        corejs: {
          // 폴리필 패키지 중 core-js를 모듈로 가져오는데 그때의 설정값을 명시 (여기선 ver.2)
          version: 2,
        },
      },
    ],
  ],
};
//presets 해둔 파일 경로 적기 (배열에 추가)
