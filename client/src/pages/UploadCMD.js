import React from 'react';

import imgFront from '../assets/images/default-iden-front.svg';
import imgBack from '../assets/images/default-iden-back.svg';

const UploadCMD = () => {
  return (
    <div className="section-setting section-setting__upload">
      <div className="setting-upload__container-img">
        <div className="setting-upload__image-front">
          <img src={imgFront} alt="identity" className="upload-cccd__img" />
        </div>
        <div className="setting-upload__image-back">
          <img src={imgBack} alt="identity" className="upload-cccd__img" />
        </div>
      </div>
    </div>
  );
};

export default UploadCMD;
