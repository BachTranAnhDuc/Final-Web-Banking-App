import React from 'react';

import { Outlet, NavLink } from 'react-router-dom';

import { useGlobalContext } from '../context/appContext';

import { Loader2 } from '../components';

import { BsFillCreditCard2FrontFill } from 'react-icons/bs';
import { FaCentos } from 'react-icons/fa';

const Bank = () => {
  const { switchSetting, isLoader } = useGlobalContext();

  return (
    <section className="section-bank">
      <div className="dashboard__content-text ">
        <div className="dashboard__content-text--containericon">
          <BsFillCreditCard2FrontFill className="dashboard__content-text--icon"></BsFillCreditCard2FrontFill>
        </div>
        <h2 className="dashboard__content-text--heading">Digital</h2>
      </div>

      <div className="bank-body">
        <div className="bank-body__nav-container">
          <div className="bank-body__nav">
            <div className="bank-body__nav-top bg-background__bank-nav">
              <div className="bank-body__nav--context">
                <h2 className="bank-body__nav--heading">Your balance</h2>
                <span className="bank-body__nav--span">$ 100000000</span>
              </div>
            </div>
            <div className="bank-body__nav-center">
              <div className="bank-body__nav-center--container">
                <div className="bank-body__nav-center--container-item bank-body__nav-center--container-1">
                  <div className="bank-body__nav-center--icons-container">
                    <FaCentos className="bank-body__nav-center--icon"></FaCentos>
                  </div>
                  <h2 className="bankbody__nav-center--heading">
                    <NavLink
                      to={'/dashboard/deposit/transfer'}
                      className={(navData) =>
                        navData.isActive
                          ? 'bankbody__link bankbody__link--active'
                          : 'bankbody__link'
                      }
                      onClick={() => switchSetting(1000)}
                    >
                      Transfer
                    </NavLink>
                  </h2>
                </div>
                <div className="bank-body__nav-center--container-item bank-body__nav-center--container-2">
                  <div className="bank-body__nav-center--icons-container">
                    <FaCentos className="bank-body__nav-center--icon"></FaCentos>
                  </div>
                  <h2 className="bankbody__nav-center--heading">
                    <NavLink
                      to={'/dashboard/deposit/recharge'}
                      className={({ isActive }) =>
                        isActive
                          ? 'bankbody__link bankbody__link--active'
                          : 'bankbody__link'
                      }
                      onClick={() => switchSetting(1000)}
                    >
                      Recharge
                    </NavLink>
                  </h2>
                </div>
                <div className="bank-body__nav-center--container-item bank-body__nav-center--container-3">
                  <div className="bank-body__nav-center--icons-container">
                    <FaCentos className="bank-body__nav-center--icon"></FaCentos>
                  </div>
                  <h2 className="bankbody__nav-center--heading">
                    <NavLink
                      to={'/dashboard/deposit/withdraw'}
                      className={({ isActive }) =>
                        isActive
                          ? 'bankbody__link bankbody__link--active'
                          : 'bankbody__link'
                      }
                      onClick={() => switchSetting(1000)}
                    >
                      Withdraw
                    </NavLink>
                  </h2>
                </div>
                <div className="bank-body__nav-center--container-item bank-body__nav-center--container-4">
                  <div className="bank-body__nav-center--icons-container">
                    <FaCentos className="bank-body__nav-center--icon"></FaCentos>
                  </div>
                  <h2 className="bankbody__nav-center--heading">
                    <NavLink
                      to={'/dashboard/deposit/buy'}
                      className={({ isActive }) =>
                        isActive
                          ? 'bankbody__link bankbody__link--active'
                          : 'bankbody__link'
                      }
                      onClick={() => switchSetting(1000)}
                    >
                      Buy card
                    </NavLink>
                  </h2>
                </div>
              </div>
            </div>
            <div className="bank-body__nav-bottom"></div>
          </div>
        </div>
        <div className="bank-body__content">
          {isLoader ? <Loader2></Loader2> : <Outlet></Outlet>}
        </div>
      </div>
    </section>
  );
};

export default Bank;
