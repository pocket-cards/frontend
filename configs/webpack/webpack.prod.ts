import { LoaderOptionsPlugin, Configuration, EnvironmentPlugin } from 'webpack';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import CompressionPlugin from 'compression-webpack-plugin';
import merge from 'webpack-merge';
import baseConfig from './webpack.base';

const prod: Configuration = {
  mode: 'production',
  plugins: [
    new EnvironmentPlugin([
      'AWS_REGION',
      'API_URL',
      'API_SERVER_URL',
      'IDENTITY_POOL_ID',
      'USER_POOL_ID',
      'USER_POOL_WEB_CLIENT_ID',
      'AUTH_DOMAIN',
      'AUTH_SIGN_IN_URL',
      'AUTH_SIGN_OUT_URL',
    ]),
    new LoaderOptionsPlugin({
      debug: false,
    }),
    new CleanWebpackPlugin(),
    // new CompressionPlugin({
    //   test: /\.js$/,
    //   filename: '[path].gz[query]',
    //   // Build failed: required python
    //   // algorithm: (source, compressionOptions, callback) => {
    //   //   return zopfli.gzip(Buffer.from(source), compressionOptions, callback);
    //   // }
    // }),
  ],
};

export default merge(baseConfig, prod);
