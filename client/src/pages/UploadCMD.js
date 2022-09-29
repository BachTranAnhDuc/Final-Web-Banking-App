import React from 'react';

import imgFront from '../assets/images/default-iden-front.svg';
import imgBack from '../assets/images/default-iden-back.svg';

import { useGlobalContext } from '../context/appContext';

import { Loader2 } from '../components';

const UploadCMD = () => {
  const { isLoader } = useGlobalContext();

  if (isLoader) {
    return (
      <div className="section-setting">
        <Loader2></Loader2>;
      </div>
    );
  }

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
