import React, { useState } from 'react';

import { RiLockPasswordLine } from 'react-icons/ri';
import { BsArrowRightCircle } from 'react-icons/bs';

const SettingPassword = () => {
  const [next, setNext] = useState(false);

  return (
    <div className="section-setting section-setting__password">
      <div className="setting-password__heading">
        <h3 className="setting-password__heading-text">Change Password</h3>

        <div className="setting-password__group-btns">
          <button
            className="button-83"
            type="button"
            onClick={() => setNext(false)}
          >
            Cancel
          </button>
          <button className="button-83" type="button">
            Save
          </button>
        </div>
      </div>

      {next ? (
        <form className="setting-password__form">
          <div className="setting-password__form-controls ">
            <RiLockPasswordLine className="setting-password__icon"></RiLockPasswordLine>
            <label htmlFor="pwd" className="setting-password__form-label">
              New password
            </label>
            <input
              className="setting-password__form-input"
              type="password"
              id="pwd"
              name="pwd"
            />
          </div>

          <div className="setting-password__form-controls">
            <RiLockPasswordLine className="setting-password__icon"></RiLockPasswordLine>
            <label htmlFor="pwd" className="setting-password__form-label">
              Confirm Password
            </label>
            <input
              className="setting-password__form-input"
              type="password"
              id="pwd"
              name="pwd"
            />
          </div>
        </form>
      ) : (
        <form className="setting-password__form">
          <div className="setting-password__form-controls setting-password__form-controls--first">
            <RiLockPasswordLine className="setting-password__icon"></RiLockPasswordLine>
            <label htmlFor="pwd" className="setting-password__form-label">
              Password
            </label>
            <input
              className="setting-password__form-input"
              type="password"
              id="pwd"
              name="pwd"
            />
            <button type="button" onClick={() => setNext(true)}>
              <BsArrowRightCircle className="setting-password__icon"></BsArrowRightCircle>
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default SettingPassword;
