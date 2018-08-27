import * as React from 'react';
import PropTypes from 'prop-types';
import styles from './BottomBarProgress.css';

const BottomBarProgress = ({ progressInPercent }) => (
  <span className={styles['progress-container']}>
    <span
      style={{ width: progressInPercent + '%' }}
      className={styles['progress-done']}
    />
  </span>
);

BottomBarProgress.propTypes = {
  progressInPercent: PropTypes.number.isRequired,
};

export default BottomBarProgress;
