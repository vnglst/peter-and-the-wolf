/* eslint no-console: 0 */

import AboutPopup from 'components/AboutPopup';
import AudioButton from 'components/AudioButton';
import BackgroundImage from 'components/BackgroundImage';
import BottomBar from 'components/BottomBar';
import {
  Forward30Icon,
  InfoIcon,
  PauzeIcon,
  PlayIcon,
  Replay30Icon,
} from 'components/SvgIcons';
import { Howl } from 'howler';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { hot } from 'react-hot-loader';
import SoundHandler from 'utils/SoundHandler';
import Storage from 'utils/Storage';
import styles from './app.css';

class App extends PureComponent {
  constructor(props) {
    super(props);
    this.storage = new Storage(props.config.storageKey);
    this.soundHandler = new SoundHandler({ config: props.config, Howl });
    this.soundHandler.onPlayEnd = this.handlePlayEnd;
    this.soundHandler.onPlayStop = this.handlePlayEnd;
    this.soundHandler.onPlayPause = this.handlePlayEnd;
    this.soundHandler.onSoundLoad = this.handleAudioLoad;
    this.soundHandler.onPlayStart = this.handlePlayStart;
    this.soundHandler.onMainSoundProgress = this.handleMainSoundProgress;
    this.setInitialState();
  }

  componentDidMount() {
    this.loadSounds();
  }

  setInitialState = () => {
    const savedState = this.storage.load();
    this.state = {
      currentSoundId: '',
      soundsLoaded: {},
      currentPosition: 0,
      aboutPopupIsOpen: false,
      ...savedState,
    };
  };

  loadSounds = () => {
    const { currentPosition } = this.state;
    this.soundHandler.mainStartPosition = currentPosition;
    this.soundHandler.load();
  };

  handlePlayStart = soundId => {
    this.setState({ currentSoundId: soundId });
  };

  handlePlayEnd = () => {
    this.setState({ currentSoundId: '' });
  };

  handleAudioLoad = () => {
    this.setState({ soundsLoaded: { ...this.soundHandler.soundsLoaded } });
  };

  handleMainSoundProgress = newPosition => {
    this.setState({ currentPosition: newPosition });
    this.storage.save({ currentPosition: newPosition });
  };

  isLoaded = soundId => {
    const { soundsLoaded } = this.state;
    return soundsLoaded[soundId];
  };

  handleSkip = value => {
    this.soundHandler.skipMainSound(value);
  };

  handleSoundPlayToggle = soundId => {
    const { currentSoundId } = this.state;
    this.soundHandler.toggleSoundPlay(soundId, currentSoundId);
  };

  getProgressInPercent = () => this.soundHandler.getMainProgressInPercent();

  handleAboutPopupClose = () => {
    this.setState({ aboutPopupIsOpen: false });
  };

  handleAboutPopupOpen = () => {
    this.setState({ aboutPopupIsOpen: true });
  };

  renderSoundFxsButtons = () => {
    const { currentSoundId } = this.state;
    const { config } = this.props;
    return config.soundsData.map(sound => {
      if (sound.soundFx)
        return (
          <AudioButton
            isCurrentlyPlaying={sound.id === currentSoundId}
            disabled={!this.isLoaded(sound.id)}
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
    const { currentSoundId, aboutPopupIsOpen } = this.state;
    const { config } = this.props;
    const mainAudioIsPlaying = currentSoundId === 'main';
    const mainAudioIsReady = this.isLoaded('main');
    console.log('rendering');
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
