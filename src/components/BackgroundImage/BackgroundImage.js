import * as React from 'react';
import style from './BackgroundImage.css';

const BackgroundImage = ({ className, imageSrc, children, ...other }) => {
  let cx = style['background-image'];
  cx += className ? ' ' + className : '';
  return (
    <div>
      <div
        className={cx}
        style={{ backgroundImage: `url('${imageSrc}')` }}
        {...other}
      />
      <div className={style['background-image-children']}>{children}</div>
    </div>
  );
};

export default BackgroundImage;
