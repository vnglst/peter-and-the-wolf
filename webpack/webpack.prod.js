const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const SizePlugin = require('size-plugin');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');

const commonPaths = require('./paths');

module.exports = {
  mode: 'production',
  output: {
    filename: `${commonPaths.jsFolder}/[name].[hash].js`,
    path: commonPaths.outputPath,
    chunkFilename: '[name].[chunkhash].js',
  },
  module: {
    rules: [
      {
        test: /\.(css|scss)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              modules: true,
              localIdentName: '[local]___[hash:base64:5]',
            },
          },
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin([commonPaths.outputPath.split('/').pop()], {
      root: commonPaths.root,
    }),
    new MiniCssExtractPlugin({
      filename: `${commonPaths.cssFolder}/[name].css`,
      chunkFilename: '[id].css',
    }),
    new SizePlugin(),
    new SWPrecacheWebpackPlugin({
      cacheId: 'peter-and-the-wolf',
      dontCacheBustUrlsMatching: /\.\w{8}\./,
      filename: 'sw.js',
      minify: true,
      verbose: true,
      navigateFallback: commonPaths.public + 'index.html',
      staticFileGlobsIgnorePatterns: [
        /\.DS_Store$/,
        /\.map$/,
        /asset-manifest\.json$/,
      ],
      runtimeCaching: [
        {
          urlPattern: /https?:\/\/fonts.+/,
          handler: 'cacheFirst',
          options: {
            cache: {
              name: 'fonts-cache',
            },
          },
        },
        {
          urlPattern: /\/sounds\//,
          handler: 'cacheFirst',
          options: {
            cache: {
              name: 'sounds-cache',
            },
          },
        },
      ],
    }),
  ],
  devtool: 'source-map',
};
