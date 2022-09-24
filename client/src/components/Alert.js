import React, { useState, useEffect } from 'react';

import { useGlobalContext } from '../context/appContext';
import CountDown from './CountDown';

import { AiOutlineClose } from 'react-icons/ai';

const Alert = ({ isError, msgError, typeError }) => {
  const { isCountDown, styleAlert, closeAlert } = useGlobalContext();

  // const handleClick = (e) => {
  //   e.preventDefault();
  // };

  if (isCountDown) {
    console.log('Countdown is here');
    return (
      <CountDown textCountdown={msgError} timeCountDown={5000}></CountDown>
    );
  } else {
    console.log('This is not countdown');
    return (
      <div className={styleAlert}>
        <button type="button" onClick={() => closeAlert()}>
          <AiOutlineClose className="form__alert--close"></AiOutlineClose>
        </button>
        <p>{msgError}</p>
      </div>
    );
  }
};

export default Alert;
