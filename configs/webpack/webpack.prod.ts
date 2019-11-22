import { LoaderOptionsPlugin, Configuration, EnvironmentPlugin } from 'webpack';
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
    new EnvironmentPlugin(['API_URL', 'IDENTITY_POOL_ID', 'USER_POOL_ID', 'USER_POOL_WEB_CLIENT_ID']),
  ],
};

export default merge(baseConfig, prod);
