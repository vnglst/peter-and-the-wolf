/* eslint no-console: 0 */

import AboutPopup from 'components/AboutPopup';
import AudioButton from 'components/AudioButton';
import BackgroundImage from 'components/BackgroundImage';
import BottomBar from 'components/BottomBar';
import AudioIcon from 'components/AudioIcon';
import { Forward30Icon, InfoIcon, Replay30Icon } from 'components/SvgIcons';
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
    this.soundHandler = new SoundHandler({
      config: props.config,
      Howl,
      onEnd: this.handlePlayEnd,
      onStop: this.handlePlayEnd,
      onPause: this.handlePlayEnd,
      onLoad: this.handleSoundLoad,
      onStart: this.handlePlayStart,
      onSeek: this.handleSeek,
      onMainProgress: this.handleMainSoundProgress,
    });
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
      soundsSeeking: {},
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

  handleSoundLoad = () => {
    this.setState({ soundsLoaded: { ...this.soundHandler.soundsLoaded } });
  };

  handleSeek = () => {
    // console.log('seeking');
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
    this.soundHandler.skipMain(value);
  };

  handleSoundPlayToggle = soundId => {
    const { currentSoundId } = this.state;
    this.soundHandler.togglePlay(soundId, currentSoundId);
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
            isLoading={!this.isLoaded(sound.id)}
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
              icon={
                <AudioIcon
                  isLoading={!mainAudioIsReady}
                  isPlaying={mainAudioIsPlaying}
                />
              }
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
