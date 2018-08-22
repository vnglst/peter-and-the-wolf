import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import SoundFX from './utils/web-sound-fx';
import BackgroundImage from './components/BackgroundImage';
import Button from './components/Button';
import backgroundJpg from './images/kym-645714-unsplash.jpg';
import styles from './app.css';
import './Global.css';

// TODO: Fix a11y
/* eslint jsx-a11y/accessible-emoji: 0 */
/* eslint jsx-a11y/media-has-caption: 0 */

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.currentSoundId = '';
    this.sfx = new SoundFX();
    this.sfx.load('./sound-fxs/wolf.mp3', 'wolf');
    this.sfx.load('./sound-fxs/bird.mp3', 'bird');
    this.sfx.load('./sound-fxs/duck.mp3', 'duck');
    this.sfx.load('./sound-fxs/grandfather.mp3', 'grandfather');
    this.sfx.load('./sound-fxs/peter.mp3', 'peter');
    this.sfx.load('./sound-fxs/cat.mp3', 'cat');
    this.sfx.load('./sound-fxs/rifleshots.mp3', 'rifleshots');
  }

  playSound(soundId) {
    this.sfx.stop(this.currentSoundId);
    this.sfx.play(soundId);
    this.currentSoundId = soundId;
  }

  render() {
    return (
      <BackgroundImage imageSrc={backgroundJpg}>
        <div className={styles.app}>
          <h1 className={styles.title}>Peter and the Wolf</h1>
          <div className={styles.grid}>
            <Button onClick={() => this.playSound('peter')}>👦</Button>
            <Button onClick={() => this.playSound('wolf')}>🐺</Button>
            <Button onClick={() => this.playSound('bird')}>🐦</Button>
            <Button onClick={() => this.playSound('duck')}>🦆</Button>
            <Button onClick={() => this.playSound('grandfather')}>👴</Button>
            <Button onClick={() => this.playSound('cat')}>😼</Button>
            <Button onClick={() => this.playSound('rifleshots')}>🔫</Button>
          </div>
          <div className={styles['audio-container']}>
            <audio
              id="main-audio"
              controls
              src="./sounds/karloff-without-intro.mp3"
            />
          </div>
        </div>
      </BackgroundImage>
    );
  }
}

export default hot(module)(App);
