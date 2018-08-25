// TODO: Fix a11y
/* eslint jsx-a11y/accessible-emoji: 0 */
/* eslint jsx-a11y/media-has-caption: 0 */
/* eslint no-console: 0 */

import PlayIcon from '@material-ui/icons/PlayArrow';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import SkipPrevIcon from '@material-ui/icons/SkipPrevious';
import PauzeIcon from '@material-ui/icons/Pause';
import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import SoundFX from 'utils/web-sound-fx';
import { Howl } from 'howler';
import BottomBar from 'components/BottomBar';
import BackgroundImage from 'components/BackgroundImage';
import AudioButton from 'components/AudioButton';
import styles from './app.css';
import './Global.css';

const SOUND_TRACK_URL = './sounds/karloff-without-intro.mp3';
const SOUND_FXS_PATH = './sounds/';
const BACKGROUND_IMAGE = 'images/kym-645714-unsplash.jpg';

const SOUND_EFFECTS = [
  { id: 'peter', label: '👦', mp3: 'peter.mp3' },
  { id: 'wolf', label: '🐺', mp3: 'wolf.mp3' },
  { id: 'bird', label: '🐦', mp3: 'bird.mp3' },
  { id: 'duck', label: '🦆', mp3: 'duck.mp3' },
  { id: 'grandfather', label: '👴', mp3: 'grandfather.mp3' },
  { id: 'cat', label: '😼', mp3: 'cat.mp3' },
  { id: 'rifleshots', label: '🔫', mp3: 'rifleshots.mp3' },
];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { audioReady: true, playing: false, currentSoundFxId: '' };
    this.loadSoundFxs();
    this.loadMainSound();
  }

  loadMainSound = () => {
    this.sound = new Howl({
      src: [SOUND_TRACK_URL],
      html5: true,
    });
  };

  loadSoundFxs = () => {
    this.sfx = new SoundFX();
    SOUND_EFFECTS.map(sound =>
      this.sfx.load(SOUND_FXS_PATH + sound.mp3, sound.id),
    );
  };

  handleMainSoundPlayOrPause = () => {
    this.stopAllSoundFx();
    this.toggleMainSoundPlayback();
  };

  toggleMainSoundPlayback = () => {
    const { playing } = this.state;
    if (!playing) {
      this.sound.play();
    } else {
      this.sound.pause();
    }
    this.setState({ playing: !playing });
  };

  stopAllSoundFx = () => {
    this.sfx.stopAll();
    this.setState({ currentSoundFxId: '' });
  };

  skip = value => {
    const { playing } = this.state;
    const currentTime = this.sound.seek();
    this.sound.seek(currentTime + value);
    if (!playing) this.handleMainSoundPlayOrPause();
  };

  handleSoundFxPlayOrPause = soundId => {
    const { playing, audioReady, currentSoundFxId } = this.state;
    if (!audioReady) return;
    if (playing) {
      this.toggleMainSoundPlayback();
    }
    this.stopAllSoundFx();
    const isCurrentlyPlaying = currentSoundFxId && soundId === currentSoundFxId;
    if (isCurrentlyPlaying) {
      return;
    }
    this.playSoundFx(soundId);
  };

  playSoundFx = soundId => {
    this.sfx.play({
      soundId,
      onEnded: () => this.updateStateAfterSoundEnd(soundId),
    });
    this.setState({ currentSoundFxId: soundId });
  };

  updateStateAfterSoundEnd = soundId => {
    const { currentSoundFxId } = this.state;
    if (currentSoundFxId === soundId) {
      this.setState({ currentSoundFxId: '' });
    }
  };

  renderSoundFxsButtons = () => {
    const { currentSoundFxId } = this.state;
    return SOUND_EFFECTS.map(sound => (
      <AudioButton
        isCurrentlyPlaying={sound.id === currentSoundFxId}
        key={sound.id}
        onClick={() => this.handleSoundFxPlayOrPause(sound.id)}
      >
        {sound.label}
      </AudioButton>
    ));
  };

  render() {
    const { playing, audioReady } = this.state;
    return (
      <BackgroundImage imageSrc={BACKGROUND_IMAGE}>
        <div className={styles.app}>
          <h1 className={styles.title}>Peter and the Wolf</h1>
          <div className={styles.grid}>{this.renderSoundFxsButtons()}</div>
          <BottomBar>
            <BottomBar.Item
              disabled={!audioReady}
              aria-label="30 seconds back"
              value="skip-back"
              onChange={() => this.skip(-30)}
              icon={<SkipPrevIcon />}
            />
            <BottomBar.Item
              disabled={!audioReady}
              aria-label={playing ? 'Pauze' : 'Play'}
              value={playing ? 'pauze' : 'play'}
              onChange={this.handleMainSoundPlayOrPause}
              icon={playing ? <PauzeIcon /> : <PlayIcon />}
            />
            <BottomBar.Item
              disabled={!audioReady}
              aria-label="30 seconds forward"
              value="skip-forward"
              onChange={() => this.skip(30)}
              icon={<SkipNextIcon />}
            />
          </BottomBar>
          <div className={styles['bottom-bar-placeholder']} />
        </div>
      </BackgroundImage>
    );
  }
}

export default hot(module)(App);
