import * as React from 'react';
import PropTypes from 'prop-types';
import Button from 'components/Button';
import styles from './BottomBarButton.css';

const BottomBarButton = ({ value, onChange, icon, ...other }) => (
  <Button
    className={styles['bottom-bar-button']}
    onClick={() => onChange(value)}
    {...other}
  >
    {icon}
  </Button>
);

BottomBarButton.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  icon: PropTypes.element.isRequired,
};

export default BottomBarButton;
