import React, { useState, useEffect } from 'react';

import { HiOutlinePlusCircle, HiOutlineMinusCircle } from 'react-icons/hi';

import viettelLogo from '../../assets/images/logos/viettel.svg';
import successSvg from '../../assets/images/design/success.svg';

import { useGlobalContext } from '../../context/appContext';

import { DialogMUIPwd } from '../../components';

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

const initPwd = {
  pwd: '',
  isShow: false,
  isConfirm: false,
};

const BuyCard = () => {
  const [valuesCard, setValuesCard] = useState(initSwitchCard);

  const [valuesItem, setValuesItem] = useState(initItem);

  const [getAmount, setAmount] = useState(1);

  const [getPage, setPage] = useState(1);

  const {
    showToast,
    isConfirmPwdBuy,
    actionBankPage,
    bankPage,
    confirmPwdBuy,
  } = useGlobalContext();

  const [openModalMUI, setOpenModalMUI] = React.useState(false);

  const [pwdInput, setPwdInput] = useState(initPwd);

  const handleClickOpenModalMUI = () => {
    setOpenModalMUI(true);
  };

  const handleCloseModalMUI = () => {
    setOpenModalMUI(false);
  };

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

  const handleClick10 = () => {
    setValuesItem({ ten: true, twenty: false, fifty: false, hundred: false });
  };
  const handleClick20 = () => {
    setValuesItem({ ten: false, twenty: true, fifty: false, hundred: false });
  };
  const handleClick50 = () => {
    setValuesItem({ ten: false, twenty: false, fifty: true, hundred: false });
  };
  const handleClick100 = () => {
    setValuesItem({ ten: false, twenty: false, fifty: false, hundred: true });
  };

  const handleCheckPlus = () => {
    if (getAmount === 5) {
      showToast('💣 Amount must not more than 5', 2000, 'error');
    }
  };
  const handleCheckMinus = () => {
    if (getAmount === 1) {
      showToast('💣 Amount must not less than 1', 2000, 'error');
    }
  };

  const handleClickMinus = (e) => {
    handleCheckMinus();
    if (getAmount === 1) {
      setAmount(1);
    } else {
      setAmount(getAmount - 1);
    }
  };

  const handleClickPlus = (e) => {
    handleCheckPlus();
    if (getAmount === 5) {
      setAmount(5);
    } else {
      setAmount(getAmount + 1);
    }
  };

  const handleClickNextPage = (e) => {
    if (bankPage.numPage === 1) {
      confirmPwdBuy(false);
    }
    actionBankPage({
      numPage: bankPage.numPage,
      name: 'buy-card',
      length: 3,
      actionType: 'plus',
      isOK: true,
    });
  };
  const handleClickPrePage = (e) => {
    actionBankPage({
      numPage: bankPage.numPage,
      name: 'buy-card',
      length: 3,
      actionType: 'minus',
      isOK: true,
    });
  };

  return (
    <div className="bank-body__buy-card">
      <div className="buy-card__header">
        <h2 className="buy-card__header--heading">Buy card</h2>
      </div>
      <div className="buy-card__body">
        {bankPage.numPage === 1 && (
          <>
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
                      ? `buy-card__item-value buy-card__item--mobile buy-card__item--mobile--active ${
                          valuesItem.ten && 'buy-card__item--mobile-active'
                        }`
                      : valuesCard.vina
                      ? `buy-card__item-value buy-card__item--vinaphone buy-card__item--vinaphone--active ${
                          valuesItem.ten && 'buy-card__item--vinaphone-active'
                        }`
                      : `buy-card__item-value buy-card__item--viettel buy-card__item--viettel--active ${
                          valuesItem.ten && 'buy-card__item--viettel-active'
                        }`
                  }
                  onClick={handleClick10}
                >
                  10000vnd
                </button>
                <button
                  className={
                    valuesCard.mobile
                      ? `buy-card__item-value buy-card__item--mobile buy-card__item--mobile--active ${
                          valuesItem.twenty && 'buy-card__item--mobile-active'
                        }`
                      : valuesCard.vina
                      ? `buy-card__item-value buy-card__item--vinaphone buy-card__item--vinaphone--active ${
                          valuesItem.twenty &&
                          'buy-card__item--vinaphone-active'
                        }`
                      : `buy-card__item-value buy-card__item--viettel buy-card__item--viettel--active ${
                          valuesItem.twenty && 'buy-card__item--viettel-active'
                        }`
                  }
                  onClick={handleClick20}
                >
                  20000vnd
                </button>
                <button
                  className={
                    valuesCard.mobile
                      ? `buy-card__item-value buy-card__item--mobile buy-card__item--mobile--active ${
                          valuesItem.fifty && 'buy-card__item--mobile-active'
                        }`
                      : valuesCard.vina
                      ? `buy-card__item-value buy-card__item--vinaphone buy-card__item--vinaphone--active ${
                          valuesItem.fifty && 'buy-card__item--vinaphone-active'
                        }`
                      : `buy-card__item-value buy-card__item--viettel buy-card__item--viettel--active ${
                          valuesItem.fifty && 'buy-card__item--viettel-active'
                        }`
                  }
                  onClick={handleClick50}
                >
                  50000vnd
                </button>
                <button
                  className={
                    valuesCard.mobile
                      ? `buy-card__item-value buy-card__item--mobile buy-card__item--mobile--active ${
                          valuesItem.hundred && 'buy-card__item--mobile-active'
                        }`
                      : valuesCard.vina
                      ? `buy-card__item-value buy-card__item--vinaphone buy-card__item--vinaphone--active ${
                          valuesItem.hundred &&
                          'buy-card__item--vinaphone-active'
                        }`
                      : `buy-card__item-value buy-card__item--viettel buy-card__item--viettel--active ${
                          valuesItem.hundred && 'buy-card__item--viettel-active'
                        }`
                  }
                  onClick={handleClick100}
                >
                  100000vnd
                </button>
              </div>

              <div className="buy-card__item-number">
                <div className="buy-card__item-number--left">
                  <span className="buy-card__item--text">Number</span>
                  <button
                    className="btn__buy-card--action"
                    type="button"
                    onClick={handleClickMinus}
                  >
                    <HiOutlineMinusCircle className="buy-card__icon"></HiOutlineMinusCircle>
                  </button>
                  <span className="buy-card__item--span">{getAmount}</span>
                  <button
                    className="btn__buy-card--action"
                    type="button"
                    onClick={handleClickPlus}
                  >
                    <HiOutlinePlusCircle className="buy-card__icon"></HiOutlinePlusCircle>
                  </button>
                </div>
                <div className="buy-card__item-number--right">
                  <div className="buy-card__group-btns">
                    <button
                      className="buy-card__btn"
                      type="button"
                      onClick={handleClickPrePage}
                    >
                      Back
                    </button>
                    <button
                      className="buy-card__btn"
                      type="button"
                      onClick={handleClickNextPage}
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {bankPage.numPage === 2 && (
          <>
            <div className="buy-card__shop--body-infor">
              <div className="buy-card__shop--header">
                <h2 className="buy-card__shop--heading">Infomation</h2>
              </div>
              <div className="buy-card__shop--body">
                <div className="buy-card__shop--body__content">
                  <div className="buy-card__shop--body__content--left">
                    <img
                      src={viettelLogo}
                      alt="logo"
                      className="buy-card__shop--body__content--img"
                    />
                  </div>
                  <div className="buy-card__shop--body__content--right">
                    <div className="buy-card__shop--body__content-control">
                      <h2 className="buy-card__shop--body__content-heading">
                        Type
                      </h2>
                      <span className="buy-card__shop--body__content-span">
                        Viettel
                      </span>
                    </div>
                    <div className="buy-card__shop--body__content-control">
                      <h2 className="buy-card__shop--body__content-heading">
                        Value
                      </h2>
                      <span className="buy-card__shop--body__content-span">
                        100000vnd
                      </span>
                    </div>
                    <div className="buy-card__shop--body__content-control">
                      <h2 className="buy-card__shop--body__content-heading">
                        Amount
                      </h2>
                      <span className="buy-card__shop--body__content-span">
                        4
                      </span>
                    </div>
                    <div className="buy-card__shop--body__content-control">
                      <h2 className="buy-card__shop--body__content-heading">
                        Total
                      </h2>
                      <span className="buy-card__shop--body__content-span">
                        400000vnd
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="buy-card__shop--footer">
              <div className="buy-card__shop--footer-btns">
                <button
                  className="buy-card__shop--footer-btn"
                  type="button"
                  onClick={handleClickPrePage}
                >
                  Back
                </button>
                <button
                  className="buy-card__shop--footer-btn"
                  type="button"
                  onClick={handleClickOpenModalMUI}
                >
                  Next
                </button>
              </div>
            </div>
          </>
        )}

        {bankPage.numPage === 3 && (
          <>
            <div className="buy-card__result">
              <div className="buy-card__result--header">
                <h2 className="buy-card__result--header__heading">Info</h2>
              </div>

              <div className="buy-card__result--body">
                <div className="buy-card__result--body-left">
                  <img
                    className="buy-card__result--body-left__img"
                    src={successSvg}
                    alt="success"
                  ></img>
                </div>
                <div className="buy-card__result--body-right">
                  <div className="buy-card__result--body-right__control">
                    <h2 className="buy-card__result--body-right__heading">
                      Seri
                    </h2>
                    <span className="buy-card__result--body-right__span">
                      123456789
                    </span>
                  </div>
                </div>
                <div className="buy-card__result--body-right"></div>
              </div>
            </div>

            <div className="buy-card__result--footer">
              <div className="buy-card__result--footer-btns">
                <button
                  className="buy-card__result--footer-btn"
                  type="button"
                  onClick={handleClickPrePage}
                >
                  Back
                </button>
                <button
                  className="buy-card__result--footer-btn"
                  type="button"
                  onClick={handleClickNextPage}
                >
                  Next
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      <DialogMUIPwd
        open={openModalMUI}
        handleClose={handleCloseModalMUI}
        namePage={'buy-card'}
        lengthPage={3}
        // values={pwdInput}
        // handleChangePwd={handleChangePwd}
        // handleClickShowPassword={handleClickShowPassword}
        // handleMouseDownPassword={handleMouseDownPassword}
      ></DialogMUIPwd>
    </div>
  );
};

export default BuyCard;
