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

  return <div className="section-setting section-setting__upload"></div>;
};

export default UploadCMD;
