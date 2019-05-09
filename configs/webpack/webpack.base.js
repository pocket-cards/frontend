const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HappyPack = require('happypack');

module.exports = {
  entry: [
    './index',
  ],
  output: {
    filename: 'bundle.min.js',
    path: path.resolve(__dirname, '../../public'),
    publicPath: '/',
  },
  resolve: {
    // mainFields: ['browser', 'main', 'module'],
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      '@models': path.resolve(__dirname, '../../src/models'),
      '@actions': path.resolve(__dirname, '../../src/actions'),
      '@constants': path.resolve(__dirname, '../../src/constants'),
      '@containers': path.resolve(__dirname, '../../src/containers'),
      // 'typings': path.resolve(__dirname, '../../typings'),
      // '@const': path.resolve(__dirname, '../../src/consts/index.ts'),
      // '@hoc': path.resolve(__dirname, '../../src/components/hoc/index.ts'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(tsx|ts)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              plugins: [
                'react-hot-loader/babel',
              ],
            },
          },
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
              happyPackMode: true
            }
          },
        ],
      },

    ]
  },
  plugins: [
    new HappyPack({
      loaders: ['ts-loader'],
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      title: 'Chat',
      filename: 'index.html',
      template: path.join(__dirname, '../app.ejs'),
      minify: false,
      hash: true,
      inject: 'body',
    }),
    new webpack.LoaderOptionsPlugin({
      debug: false,
    }),
  ],
  bail: true,
};

