import * as React from 'react';
import PropTypes from 'prop-types';
import styles from './Overlay.css';

const Overlay = ({ className, children }) => {
  let cx = styles['overlay-content'] + ' ' + styles['slide-in-top'];
  if (className) cx += ' ' + className;
  return (
    <div className={styles.overlay}>
      <div className={cx}>{children}</div>
    </div>
  );
};

Overlay.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default Overlay;
