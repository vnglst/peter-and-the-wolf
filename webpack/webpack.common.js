const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const commonPaths = require('./paths');

module.exports = {
  entry: commonPaths.entryPath,
  stats: {
    // fallback value for stats options when an option is not defined (has precedence over local webpack defaults)
    all: false,
    // Add asset Information
    assets: true,
    // Sort assets by a field
    // You can reverse the sort with `!field`.
    assetsSort: '!size',
    // Exclude assets from being displayed in stats
    // This can be done with a String, a RegExp, a Function getting the assets name
    // and returning a boolean or an Array of the above.
    excludeAssets: /\.(mp3|webm)$/,
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(js|jsx)$/,
        loader: 'eslint-loader',
        exclude: /(node_modules)/,
        options: {
          emitWarning: process.env.NODE_ENV !== 'production',
        },
      },
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: /(node_modules)/,
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: commonPaths.imagesFolder,
            },
          },
        ],
      },
      {
        test: /\.(woff2|ttf|woff|eot)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: commonPaths.fontsFolder,
            },
          },
        ],
      },
    ],
  },
  resolve: {
    modules: [path.resolve(__dirname, '../src'), 'node_modules'],
    extensions: ['*', '.js', '.jsx'],
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new CopyWebpackPlugin([{ from: 'static', ignore: ['*.DS_Store*'] }]),
    new HtmlWebpackPlugin({
      template: commonPaths.templatePath,
    }),
  ],
};
