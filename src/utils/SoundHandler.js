/* eslint no-console: 0 */

import { isNumeric } from 'utils/misc';

export default class SoundHandler {
  constructor({ config, Howl }) {
    this.config = config;
    this.Howl = Howl;
    this.sounds = {};
    this.soundsLoaded = {};
  }

  load = () => {
    this.config.soundsData.forEach(sound => {
      const filePath = this.config.soundsPath + sound.file;
      const webm = filePath + '.webm';
      const mp3 = filePath + '.mp3';
      this.sounds[sound.id] = new this.Howl({
        src: [webm, mp3],
        onplay: () => this.onPlayStart(sound.id),
        onend: () => this.onPlayEnd(sound.id),
        onstop: () => this.onPlayStop(sound.id),
        onpause: () => this.onPlayPause(sound.id),
        onload: () => this.handleSoundLoad(sound.id),
        onloaderror: (id, e) => console.log('load error', sound.id, e),
        html5: sound.html5,
      });
    });
  };

  handleSoundLoad = soundId => {
    this.soundsLoaded[soundId] = true;
    if (soundId === 'main') {
      this.sounds.main.seek(this.mainStartPosition);
      setInterval(this.checkMainSoundProgress, this.config.positionRefreshrate);
    }
    this.onSoundLoad();
  };

  checkMainSoundProgress = () => {
    const newPosition = this.sounds.main.seek();
    const isValidNewPosition = isNumeric(newPosition);
    if (isValidNewPosition) this.onMainSoundProgress(newPosition);
  };

  isLoaded = soundId => this.soundsLoaded[soundId];

  stopAllSoundFx = () => {
    Object.keys(this.sounds).forEach(soundId => {
      if (soundId !== 'main') {
        this.sounds[soundId].stop();
      }
    });
  };

  toggleSoundPlay = (soundId, currentSoundId) => {
    if (!this.isLoaded(soundId)) return;
    const shouldStopPlayback = soundId === currentSoundId;
    this.stopAllSoundFx();
    this.pauseMainSound();
    if (shouldStopPlayback) {
      return;
    }
    this.playSound(soundId);
  };

  playSound = soundId => {
    this.sounds[soundId].play();
  };

  pauseMainSound = () => {
    this.sounds.main.pause();
  };

  skipMainSound = value => {
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
