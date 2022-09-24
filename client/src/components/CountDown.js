import React from 'react';
import Countdown from 'react-countdown';
import { useGlobalContext } from '../context/appContext';

const CountDown = ({ textCountdown, timeCountDown }) => {
  const { styleAlert, closeCountDown } = useGlobalContext();

  const Completionist = () => {
    return (
      <div className={'form__alert form__alert--success'}>
        <p>You can login now</p>
      </div>
    );
  };

  const BeforeCompletionist = ({ hours, minutes, seconds }) => {
    return (
      <div className={styleAlert}>
        <p>
          {textCountdown} {hours}:{minutes}:{seconds}
        </p>
      </div>
    );
  };

  // Renderer callback with condition
  const renderer = ({ hours, minutes, seconds, completed }) => {
    // console.log(numberOfLoginFail);
    if (completed) {
      // Render a completed state
      closeCountDown();
      return <Completionist />;
    } else {
      // Render a countdown
      // openCountDown();
      return (
        <BeforeCompletionist
          hours={hours}
          minutes={minutes}
          seconds={seconds}
        ></BeforeCompletionist>
      );
    }
  };

  return <Countdown date={Date.now() + timeCountDown} renderer={renderer} />;
};

export default CountDown;
