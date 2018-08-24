import * as React from 'react';
import styles from './Button.css';

const Button = ({ children, className, ...other }) => {
  let cx = styles['default-button'];
  if (className) cx += ' ' + className;
  return (
    <button type="button" className={cx} {...other}>
      {children}
    </button>
  );
};

export default Button;
