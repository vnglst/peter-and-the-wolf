/* eslint no-console: 0 */

import { isNumeric } from './misc';

export default class SoundHandler {
  constructor({
    config,
    Howl,
    onEnd,
    onStop,
    onPause,
    onLoad,
    onStart,
    onSeek,
    onMainProgress,
  }) {
    this.config = config;
    this.Howl = Howl;
    this.onEnd = onEnd;
    this.onStop = onStop;
    this.onPause = onPause;
    this.onLoad = onLoad;
    this.onStart = onStart;
    this.onSeek = onSeek;
    this.onMainProgress = onMainProgress;
    this.sounds = {};
    this.soundsLoaded = {};
    this.mainStartPosition = 0;
  }

  load = () => {
    this.config.soundsData.forEach(sound => {
      const filePath = this.config.soundsPath + sound.file;
      const webm = filePath + '.webm';
      const mp3 = filePath + '.mp3';
      this.sounds[sound.id] = new this.Howl({
        src: [webm, mp3],
        onplay: () => this.onStart(sound.id),
        onend: () => this.onEnd(sound.id),
        onstop: () => this.onStop(sound.id),
        onpause: () => this.onPause(sound.id),
        onload: () => this.handleLoad(sound.id),
        onseek: () => this.onSeek(sound.id),
        onloaderror: (id, e) => console.log('load error', sound.id, e),
        html5: sound.html5,
      });
    });
  };

  handleLoad = soundId => {
    this.soundsLoaded[soundId] = true;
    if (soundId === 'main') {
      this.sounds.main.seek(this.mainStartPosition);
      setInterval(this.checkMainProgress, this.config.positionRefreshrate);
    }
    this.onLoad();
  };

  checkMainProgress = () => {
    const newPosition = this.sounds.main.seek();
    const isValidNewPosition = isNumeric(newPosition);
    if (isValidNewPosition) this.onMainProgress(newPosition);
  };

  togglePlay = (soundId, currentSoundId) => {
    if (!this.isLoaded(soundId)) return;
    const shouldStopPlayback = soundId === currentSoundId;
    this.stopAllFx();
    this.pauseMain();
    if (shouldStopPlayback) {
      return;
    }
    this.playSound(soundId);
  };

  isLoaded = soundId => this.soundsLoaded[soundId];

  stopAllFx = () => {
    Object.keys(this.sounds).forEach(soundId => {
      if (soundId !== 'main') {
        this.sounds[soundId].stop();
      }
    });
  };

  playSound = soundId => {
    this.sounds[soundId].play();
  };

  pauseMain = () => {
    this.sounds.main.pause();
  };

  skipMain = value => {
    const currentTime = this.sounds.main.seek();
    this.sounds.main.seek(currentTime + value);
  };

  getMainProgressInPercent = () => {
    if (!this.sounds.main) return 0;
    const currentPosition = this.sounds.main.seek();
    const duration = this.sounds.main.duration();
    if (Number.isNaN(duration) || duration === 0) return 0;
    return (currentPosition / duration) * 100;
  };
}
