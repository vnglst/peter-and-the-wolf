import * as React from 'react';
import PropTypes from 'prop-types';
import styles from './BottomBar.css';

const BottomBar = ({ children }) => (
  <div className={styles['bottom-bar']}>{children}</div>
);

BottomBar.propTypes = {
  children: PropTypes.node.isRequired,
};

export default BottomBar;
