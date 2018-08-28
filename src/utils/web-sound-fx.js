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

SoundFX.prototype.play = function play({ soundId, onEnded }) {
  const source = this.context.createBufferSource();
  source.buffer = this.buffers[soundId];
  source.connect(this.context.destination);
  source.start();
  this.sources[soundId] = source;
  source.addEventListener('ended', function hasEnded() {
    onEnded();
    source.removeEventListener('ended', hasEnded);
  });
};

SoundFX.prototype.stop = function stop(name) {
  if (this.sources[name] === undefined) {
    return;
  }
  const source = this.sources[name];
  // HACK: for Safari to check if audio is actually being played
  // TODO: I really should be using Howler.js for this
  if (!source.playbackState || source.playbackState < 3) {
    source.stop();
  }
};

SoundFX.prototype.stopAll = function stopAll() {
  Object.keys(this.sources).forEach(name => {
    this.stop(name);
  });
};

export default SoundFX;
