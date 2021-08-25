// 파싱 + 출력만 바벨의 역할
// 바벨과 같이 써서 변환해주는 커스텀 플러그인 my-babel-plugin.js 생성

//바벨을 통해 쪼갠 값들을 console.log()로 출력하고 들어온 값에 대해 역순으로 바꿔주는 코드

module.exports = function myBabelPlugin() {
  return {
    visitor: {
      // Identifier(path) {
      //   // path를 통해 파싱된 객체를 받고 파싱된 결과물에 접근할 수 이싿.
      //   const name = path.node.name;
      //   //바벨이 만든 AST 노드를 출력
      //   console.log("Identifier() name:", name);

      //   // 변환 작업: 코드 문자열을 역순으로 변환한다.
      //   path.node.name = name.split("").reverse().join("");
      // },

      // const -> var로 변환 (이미 block-scoping으로 존재)

      VariableDeclaration(path) {
        console.log('VariableDeclaration() kind: ', path.node.kind); //const

        if (path.node.kind === 'const') {
          path.node.kind = 'var';
        }
      },
    },
  };
};
