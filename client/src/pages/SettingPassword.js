import React, { useState } from 'react';

import { RiLockPasswordLine } from 'react-icons/ri';
import { BsArrowRightCircle } from 'react-icons/bs';

import { useGlobalContext } from '../context/appContext';

import { Loader2 } from '../components';

const SettingPassword = () => {
  const [next, setNext] = useState(false);

  const { isLoader } = useGlobalContext();

  if (isLoader) {
    return (
      <div className="section-setting">
        <Loader2></Loader2>;
      </div>
    );
  }

  return (
    <div className="section-setting section-setting__password">
      <div className="setting-password__heading">
        <h3 className="setting-password__heading-text">Change Password</h3>

        <div className="setting-password__group-btns">
          <button className="btn" type="button" onClick={() => setNext(false)}>
            Cancel
          </button>
          <button className="btn" type="button">
            Save
          </button>
        </div>
      </div>

      {next ? (
        <form className="setting-password__form">
          <div className="setting-password__form-controls ">
            <label htmlFor="pwd" className="setting-password__form-label">
              New password
            </label>
            <input
              className="setting-password__form-input"
              type="password"
              id="pwd"
              name="pwd"
            />
            <div className="setting__icon-container">
              <RiLockPasswordLine className="setting-password__icon"></RiLockPasswordLine>
            </div>
          </div>

          <div className="setting-password__form-controls">
            <label htmlFor="pwd" className="setting-password__form-label">
              Confirm Password
            </label>
            <input
              className="setting-password__form-input"
              type="password"
              id="pwd"
              name="pwd"
            />
            <div className="setting__icon-container">
              <RiLockPasswordLine className="setting-password__icon"></RiLockPasswordLine>
            </div>
          </div>
        </form>
      ) : (
        <form className="setting-password__form">
          <div className="setting-password__form-controls setting-password__form-controls--first">
            <label htmlFor="pwd" className="setting-password__form-label">
              Password
            </label>
            <input
              className="setting-password__form-input"
              type="password"
              id="pwd"
              name="pwd"
            />
            <div className="setting__icon-container">
              <RiLockPasswordLine className="setting-password__icon"></RiLockPasswordLine>
            </div>
          </div>
          {/* <button
            className="setting-password__btn-next"
            type="button"
            onClick={() => setNext(true)}
          >
            <BsArrowRightCircle className="setting-password__icon"></BsArrowRightCircle>
          </button> */}
        </form>
      )}
    </div>
  );
};

export default SettingPassword;
