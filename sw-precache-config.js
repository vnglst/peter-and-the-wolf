module.exports = {
  cacheId: 'peter-and-the-wolf',
  staticFileGlobs: [
    'build/css/**.css',
    'build/**.html',
    'build/**.json',
    'build/**.xml',
    'build/**.png',
    'build/**.svg',
    'build/**.ico',
    'build/js/**.js',
    'build/images/**',
  ],
  stripPrefix: 'build/',
  maximumFileSizeToCacheInBytes: 50 * 1024 * 1024,
  // Don't precache sourcemaps (they're large) and build asset manifest:
  staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/],
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
};
