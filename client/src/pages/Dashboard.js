import React, { useEffect, useState } from 'react';

import { Loading, Toast } from '../components';

import { useGlobalContext } from '../context/appContext';

import { HiOutlineUsers } from 'react-icons/hi';
import { BsFillGearFill } from 'react-icons/bs';
import { FaUsers, FaSketch } from 'react-icons/fa';
import { AiFillHome } from 'react-icons/ai';

import DashboardStyle from '../theme/pages/Dashboard';

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
    <DashboardStyle>
      <section className="section-dashboard">
        <div className="dashboard__content-text">
          <div className="dashboard__content-text--containericon">
            <AiFillHome className="dashboard__content-text--icon"></AiFillHome>
          </div>
          <h2 className="dashboard__content-text--heading">Home</h2>
        </div>
        <div className="dashboard__header">
          <div className="dashboard__header--container dashboard__header--container-1">
            <div className="dashboard__header--container-context">
              <h4 className="dashboard__heading">User</h4>
              <span className="dashboard__span">1096</span>
              <p className="dashboard__text">Text here</p>
              <FaUsers className="dashboard__header--icon"></FaUsers>
            </div>
            <img
              src="https://technext.github.io/purple-react/static/media/circle.953c9ca0.svg"
              alt="svg"
              className="dashboard__header--img-design"
            />
          </div>

          <div className="dashboard__header--container dashboard__header--container-2">
            <div className="dashboard__header--container-context">
              <h4 className="dashboard__heading">Balance</h4>
              <span className="dashboard__span">1096</span>
              <p className="dashboard__text">Text here</p>
              <FaSketch className="dashboard__header--icon"></FaSketch>
            </div>
            <img
              src="https://technext.github.io/purple-react/static/media/circle.953c9ca0.svg"
              alt="svg"
              className="dashboard__header--img-design"
            />
          </div>

          <div className="dashboard__header--container dashboard__header--container-3">
            <div className="dashboard__header--container-context">
              <h4 className="dashboard__heading">Account</h4>
              <span className="dashboard__span">View</span>
              <p className="dashboard__text">Text here</p>
              <BsFillGearFill className="dashboard__header--icon"></BsFillGearFill>
            </div>
            <img
              src="https://technext.github.io/purple-react/static/media/circle.953c9ca0.svg"
              alt="svg"
              className="dashboard__header--img-design"
            />
          </div>
        </div>

        <div className="dashboard__something-1">
          <div className="dashboard__something-1--v1"></div>
          <div className="dashboard__something-1--v2"></div>
        </div>

        <div className="dashboard__something-2">
          <div className="dashboard__something-2--v1"></div>
        </div>

        {/* <Toast></Toast> */}
      </section>
    </DashboardStyle>
  );
};

export default Dashboard;
