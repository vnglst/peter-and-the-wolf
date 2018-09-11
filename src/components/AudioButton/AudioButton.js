import AudioIcon from 'components/AudioIcon';
import * as React from 'react';
import Button from 'components/Button';
import styles from './AudioButton.css';

const AudioButton = ({
  children,
  className,
  isLoading,
  isCurrentlyPlaying,
  ...other
}) => {
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
        <AudioIcon isLoading={isLoading} isPlaying={isCurrentlyPlaying} />
      </span>
    </Button>
  );
};

export default AudioButton;
