const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
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
    new SWPrecacheWebpackPlugin({
      cacheId: 'peter-and-the-wolf',
      dontCacheBustUrlsMatching: /\.\w{8}\./,
      filename: 'service-worker.js',
      maximumFileSizeToCacheInBytes: 50 * 1024 * 1024,
      // minify: true,
      // navigateFallback: PUBLIC_PATH + 'index.html',
      staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/],
    }),
  ],
  devtool: 'source-map',
};
