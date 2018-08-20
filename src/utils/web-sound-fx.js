/* eslint no-console: 0 */

function SoundFX() {
  this.AudioContext = window.AudioContext || window.webkitAudioContext;
  this.support = !!this.AudioContext;
  if (this.support) {
    this.context = new this.AudioContext();
  } else {
    console.error('Web audio not supported');
  }
  this.buffers = {};
  this.sources = {};
}

SoundFX.prototype.load = function load(url, name) {
  fetch(url)
    .then(response => response.arrayBuffer())
    .then(buffer => {
      this.context.decodeAudioData(
        buffer,
        decodedData => {
          if (!decodedData) {
            console.error('error decoding file data: ' + url);
            return;
          }
          this.buffers[name] = decodedData;
        },
        error => console.error('decodeAudioData error', error),
      );
    })
    .catch(error => console.error('BufferLoader: XHR error', error));
};

SoundFX.prototype.play = function play(name) {
  const source = this.context.createBufferSource();
  source.buffer = this.buffers[name];
  source.connect(this.context.destination);
  source.start();
  this.sources[name] = source;
};

SoundFX.prototype.stop = function stop(name) {
  if (this.sources[name] === undefined) {
    return;
  }
  const source = this.sources[name];
  source.stop();
};

export default SoundFX;
