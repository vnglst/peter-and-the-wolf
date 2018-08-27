// TODO: Fix a11y
/* eslint jsx-a11y/accessible-emoji: 0 */
/* eslint jsx-a11y/media-has-caption: 0 */
/* eslint no-console: 0 */

import PlayIcon from '@material-ui/icons/PlayArrow';
import PauzeIcon from '@material-ui/icons/Pause';
import Forward from '@material-ui/icons/Forward30';
import Replay from '@material-ui/icons/Replay30';
import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import SoundFX from 'utils/web-sound-fx';
import Storage from 'utils/storage';
import { isNumeric } from 'utils/misc';
import { Howl } from 'howler';
import BottomBar from 'components/BottomBar';
import BackgroundImage from 'components/BackgroundImage';
import AudioButton from 'components/AudioButton';
import styles from './app.css';

const SOUND_TRACK_URL = './sounds/karloff-without-intro.mp3';
const SOUND_FXS_PATH = './sounds/';
const BACKGROUND_IMAGE = 'images/kym-645714-unsplash.jpg';
const STORAGE_KEY = 'peter-wolf';
const AUDIO_POSITION_REFRESH_RATE = 100;

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
    this.storage = new Storage(STORAGE_KEY);
    this.setInitialState();
    this.loadSoundFxs();
    this.loadMainSound();
  }

  componentDidMount() {
    this.registerEventListeners();
  }

  registerEventListeners = () => {
    this.sound.on('load', this.onMainAudioLoad);
  };

  onMainAudioLoad = () => {
    const { currentPosition } = this.state;
    this.sound.seek(currentPosition);
    setInterval(this.saveCurrentPosition, AUDIO_POSITION_REFRESH_RATE);
  };

  saveCurrentPosition = () => {
    const newPosition = this.sound.seek();
    const isValidNewPosition = isNumeric(newPosition);
    if (isValidNewPosition) {
      this.storage.save({ currentPosition: newPosition });
      this.setState({ currentPosition: newPosition });
    }
  };

  setInitialState = () => {
    const savedState = this.storage.load();
    this.state = {
      audioReady: true,
      playing: false,
      currentSoundFxId: '',
      currentPosition: 0,
      ...savedState,
    };
  };

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

  getProgressInPercent = () => {
    const duration = this.sound.duration();
    if (Number.isNaN(duration) || duration === 0) return 0;
    const { currentPosition } = this.state;
    return (currentPosition / duration) * 100;
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
              icon={<Replay />}
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
              icon={<Forward />}
            />
            <BottomBar.Progress
              progressInPercent={this.getProgressInPercent()}
            />
          </BottomBar>
          <div className={styles['bottom-bar-placeholder']} />
        </div>
      </BackgroundImage>
    );
  }
}

export default hot(module)(App);
