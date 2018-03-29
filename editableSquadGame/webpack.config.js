var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: './src/index.js',
  output: { path: path.resolve("./dist"), filename: 'bundle.js' },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  devServer: {
		contentBase: path.resolve('./static'),
        inline:true,
        disableHostCheck: true,
        //host: "0.0.0.0"
	},
};