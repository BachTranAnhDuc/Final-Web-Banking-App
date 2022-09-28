import React from 'react';
import avt1 from '../assets/images/avt/avatar-01.svg';
import design1 from '../assets/images/design/design-01.svg';

import { MdEmail } from 'react-icons/md';
import { FaPhone, FaAddressCard } from 'react-icons/fa';
import { BsFillCalendarDateFill } from 'react-icons/bs';

import { useGlobalContext } from '../context/appContext';

const Account = () => {
  const { user } = useGlobalContext();

  return (
    <div className="section-setting section-setting__account">
      <div className="setting-account__images">
        <img src={avt1} alt="avatar" className="setting-account__image" />

        <img src={design1} alt="circle 1" className="icon-design__circle" />

        <p className="setting-account__context--text setting-account__context--text-name">
          {user.name}
        </p>
      </div>
      <div className="setting-account__context">
        <div className="setting-account__context--control">
          <h3 className="setting-account__context--label">Email</h3>
          <p className="setting-account__context--text">{user.email}</p>
          <MdEmail className="setting-account__icon"></MdEmail>
        </div>
        <div className="setting-account__context--control">
          <h3 className="setting-account__context--label">Phone</h3>
          <p className="setting-account__context--text">{user.phone}</p>

          <FaPhone className="setting-account__icon"></FaPhone>
        </div>
        <div className="setting-account__context--control">
          <h3 className="setting-account__context--label">Address</h3>
          <p className="setting-account__context--text">{user.address}</p>
          <FaAddressCard className="setting-account__icon"></FaAddressCard>
        </div>
        <div className="setting-account__context--control">
          <h3 className="setting-account__context--label">Birth</h3>
          <p className="setting-account__context--text">{user.birth}</p>

          <BsFillCalendarDateFill className="setting-account__icon"></BsFillCalendarDateFill>
        </div>
      </div>
    </div>
  );
};

export default Account;