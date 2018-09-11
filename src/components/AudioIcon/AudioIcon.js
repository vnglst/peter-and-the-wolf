import React from 'react';
import PropTypes from 'prop-types';
import { PauzeIcon, PlayIcon, Snowflake } from 'components/SvgIcons';
import styles from './AudioIcon.css';

const AudioIcon = ({ isLoading, isPlaying }) => {
  if (isLoading)
    return (
      <div className={styles.spinner}>
        <Snowflake />
      </div>
    );
  if (isPlaying) return <PauzeIcon />;
  return <PlayIcon />;
};

AudioIcon.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  isPlaying: PropTypes.bool.isRequired,
};

export default AudioIcon;
