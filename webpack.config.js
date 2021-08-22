const path = require("path");
const webpack = require("webpack");

module.exports = {
  mode: "development",
  entry: {
    main: "./src/app.js",
  },
  output: {
    path: path.resolve("./dist"),
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: "url-loader",
        options: {
          publicPath: "./dist/", //파일로더가 처리한 파일을 모듈로 사용했을 때 앞에 경로로 사용. 아웃풋 경로를 dist로 해놔서 여기도 dist
          name: "[name].[ext]?[hash]", // 파일로더가 파일 아웃풋에 복사할 때 사용하는 파일명. 원본 파일명.확장자 (해시 무력화매번 달라지는 해쉬값을 입력함)
          limit: 20000, //20kb
        },
      },
    ],
  },
  plugins: [
    new webpack.BannerPlugin({
      banner: `
      Build Date : ${new Date().toLocaleString()}`,
    }),
  ],
};
