import React, { useState } from 'react';

import { HiOutlinePlusCircle, HiOutlineMinusCircle } from 'react-icons/hi';

const initSwitchCard = {
  viettel: true,
  mobile: false,
  vina: false,
};

const initItem = {
  ten: true,
  twenty: false,
  fifty: false,
  hundred: false,
};

const BuyCard = () => {
  const [valuesCard, setValuesCard] = useState(initSwitchCard);

  const [valuesItem, setValuesItem] = useState(initItem);

  const [styleItem, setStyleItem] = useState(
    'buy-card__item-card buy-card__item-card--viettel buy-card__item-card--viettel-active'
  );

  const resetSwitchCard = () => {
    setValuesCard({ viettel: false, mobile: false, vina: false });
  };

  const handleSwitchViettel = (e) => {
    console.log(e.target.name);

    setValuesCard({ mobile: false, vina: false, [e.target.name]: true });
  };
  const handleSwitchMobile = (e) => {
    console.log(e.target.name);

    setValuesCard({ viettel: false, vina: false, [e.target.name]: true });
  };
  const handleSwitchVina = (e) => {
    console.log(e.target.name);

    setValuesCard({ viettel: false, mobile: false, [e.target.name]: true });
  };

  return (
    <div className="bank-body__buy-card">
      <div className="buy-card__header">
        <h2 className="buy-card__header--heading">Buy card</h2>
      </div>
      <div className="buy-card__body">
        <div className="buy-card__body--top">
          <div className="buy-card__list">
            <button
              // className="buy-card__item-card buy-card__item-card--viettel"
              className={
                valuesCard.viettel
                  ? 'buy-card__item-card buy-card__item-card--viettel buy-card__item-card--viettel-active'
                  : 'buy-card__item-card buy-card__item-card--viettel'
              }
              onClick={handleSwitchViettel}
              name="viettel"
            >
              Viettel
            </button>
            <button
              className={
                valuesCard.mobile
                  ? 'buy-card__item-card buy-card__item-card--mobile buy-card__item-card--mobile-active'
                  : 'buy-card__item-card buy-card__item-card--mobile'
              }
              onClick={handleSwitchMobile}
              name="mobile"
            >
              Mobilephone
            </button>
            <button
              className={
                valuesCard.vina
                  ? 'buy-card__item-card buy-card__item-card--vinaphone buy-card__item-card--vinaphone-active'
                  : 'buy-card__item-card buy-card__item-card--vinaphone'
              }
              onClick={handleSwitchVina}
              name="vina"
            >
              Vinaphone
            </button>
          </div>
        </div>
        <div className="buy-card__body--bottom">
          <div className="buy-card__list--items">
            <button
              className={
                valuesCard.mobile
                  ? 'buy-card__item-value buy-card__item--mobile buy-card__item--mobile--active'
                  : valuesCard.vina
                  ? 'buy-card__item-value buy-card__item--vinaphone buy-card__item--vinaphone--active'
                  : 'buy-card__item-value buy-card__item--viettel buy-card__item--viettel--active'
              }
            >
              10000vnd
            </button>
            <button
              className={
                valuesCard.mobile
                  ? 'buy-card__item-value buy-card__item--mobile buy-card__item--mobile--active'
                  : valuesCard.vina
                  ? 'buy-card__item-value buy-card__item--vinaphone buy-card__item--vinaphone--active'
                  : 'buy-card__item-value buy-card__item--viettel buy-card__item--viettel--active'
              }
            >
              20000vnd
            </button>
            <button
              className={
                valuesCard.mobile
                  ? 'buy-card__item-value buy-card__item--mobile buy-card__item--mobile--active'
                  : valuesCard.vina
                  ? 'buy-card__item-value buy-card__item--vinaphone buy-card__item--vinaphone--active'
                  : 'buy-card__item-value buy-card__item--viettel buy-card__item--viettel--active'
              }
            >
              50000vnd
            </button>
            <button
              className={
                valuesCard.mobile
                  ? 'buy-card__item-value buy-card__item--mobile buy-card__item--mobile--active'
                  : valuesCard.vina
                  ? 'buy-card__item-value buy-card__item--vinaphone buy-card__item--vinaphone--active'
                  : 'buy-card__item-value buy-card__item--viettel buy-card__item--viettel--active'
              }
            >
              100000vnd
            </button>
          </div>

          <div className="buy-card__item-number">
            <div className="buy-card__item-number--left">
              <span className="buy-card__item--text">Number</span>
              <button className="btn__buy-card--action">
                <HiOutlineMinusCircle className="buy-card__icon"></HiOutlineMinusCircle>
              </button>
              <span className="buy-card__item--span">1</span>
              <button className="btn__buy-card--action">
                <HiOutlinePlusCircle className="buy-card__icon"></HiOutlinePlusCircle>
              </button>
            </div>
            <div className="buy-card__item-number--right">
              <div className="buy-card__group-btns">
                <button className="buy-card__btn" type="button">
                  Back
                </button>
                <button className="buy-card__btn" type="button">
                  Back
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyCard;
