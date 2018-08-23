import * as React from 'react';
import styles from './Button.css';

const Button = ({ children, className, isCurrentlyPlaying, ...other }) => {
  let cx = styles['my-button'];
  if (className) cx += ' ' + className;
  if (isCurrentlyPlaying) cx += styles['is-currently-playing'];
  return (
    <button type="button" className={cx} {...other}>
      {children}
    </button>
  );
};

export default Button;
