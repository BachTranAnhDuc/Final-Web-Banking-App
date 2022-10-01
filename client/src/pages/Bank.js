import React from 'react';

import { BsFillCreditCard2FrontFill } from 'react-icons/bs';

const Bank = () => {
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
                <h2 className="bank-body__nav--heading">You balance</h2>
                <span className="bank-body__nav--span">$ 100000000</span>
              </div>
            </div>
            <div className="bank-body__nav-bottom"></div>
          </div>
        </div>
        <div className="bank-body__content"></div>
      </div>
    </section>
  );
};

export default Bank;
