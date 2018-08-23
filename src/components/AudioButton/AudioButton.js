import { faPause, faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';
import Button from '../Button';
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
        <FontAwesomeIcon icon={isCurrentlyPlaying ? faPause : faPlay} />
      </span>
    </Button>
  );
};

export default AudioButton;
