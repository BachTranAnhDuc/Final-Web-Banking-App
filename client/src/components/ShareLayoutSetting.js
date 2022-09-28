import React from 'react';
import { Outlet } from 'react-router-dom';
import { useGlobalContext } from '../context/appContext';
import NavSetting from './NavSetting';
import { Setting } from '../components';

const ShareLayoutSetting = () => {
  return (
    <section className="section-setting__container">
      <NavSetting></NavSetting>
      <Outlet></Outlet>
    </section>
  );
};

export default ShareLayoutSetting;
