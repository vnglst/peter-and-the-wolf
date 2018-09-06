import { PlayIcon, PauzeIcon } from 'components/SvgIcons';
import * as React from 'react';
import Button from 'components/Button';
import styles from './AudioButton.css';

const AudioButton = ({ children, className, isCurrentlyPlaying, ...other }) => {
  let cx = styles['audio-button'];
  if (className) cx += ' ' + className;
  return (
    <Button className={cx} {...other}>
      <span className={styles['button-content']}>{children}</span>
      <span
        className={
          styles['button-content'] +
          ' ' +
          styles['play-pause-icon-overlay'] +
          (isCurrentlyPlaying ? ' ' + styles['is-currently-playing'] : '')
        }
      >
        {isCurrentlyPlaying ? <PauzeIcon /> : <PlayIcon />}
      </span>
    </Button>
  );
};

export default AudioButton;
