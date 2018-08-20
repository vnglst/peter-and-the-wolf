import cx from 'classnames';
import * as React from 'react';
import styles from './Button.css';

const Button = ({ children, className, ...other }) => (
  <button
    type="button"
    className={cx(styles['my-button'], className)}
    {...other}
  >
    {children}
  </button>
);

export default Button;
