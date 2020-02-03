const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './src/index.js',
  devtool: 'source-map',
  module: {
    rules: [
        {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: ['babel-loader']
        },
        {
            test: /\.(sass|scss)$/,
            use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
        }
    ]
  },
  resolve: {
    extensions: ['*', '.js','.jsx','.scss']
  },
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'bundle.js'
  },
  plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
          title: 'Hello Webpack bundle',
          template: './src/index.html'
      }),
      new webpack.HotModuleReplacementPlugin(),
      new MiniCssExtractPlugin({
          filename: '[name].css',
          chunkFilename: '[id].css'
      })
  ],
  devServer: {
    contentBase: './dist',
    hot: false
  }
};
