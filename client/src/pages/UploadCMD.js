import React from 'react';

import imgFront from '../assets/images/default-iden-front.svg';
import imgBack from '../assets/images/default-iden-back.svg';

import { useGlobalContext } from '../context/appContext';

import { Loader2 } from '../components';

import SettingStyled from '../theme/pages/Setting';

const UploadCMD = () => {
  const { isLoader } = useGlobalContext();

  if (isLoader) {
    return (
      <SettingStyled>
        <div className="section-setting">
          <Loader2></Loader2>;
        </div>
      </SettingStyled>
    );
  }

  return (
    <SettingStyled>
      <div className="section-setting section-setting__upload"></div>
      <div className="section-setting section-setting__upload"></div>
    </SettingStyled>
  );
};

export default UploadCMD;
