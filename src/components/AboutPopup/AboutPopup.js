import * as React from 'react';
import Overlay from 'components/Overlay';
import Button from 'components/Button';
import PropTypes from 'prop-types';
import styles from './AboutPopup.css';

const AboutPopup = ({ active, onClose }) => {
  if (!active) return null;
  return (
    <Overlay className={styles.about}>
      <p>
        Created by <a href="https://koenvangilst.nl">Koen van Gilst</a>
      </p>
      <p>
        Extensive testing by my kids{' '}
        <span role="img" aria-label="monkey emoji">
          🐵🐵
        </span>
      </p>
      <p>
        Source code on{' '}
        <a href="https://github.com/vnglst/peter-and-the-wolf">Github</a>
      </p>
      <Button onClick={onClose}>Back</Button>
    </Overlay>
  );
};

AboutPopup.propTypes = {
  active: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default AboutPopup;
