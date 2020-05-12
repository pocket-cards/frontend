import * as path from 'path';
import { Configuration, NoEmitOnErrorsPlugin, LoaderOptionsPlugin, EnvironmentPlugin } from 'webpack';
import HappyPack from 'happypack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import { TsconfigPathsPlugin } from 'tsconfig-paths-webpack-plugin';

const configs: Configuration = {
  target: 'web',
  entry: ['./index'],
  output: {
    filename: '[name].bundle.js',
    chunkFilename: '[name].chunk.js',
    path: path.resolve(__dirname, '../../build'),
    publicPath: '/',
  },
  resolve: {
    mainFields: ['browser', 'main', 'module'],
    extensions: ['.ts', '.tsx', '.js'],
    plugins: [new TsconfigPathsPlugin()],
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
              plugins: ['react-hot-loader/babel', '@babel/plugin-proposal-optional-chaining'],
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
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack', 'file-loader'],
      },
    ],
  },
  plugins: [
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
  optimization: {
    splitChunks: {
      name: true,
      cacheGroups: {
        commons: {
          chunks: 'initial',
          minChunks: 2,
        },
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          chunks: 'all',
          priority: -10,
        },
      },
    },
    runtimeChunk: true,
  },
  bail: true,
};

export default configs;
