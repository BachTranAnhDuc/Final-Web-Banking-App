import React from 'react';

import { NavLink } from 'react-router-dom';

import { HiOutlineUser } from 'react-icons/hi';
import { AiOutlineMail } from 'react-icons/ai';
import { BsCalendar2Date } from 'react-icons/bs';

const Setting = () => {
  return (
    <div className="section-setting">
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
            <button className="button-83" type="button">
              Cancel
            </button>
            <button className="button-83" type="button">
              Save
            </button>
          </div>
        </div>

        <div
          className="form-control
        form-control__setting"
        >
          <HiOutlineUser className="setting__icon"></HiOutlineUser>
          <label htmlFor="name" className="form-label setting-form__label">
            <span>Name</span>
          </label>
          <input
            type="text"
            className="setting-form__input"
            name="name"
            id="name"
          />
        </div>

        <div
          className="form-control
        form-control__setting"
        >
          <AiOutlineMail className="setting__icon"></AiOutlineMail>
          <label htmlFor="email" className="form-label setting-form__label">
            <span>Email</span>
          </label>
          <input
            type="email"
            className="setting-form__input"
            name="email"
            id="email"
          />
        </div>

        <div
          className="form-control
        form-control__setting"
        >
          <BsCalendar2Date className="setting__icon"></BsCalendar2Date>
          <label htmlFor="birth" className="form-label setting-form__label">
            <span>Birth</span>
          </label>
          <input
            type="date"
            className="setting-form__input"
            name="birth"
            id="birth"
          />
        </div>
      </form>
    </div>
  );
};

export default Setting;
