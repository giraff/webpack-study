const path = require('path');
// 기본 내장 플러그인을 사용할 수 있게 하는 webpack 모듈
const webpack = require('webpack');
// git 명령어를 사용할 수 있게 도와주는 모듈
const childProcess = require('child_process');
// 웹팩에 HTML 파일도 추가해주는 플러그인
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 아웃풋 폴더를 삭제해주는 플러그인
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// 스타일시트만 따로 뽑아 별도의 CSS 파일로 만들어 역할에 따라 파일을 분리하는 플러그인
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// connect-api-mocker를 사용할 수 있도록 수정
const apiMocker = require('connect-api-mocker');

// 최적화
// 1. mode 이용하기 : mode를 유동적으로 사용하기 위한 코드추가
const mode = process.env.NODE_ENV || 'development';

// 2. CSS 압축 : optimize-css-assets-webpack-plugin 사용하여 CSS 빈칸 없애기
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

// 3. JS 코드 난독화 및 로그 제거 : terser-webpack-plugin
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  // 환경변수 NODE_ENV 값에 따라 모드를 설정하는 코드
  mode: mode,
  entry: {
    main: './src/app.js',
    // result: './src/result.js',
  },
  output: {
    path: path.resolve('./dist'),
    filename: '[name].js',
  },
  stats: 'errors-only',
  devServer: {
    client: {
      overlay: true,
    },
    hot: true,
    port: 8081,
    proxy: {
      '/api': 'http://localhost:8081', //"api"로 시작하는 요청은 localhost:8081로 호출하라고 설정
    },
    onBeforeSetupMiddleware: function (devServer) {
      devServer.app.use(apiMocker('/api', 'mocks/api'));
    },
  },
  // 일반 플러그인은 plugins 안에 추가하는 반면 아래 optimize-css는 module.exports 바로 하위에 추가
  optimization: {
    // minimizer : 압축할 수 있는 플러그인들을 추가하는 부분이다.
    // mode가 production일 때 optimize-css-assets-webpack-plugin을 사용한다
    minimizer:
      mode === 'production'
        ? [
            // CSS 압축
            new OptimizeCSSAssetsPlugin(),
            // JS 코드 난독화
            new TerserPlugin({
              terserOptions: {
                compress: {
                  drop_console: true,
                },
              },
            }),
          ]
        : [],
    // splitChunks: {
    //   chunks: 'all',
    // },
  },
  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        use: [
          process.env.NODE_ENV === 'production'
            ? MiniCssExtractPlugin.loader
            : 'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url-loader',
        options: {
          // publicPath: "./dist/", //파일로더가 처리한 파일을 모듈로 사용했을 때 앞에 경로로 사용. 아웃풋 경로를 dist로 해놔서 여기도 dist
          name: '[name].[ext]?[hash]', // 파일로더가 파일 아웃풋에 복사할 때 사용하는 파일명. 원본 파일명.확장자 (해시 무력화매번 달라지는 해쉬값을 입력함)
          limit: 20000, //20kb
        },
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new webpack.BannerPlugin({
      banner: `
      Build Date : ${new Date().toLocaleString()}
      Commit Version : ${childProcess.execSync('git rev-parse --short HEAD')}
      Author : ${childProcess.execSync('git config user.name')}
      `,
    }),
    new webpack.DefinePlugin({
      TWO: JSON.stringify('1+1'),
      'api.domain': JSON.stringify('http://dev.api.domain.com'),
    }),
    new HtmlWebpackPlugin({
      //template 경로 전달, HTML 파일 번들링 결과를 저장할 경로
      template: './src/index.html',
      // 템플릿에 주입할 파라미터 변수 지정: templateParameters 객체 안에 env 라는 키값을 추가하여 모드가
      // development 일 때만 문자열을 추가한다. (index.html에 title 태그에 개발모드일 땐 (개발용), 아닐 땐 추가하지 않고 빌드)
      templateParameters: {
        env: process.env.NODE_ENV === 'development' ? '(개발용)' : '',
      },
      minify:
        // production 모드일 땐 빈칸, 주석 지우기
        process.env.NODE_ENV === 'production'
          ? {
              collapseWhitespace: true,
              removeComments: true,
            }
          : false,
    }),
    new CleanWebpackPlugin(),
    ...(process.env.NODE_ENV === 'production'
      ? [new MiniCssExtractPlugin({ filename: '[name].css' })]
      : []),
  ],
  // 운영 환경에서만 css 를 따로 추출할 것이기 때문에 환경에 따른 조건식을 작성한다
  // filename: 결과물의 파일명을 지정해주는 부분. [name]으로 설정하면 css 파일명을 그대로 파일 이름으로 사용
};
