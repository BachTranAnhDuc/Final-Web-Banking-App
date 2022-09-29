import React, { useEffect, useState } from 'react';

import { Loading, Toast } from '../components';

import { useGlobalContext } from '../context/appContext';

import { HiOutlineUsers } from 'react-icons/hi';
import { BsFillGearFill } from 'react-icons/bs';
import { FaUsers, FaSketch } from 'react-icons/fa';

const Dashboard = () => {
  const { user, showToast, showToastSuccess, showToastError } =
    useGlobalContext();

  const { name, identify, role, email } = user;

  const [getLoading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);

  if (getLoading) {
    return <Loading></Loading>;
  }

  return (
    <section className="section-dashboard">
      {/* <h1 className="heading--primary">This is dasboard</h1>
      <h2 className="heading--secondary">{`Hello ${name}`}</h2>
      <p>{`You are ${role}`}</p>

      <span>
        {identify === 'processing'
          ? 'Your account is processing....'
          : identify === 'fail'
          ? 'Your account is banded please contact with admin to solve this problem'
          : 'Success'}
      </span>

      <button className="btn" onClick={() => showToastSuccess('Success')}>
        Toast
      </button> */}

      <div className="dashboard__header">
        <div className="dashboard__header--container-1">
          <h4 className="dashboard__heading">User</h4>
          <span className="dashboard__span">1096</span>
        </div>

        <div className="dashboard__header--container-2">
          <h4 className="dashboard__heading">Balance</h4>
          <span className="dashboard__span">1096</span>
        </div>

        <div className="dashboard__header--container-3">
          <h4 className="dashboard__heading">Account</h4>
          <span className="dashboard__span">View</span>
        </div>
      </div>

      {/* <Toast></Toast> */}
    </section>
  );
};

export default Dashboard;
