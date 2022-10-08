import React, { useState } from 'react';

import { NavLink } from 'react-router-dom';

import { Loader2 } from '../components';

import { HiOutlineUser } from 'react-icons/hi';
import { AiOutlineMail } from 'react-icons/ai';
import { BsCalendar2Date } from 'react-icons/bs';
import { FaPhone } from 'react-icons/fa';

import { useGlobalContext } from '../context/appContext';

import SettingStyled from '../theme/pages/Setting';

const Setting = () => {
  const { switchSetting, isLoader, user } = useGlobalContext();

  const { name, email, phone, birth } = user;

  const initState = {
    name: name,
    email: email,
    phone: phone,
    birth: birth,
  };

  const [values, setValues] = useState(initState);

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
      <div className="section-setting setting-all">
        <form className="setting-form">
          <div className="setting-heading__content">
            <div className="setting-heading__context">
              <h3 className="heading--tertiary setting-form__heading">
                Personal info
              </h3>
              <p className="setting-heading__text setting-heading__text--small">
                Update your photo and personal details here
              </p>
            </div>

            <div className="setting-heading__buttons">
              <button className="btn" type="button">
                Cancel
              </button>
              <button className="btn" type="button">
                Save
              </button>
            </div>
          </div>

          <div
            className="form-control
        form-control__setting"
          >
            <label htmlFor="name" className="form-label setting-form__label">
              <span>Name</span>
            </label>
            <input
              type="text"
              className="setting-form__input"
              name="name"
              id="name"
              value={values.name}
            />
            <div className="setting__icon-container">
              <HiOutlineUser className="setting__icon"></HiOutlineUser>
            </div>
          </div>

          <div
            className="form-control
        form-control__setting"
          >
            <label htmlFor="email" className="form-label setting-form__label">
              <span>Email</span>
            </label>
            <input
              type="email"
              className="setting-form__input"
              name="email"
              id="email"
              value={values.email}
            />
            <div className="setting__icon-container">
              <AiOutlineMail className="setting__icon"></AiOutlineMail>
            </div>
          </div>

          <div
            className="form-control
          form-control__setting"
          >
            <label htmlFor="birth" className="form-label setting-form__label">
              <span>Phone</span>
            </label>
            <input
              type="text"
              className="setting-form__input"
              name="phone"
              id="phone"
              value={values.phone}
            />
            <div className="setting__icon-container">
              <FaPhone className="setting__icon"></FaPhone>
            </div>
          </div>

          <div
            className="form-control
          form-control__setting"
          >
            <label htmlFor="birth" className="form-label setting-form__label">
              <span>Birth</span>
            </label>
            <input
              type="date"
              className="setting-form__input"
              name="birth"
              id="birth"
              value={values.birth}
            />
            <div className="setting__icon-container">
              <BsCalendar2Date className="setting__icon"></BsCalendar2Date>
            </div>
          </div>
        </form>
      </div>
    </SettingStyled>
  );
};

export default Setting;
