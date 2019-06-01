import { HotModuleReplacementPlugin, LoaderOptionsPlugin, Configuration } from 'webpack';
import merge from 'webpack-merge';
import baseConfig from './webpack.base';

const dev: Configuration = {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  entry: ['webpack-hot-middleware/client'],
  plugins: [
    new HotModuleReplacementPlugin(),
    new LoaderOptionsPlugin({
      debug: true,
    }),
  ],
};

export default merge(baseConfig, dev);
