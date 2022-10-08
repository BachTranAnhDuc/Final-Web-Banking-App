import React from 'react';
import { Outlet } from 'react-router-dom';
import { useGlobalContext } from '../context/appContext';
import NavSetting from './NavSetting';
import { Setting } from '../components';
import { Toast } from '../components';

import SettingStyled from '../theme/pages/Setting';

const ShareLayoutSetting = () => {
  return (
    <SettingStyled>
      <section className="section-setting__container">
        <NavSetting></NavSetting>
        <Outlet></Outlet>
        <Toast></Toast>
      </section>
    </SettingStyled>
  );
};

export default ShareLayoutSetting;
