import cx from 'classnames';
import * as React from 'react';
import style from './BackgroundImage.css';

const BackgroundImage = ({ className, imageSrc, children, ...other }) => (
  <div>
    <div
      className={cx(style['background-image'], className)}
      style={{ backgroundImage: `url('${imageSrc}')` }}
      {...other}
    />
    <div className={style['background-image-children']}>{children}</div>
  </div>
);

export default BackgroundImage;
