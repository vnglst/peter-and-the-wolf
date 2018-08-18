import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import mp3 from './sounds/karloff-without-intro.mp3';
import BackgroundImage from './components/BackgroundImage';
import Button from './components/Button';
import backgroundJpg from './images/kym-645714-unsplash.jpg';
import styles from './app.css';
import './Global.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <BackgroundImage imageSrc={backgroundJpg}>
        <div className={styles['app']}>
          <h1 className={styles['title']}>Peter and the Wolf</h1>
          <div className={styles['row']}>
            <div className={styles['column']}>
              <Button>🐺</Button>
              <Button>🐦</Button>
              <Button>🦆</Button>
            </div>
            <div className={styles['column']}>
              <Button>👴</Button>
              <Button>👦</Button>
              <Button>😼</Button>
            </div>
          </div>
          <div className={styles['audio-container']}>
            <audio controls src={mp3}>
              <track kind="captions" />
            </audio>
          </div>
        </div>
      </BackgroundImage>
    );
  }
}

export default hot(module)(App);
