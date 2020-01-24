/* eslint-disable @typescript-eslint/no-var-requires */
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
/* eslint-enable @typescript-eslint/no-var-requires */

const { DIR, EXT = 'ts' } = process.env;

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: `./examples/${DIR}/src/index.${EXT}`,
  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development',
    }),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: `./examples/${DIR}/public/index.html`,
    }),
  ],
  module: {
    rules: [{
      test: /\.jsx?$/,
      use: [{
        loader: 'babel-loader',
        options: {
          presets: [
            '@babel/preset-env',
            '@babel/preset-react',
          ],
        },
      }],
    }, {
      test: /\.tsx?$/,
      loader: 'ts-loader',
    }],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      'react-hooks-global-state/src/devtools': `${__dirname}/src/devtools`,
      'react-hooks-global-state': `${__dirname}/src`,
    },
  },
  devServer: {
    port: process.env.PORT || '8080',
    contentBase: `./examples/${DIR}/public`,
    hot: true,
  },
};
