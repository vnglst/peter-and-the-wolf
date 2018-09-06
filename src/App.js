/* eslint no-console: 0 */

import AboutPopup from 'components/AboutPopup';
import AudioButton from 'components/AudioButton';
import BackgroundImage from 'components/BackgroundImage';
import BottomBar from 'components/BottomBar';
import {
  PlayIcon,
  PauzeIcon,
  InfoIcon,
  Replay30Icon,
  Forward30Icon,
} from 'components/SvgIcons';
import { Howl } from 'howler';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { isNumeric } from 'utils/misc';
import Storage from 'utils/storage';
import styles from './app.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.storage = new Storage(props.config.storageKey);
    this.setInitialState();
  }

  componentDidMount() {
    this.loadSounds();
  }

  setInitialState = () => {
    const savedState = this.storage.load();
    this.state = {
      currentSoundId: '',
      soundLoaded: {},
      sounds: {},
      currentPosition: 0,
      aboutPopupIsOpen: false,
      ...savedState,
    };
  };

  loadSounds = () => {
    const { config } = this.props;
    const sounds = {};
    config.soundsData.forEach(sound => {
      const filePath = config.soundsPath + sound.file;
      const mp3 = filePath + '.mp3';
      const mp4 = filePath + '.mp4';
      const webm = filePath + '.webm';
      sounds[sound.id] = new Howl({
        src: [webm, mp4, mp3],
        onend: () => this.handlePlayEnd(),
        onload: () => this.handleAudioLoad(sound.id),
        onloaderror: () => console.log('load error', sound.id),
        html5: sound.html5,
      });
    });
    this.setState({ sounds });
  };

  handlePlayEnd = () => {
    this.setState({ currentSoundId: '' });
  };

  handleAudioLoad = soundId => {
    if (soundId === 'main') this.onMainSoundLoad();
    this.setState(state => ({
      soundLoaded: { ...state.soundLoaded, [soundId]: true },
    }));
  };

  onMainSoundLoad = () => {
    const { currentPosition, sounds } = this.state;
    const { config } = this.props;
    sounds.main.seek(currentPosition);
    setInterval(this.saveCurrentPosition, config.positionRefreshRate);
  };

  saveCurrentPosition = () => {
    const { sounds } = this.state;
    const newPosition = sounds.main.seek();
    const isValidNewPosition = isNumeric(newPosition);
    if (isValidNewPosition) {
      this.setState({ currentPosition: newPosition });
      this.storage.save({ currentPosition: newPosition });
    }
  };

  stopAllSound = () => {
    const { sounds } = this.state;
    Object.keys(sounds).forEach(soundId => {
      if (soundId === 'main') {
        sounds.main.pause();
      } else {
        sounds[soundId].stop();
      }
    });
    this.setState({ currentSoundId: '' });
  };

  handleSkip = value => {
    const { currentSoundId, sounds } = this.state;
    const currentTime = sounds.main.seek();
    sounds.main.seek(currentTime + value);
    const mainSoundIsPlaying = currentSoundId === 'main';
    if (!mainSoundIsPlaying) this.handleSoundPlayToggle('main');
  };

  handleSoundPlayToggle = soundId => {
    const { soundLoaded, currentSoundId } = this.state;

    if (!soundLoaded[soundId]) return;

    this.stopAllSound();

    const isPlaying = currentSoundId && soundId === currentSoundId;
    if (isPlaying) {
      return;
    }

    this.playSound(soundId);
  };

  playSound = soundId => {
    const { sounds } = this.state;
    sounds[soundId].play();
    this.setState({ currentSoundId: soundId });
  };

  getProgressInPercent = () => {
    const { sounds } = this.state;
    if (!sounds.main) return 0;
    const duration = sounds.main.duration();
    if (Number.isNaN(duration) || duration === 0) return 0;
    const { currentPosition } = this.state;
    return (currentPosition / duration) * 100;
  };

  handleAboutPopupClose = () => {
    this.setState({ aboutPopupIsOpen: false });
  };

  handleAboutPopupOpen = () => {
    this.setState({ aboutPopupIsOpen: true });
  };

  renderSoundFxsButtons = () => {
    const { currentSoundId, soundLoaded } = this.state;
    const { config } = this.props;
    return config.soundsData.map(sound => {
      if (sound.soundFx)
        return (
          <AudioButton
            isCurrentlyPlaying={sound.id === currentSoundId}
            disabled={!soundLoaded[sound.id]}
            key={sound.id}
            onClick={() => this.handleSoundPlayToggle(sound.id)}
          >
            {sound.label}
          </AudioButton>
        );
      return null;
    });
  };

  render() {
    const { currentSoundId, soundLoaded, aboutPopupIsOpen } = this.state;
    const { config } = this.props;
    const mainAudioIsPlaying = currentSoundId === 'main';
    const mainAudioIsReady = soundLoaded.main;
    return (
      <BackgroundImage imageSrc={config.backgroundImage}>
        <div className={styles.app}>
          <h1 className={styles.title}>{config.title}</h1>
          <div className={styles.grid}>{this.renderSoundFxsButtons()}</div>
          <BottomBar>
            <BottomBar.Button
              disabled={!mainAudioIsReady}
              aria-label="30 seconds back"
              value="skip-back"
              onChange={() => this.handleSkip(-30)}
              icon={<Replay30Icon />}
            />
            <BottomBar.Button
              disabled={!mainAudioIsReady}
              aria-label={mainAudioIsPlaying ? 'Pauze' : 'Play'}
              value={mainAudioIsPlaying ? 'pauze' : 'play'}
              onChange={() => this.handleSoundPlayToggle('main')}
              icon={mainAudioIsPlaying ? <PauzeIcon /> : <PlayIcon />}
            />
            <BottomBar.Button
              disabled={!mainAudioIsReady}
              aria-label="30 seconds forward"
              value="skip-forward"
              onChange={() => this.handleSkip(30)}
              icon={<Forward30Icon />}
            />
            <BottomBar.Button
              aria-label="Info"
              value="info"
              onChange={this.handleAboutPopupOpen}
              icon={<InfoIcon />}
            />
            <BottomBar.Progress
              progressInPercent={this.getProgressInPercent()}
            />
          </BottomBar>
          <AboutPopup
            active={aboutPopupIsOpen}
            onClose={this.handleAboutPopupClose}
          />
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
