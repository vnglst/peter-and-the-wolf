const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const workboxPlugin = require('workbox-webpack-plugin');

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
          { loader: 'postcss-loader', options: { sourceMap: true } },
          { loader: 'sass-loader', options: { sourceMap: true } },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin([commonPaths.outputPath.split('/').pop()], {
      root: commonPaths.root,
    }),
    new MiniCssExtractPlugin({
      filename: `${commonPaths.cssFolder}/[name].[hash].css`,
      chunkFilename: '[id].[hash].css',
    }),
    new workboxPlugin.GenerateSW({
      cacheId: 'peter-and-the-wolf',
      swDest: 'sw.js',
      clientsClaim: true,
      skipWaiting: true,
      exclude: [
        // to keep app shell small, don't cache the following
        /\.webm$/,
        /\.mp4$/,
        /\.mp3$/, // no sounds
        /\.map$/, // no sourcemaps
        /^(?:asset-)manifest.*\.js(?:on)?$/,
      ],
      runtimeCaching: [
        {
          urlPattern: /^https:\/\/fonts\.googleapis\.com/,
          handler: 'staleWhileRevalidate',
          options: {
            cacheName: 'google-fonts-stylesheets',
            cacheableResponse: { statuses: [0, 200] },
          },
        },
        {
          urlPattern: /^https:\/\/fonts\.gstatic\.com/,
          handler: 'cacheFirst',
          options: {
            cacheName: 'google-fonts',
            cacheableResponse: { statuses: [0, 200] },
          },
        },
        // It turned out to be much more difficult to cache large audio files using
        // a service worker. There is a plugin available for workbox, but I was
        // unable to get it to work using a custom script with 'importScripts: ['sw-audio-caching.js']'
        // The problem might be that I'm using the webm audio format and the plugin is
        // written for mp4, but I'm not sure. More details see:
        // - https://developers.google.com/web/tools/workbox/modules/workbox-range-requests
        // And the issue/PR that added support for this:
        // - https://github.com/GoogleChrome/workbox/issues/372
        {
          urlPattern: /\.(?:mp3|webm)$/,
          handler: 'cacheFirst',
          options: {
            cacheName: 'sounds',
            cacheableResponse: { statuses: [0, 200] },
          },
        },
      ],
      // Note: Chrome is currently not fetching favicons from pre cache. This is a known bug.
      // https://bugs.chromium.org/p/chromium/issues/detail?id=448427
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
