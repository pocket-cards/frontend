import { LoaderOptionsPlugin, Configuration } from 'webpack';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import merge from 'webpack-merge';
import baseConfig from './webpack.base';

const prod: Configuration = {
  mode: 'production',
  plugins: [
    new LoaderOptionsPlugin({
      debug: false,
    }),
    new CleanWebpackPlugin(),
  ],
};

export default merge(baseConfig, prod);
