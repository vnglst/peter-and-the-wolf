// TODO: Fix a11y
/* eslint jsx-a11y/accessible-emoji: 0 */
/* eslint jsx-a11y/media-has-caption: 0 */
/* eslint no-console: 0 */

import {
  faBackward,
  faForward,
  faPause,
  faPlay,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import SoundFX from './utils/web-sound-fx';
import BottomBar from './components/BottomBar';
import BackgroundImage from './components/BackgroundImage';
import AudioButton from './components/AudioButton';
import backgroundJpg from './images/kym-645714-unsplash.jpg';
import styles from './app.css';
import './Global.css';

const SOUND_TRACK_URL = './sounds/karloff-without-intro.mp3';
const SOUND_FXS_PATH = './sound-fxs/';

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
    this.state = { audioReady: true, playing: false, currentSoundId: '' };
    this.audio = new Audio(SOUND_TRACK_URL);

    this.renderSoundFxsButtons = this.renderSoundFxsButtons.bind(this);
    this.loadSoundFxs = this.loadSoundFxs.bind(this);
    this.playSound = this.playSound.bind(this);
    this.loadSoundFxs();
  }

  loadSoundFxs() {
    this.sfx = new SoundFX();
    SOUND_EFFECTS.map(sound =>
      this.sfx.load(SOUND_FXS_PATH + sound.mp3, sound.id),
    );
  }

  handlePlaybackToggle() {
    const { playing } = this.state;
    if (!playing) {
      this.audio.play();
    } else {
      this.audio.pause();
    }
    this.setState({ playing: !playing });
  }

  skip(value) {
    this.audio.currentTime = this.audio.currentTime + value;
  }

  playSound(soundId) {
    const { playing, audioReady, currentSoundId } = this.state;
    if (!audioReady) return;
    if (playing) {
      this.handlePlaybackToggle();
    }
    this.sfx.stop(currentSoundId);
    if (soundId === currentSoundId) return;
    this.sfx.play(soundId, () => {
      this.setState({ currentSoundId: '' });
    });
    this.setState({ currentSoundId: soundId });
  }

  renderSoundFxsButtons() {
    const { currentSoundId } = this.state;
    return SOUND_EFFECTS.map(sound => (
      <AudioButton
        isCurrentlyPlaying={sound.id === currentSoundId}
        key={sound.id}
        onClick={() => this.playSound(sound.id)}
      >
        {sound.label}
      </AudioButton>
    ));
  }

  render() {
    const { playing, audioReady } = this.state;
    return (
      <BackgroundImage imageSrc={backgroundJpg}>
        <div className={styles.app}>
          <h1 className={styles.title}>Peter and the Wolf</h1>
          <div className={styles.grid}>{this.renderSoundFxsButtons()}</div>
          <BottomBar>
            <BottomBar.Item
              disabled={!audioReady}
              aria-label="30 seconds back"
              value="skip-back"
              onChange={() => this.skip(-30)}
              icon={<FontAwesomeIcon icon={faBackward} />}
            />
            <BottomBar.Item
              disabled={!audioReady}
              aria-label={playing ? 'Pauze' : 'Play'}
              value={playing ? 'pauze' : 'play'}
              onChange={() => this.handlePlaybackToggle()}
              icon={<FontAwesomeIcon icon={playing ? faPause : faPlay} />}
            />
            <BottomBar.Item
              disabled={!audioReady}
              aria-label="30 seconds forward"
              value="skip-forward"
              onChange={() => this.skip(30)}
              icon={<FontAwesomeIcon icon={faForward} />}
            />
          </BottomBar>
          <div className={styles['bottom-bar-placeholder']} />
        </div>
      </BackgroundImage>
    );
  }
}

export default hot(module)(App);
