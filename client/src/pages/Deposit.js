import React from 'react';

import depositImg from '../assets/images/design/bank-card.svg';

import { Loader2 } from '../components';

import { useGlobalContext } from '../context/appContext';

const Deposit = () => {
  const { isLoader, user, userById } = useGlobalContext();

  if (isLoader) {
    return (
      <div className="section-setting">
        <Loader2></Loader2>;
      </div>
    );
  }

  return (
    <div className="section-setting">
      <div className="setting-deposit">
        <div className="deposit__container-img">
          <img src={depositImg} alt="img" className="deposit__img" />
        </div>
        <div className="deposit__context">
          <div className="deposit__context--item">
            <h3 className="deposit__label deposit__label--heading">Balance</h3>
            <p className="deposit__text">{userById?.money}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Deposit;
