const path = require('path');

module.exports = {
  public: 'https://peter-and-the-wolf.netlify.com/',
  root: path.resolve(__dirname, '../'),
  outputPath: path.resolve(__dirname, '../', 'build'),
  entryPath: path.resolve(__dirname, '../', 'src/index.js'),
  templatePath: path.resolve(__dirname, '../', 'src/template.html'),
  imagesFolder: 'images',
  soundsFolder: 'sounds',
  fontsFolder: 'fonts',
  cssFolder: 'css',
  jsFolder: 'js',
};
