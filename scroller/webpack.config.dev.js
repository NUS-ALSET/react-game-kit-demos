/* global __dirname:false */

const path = require('path');

module.exports = {
  entry: [
    'react-hot-loader/patch',
    './src/index',
  ],
  output: {
    path: __dirname,
    filename: 'app.js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [path.join(__dirname, 'nodemodule/react-game-kit/lib'), path.join(__dirname, 'src')],
        use: {
          loader: 'babel-loader',
          options: {
            plugins: ['react-hot-loader/babel'],
          },
        },
      },
      {
        test: /\.json$/,
        use: {
          loader: 'json-loader',
        },
      },
      {
        test: /\.css$/,
        include: [path.join(__dirname, 'nodemodule/react-game-kit/lib'), path.join(__dirname, 'src')],
        use: {
          loader: 'style-loader!css-loader!postcss-loader',
        },
      },
    ],
  },
};
