import * as React from 'react';
import PropTypes from 'prop-types';
import styles from './BottomBarItem.css';

const BottomBarItem = ({ value, onChange, icon, ...other }) => (
  <button
    type="button"
    className={styles['bottom-bar-button']}
    onClick={() => onChange(value)}
    {...other}
  >
    {icon}
  </button>
);

BottomBarItem.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  icon: PropTypes.element.isRequired,
};

export default BottomBarItem;
