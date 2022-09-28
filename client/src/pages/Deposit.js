import React from 'react';

import depositImg from '../assets/images/design/bank-card.svg';

const Deposit = () => {
  return (
    <div className="section-setting">
      <div className="setting-deposit">
        <div className="deposit__container-img">
          <img src={depositImg} alt="img" className="deposit__img" />
        </div>
        <div className="deposit__context">
          <div className="deposit__context--item">
            <h3 className="deposit__label deposit__label--heading">Balance</h3>
            <p className="deposit__text">4999 $</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Deposit;