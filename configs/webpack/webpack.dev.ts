import { HotModuleReplacementPlugin, LoaderOptionsPlugin, Configuration } from 'webpack';
import merge from 'webpack-merge';
import baseConfig from './webpack.base';
import Dotenv from 'dotenv-webpack';
// import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

const dev: Configuration = {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  entry: ['webpack-hot-middleware/client'],
  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom',
    },
  },
  plugins: [
    // new BundleAnalyzerPlugin(),
    new Dotenv(),
    new HotModuleReplacementPlugin(),
    new LoaderOptionsPlugin({
      debug: true,
    }),
  ],
};

export default merge(baseConfig, dev);
