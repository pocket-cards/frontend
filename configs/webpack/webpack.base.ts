import * as path from 'path';
import { Configuration, NoEmitOnErrorsPlugin, LoaderOptionsPlugin, EnvironmentPlugin } from 'webpack';
import HappyPack from 'happypack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';

const configs: Configuration = {
  entry: ['./index'],
  output: {
    filename: 'bundle.min.js',
    path: path.resolve(__dirname, '../../build'),
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
      '@utils': path.resolve(__dirname, '../../src/utils'),
      '@components': path.resolve(__dirname, '../../src/components'),
      // 'react-dom': '@hot-loader/react-dom',
    },
  },
  module: {
    rules: [
      {
        test: /\.(tsx|ts)$/,
        exclude: /node_modules/,
        use: [
          // {
          //   loader: 'thread-loader',
          //   options: {
          //     workers: 2,
          //     workerParallelJobs: 50,
          //     workerNodeArgs: ['--max-old-space-size=1024'],
          //     poolRespawn: false,
          //     poolTimeout: 2000,
          //     poolParallelJobs: 50,
          //     name: 'my-pool',
          //   },
          // },
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              plugins: ['react-hot-loader/babel'],
            },
          },
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
              happyPackMode: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new EnvironmentPlugin(['API_URL', 'AWS_DEFAULT_REGION', 'IDENTITY_POOL_ID', 'USER_POOL_ID', 'USER_POOL_WEB_CLIENT_ID']),
    new HappyPack({
      loaders: ['babel-loader', 'ts-loader'],
      threads: 10,
    }),
    new NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      title: 'Chat',
      filename: 'index.html',
      template: path.join(__dirname, '../app.ejs'),
      minify: false,
      hash: true,
      inject: 'body',
    }),
    new LoaderOptionsPlugin({
      debug: false,
    }),
    new CopyWebpackPlugin([
      {
        from: 'public',
        to: '.',
      },
    ]),
  ],
  bail: true,
};

export default configs;
