module.exports = {
  staticFileGlobs: [
    'build/css/**.css',
    'build/**.html',
    'build/images/**.*',
    'build/sounds/**.*',
    'build/js/**.*',
  ],
  stripPrefix: 'build/',
  maximumFileSizeToCacheInBytes: 50 * 1024 * 1024,
};
