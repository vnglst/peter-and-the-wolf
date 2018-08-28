// TODO: Fix a11y
/* eslint no-console: 0 */

import PlayIcon from '@material-ui/icons/PlayArrow';
import PauzeIcon from '@material-ui/icons/Pause';
import Forward from '@material-ui/icons/Forward30';
import Replay from '@material-ui/icons/Replay30';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader';
import SoundFX from 'utils/web-sound-fx';
import Storage from 'utils/storage';
import { isNumeric } from 'utils/misc';
import { Howl } from 'howler';
import BottomBar from 'components/BottomBar';
import BackgroundImage from 'components/BackgroundImage';
import AudioButton from 'components/AudioButton';
import styles from './app.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.storage = new Storage(props.config.storageKey);
    this.setInitialState();
    this.loadSoundFxs();
    this.loadMainSound();
  }

  componentDidMount() {
    this.registerEventListeners();
  }

  registerEventListeners = () => {
    this.sound.once('load', this.onMainSoundLoad);
  };

  onMainSoundLoad = () => {
    const { currentPosition } = this.state;
    const { config } = this.props;
    this.sound.seek(currentPosition);
    setInterval(this.saveCurrentPosition, config.positionRefreshRate);
    this.setState({ audioReady: true });
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
      audioReady: false,
      playing: false,
      currentSoundFxId: '',
      currentPosition: 0,
      ...savedState,
    };
  };

  loadMainSound = () => {
    const { config } = this.props;
    this.sound = new Howl({
      src: [config.soundsPath + config.mainSoundFile],
      html5: true,
    });
  };

  loadSoundFxs = () => {
    const { config } = this.props;
    this.sfx = new SoundFX();
    config.soundEffects.map(sound =>
      this.sfx.load(config.soundsPath + sound.mp3, sound.id),
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
    const { config } = this.props;
    return config.soundEffects.map(sound => (
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
    const { config } = this.props;
    return (
      <BackgroundImage imageSrc={config.backgroundImage}>
        <div className={styles.app}>
          <h1 className={styles.title}>{config.title}</h1>
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

App.propTypes = {
  config: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array]),
  ).isRequired,
};

export default hot(module)(App);
