const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

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
              minimize: true,
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
      // It is possible to load all mp3's on startup by increasing the max file size.
      // This would make all mp3 available offline, but:
      // - it impedes startup performance
      // - sometimes audio isn't fully downloaded, resulting in irrecoverable playback problems
      // maximumFileSizeToCacheInBytes: 50 * 1024 * 1024,
      dontCacheBustUrlsMatching: /\.\w{8}\./,
      filename: 'sw.js',
      minify: true,
      verbose: true,
      navigateFallback: commonPaths.public + 'index.html',
      staticFileGlobsIgnorePatterns: [
        /\.webm$/,
        /\.mp4$/,
        /\.mp3$/, // don't cache sound files on app load to keep SW small
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
        // Caching sounds dynamically works well, but not for the large main audio file
        // So that's only fully available offline, after listening to it in it's entirety
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
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true,
      }),
      new OptimizeCSSAssetsPlugin({}),
    ],
  },
};
