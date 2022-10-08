import React, { useState, useEffect } from 'react';
import { Loading, Alert } from '../components';
import { useGlobalContext } from '../context/appContext';
import loginImage from '../assets/images/login_1.svg';
import { Link, useNavigate } from 'react-router-dom';

import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

import logoBank from '../assets/images/logo.svg';

import FirstLoginStyled from '../theme/pages/FirstLogin';

const defaultState = {
  pwd: '',
  pwdConfirm: '',
};

const FirstLogin = () => {
  const {
    isLoading,
    switchPage,
    isErrorForm,
    messageErrorForm,
    typeErrorForm,
    login,
    isLogin,
    firstLogin,
    logout,
    resetAlert,
    styleInputLogin,
    isFirstLogin,
  } = useGlobalContext();

  const [values, setValues] = useState(defaultState);

  const [getErrValue, setErrValue] = useState({});
  const [isAlert, setAlert] = useState(false);
  const [isShowPwd, setShowPwd] = useState(false);
  const [pwdTypeText, setPwdType] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    e.preventDefault();
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleClickShowHide = (e) => {
    e.preventDefault();
    setShowPwd(!isShowPwd);
    setPwdType(!pwdTypeText);
  };

  const handleClick = (e) => {
    logout();

    setTimeout(() => {
      navigate('/login');
    }, 1000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setAlert(!isAlert);

    firstLogin({ pwd: values.pwd, pwdConfirm: values.pwdConfirm });
  };

  useEffect(() => {
    switchPage();
    resetAlert();
    if (!isFirstLogin) {
      console.log('-----------navigate success here--------------');
      navigate('/dashboard');
      // setTimeout(() => {
      // }, 3000);
    } else {
      console.log('navigate error here');
    }
  }, [isFirstLogin]);

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <FirstLoginStyled>
      <section className="section-firstlogin">
        <form className="form__first-login" onSubmit={handleSubmit}>
          <div className="form__first-login--logo">
            <img src={logoBank} alt="logo" />

            <h3 className="heading--tertiary form__first-login--headtertiary">
              ankist
            </h3>
          </div>
          <span className=" first-login__span">
            Your first login you need to change password
          </span>

          {isErrorForm && (
            <Alert
              isError={isErrorForm}
              typeError={typeErrorForm}
              msgError={messageErrorForm}
            ></Alert>
          )}

          <div className="form-control__first-login form-control__pwd mb-16">
            <label htmlFor="pwd" className="form-label form-label__first-login">
              New Password
            </label>
            {/* <span
            className={getErrValue.isErrValue ? 'form__error' : 'form__success'}
          >
            {getErrValue.msg}
          </span> */}
            <input
              type={pwdTypeText ? 'text' : 'password'}
              className={
                styleInputLogin.isFirstPwd === 'true'
                  ? 'form-input form-input__error'
                  : styleInputLogin.isFirstPwd === 'false'
                  ? 'form-input form-input__success'
                  : 'form-input'
              }
              id="pwd"
              name="pwd"
              value={values.pwd}
              onChange={handleChange}
            />
            <button
              className="btn__pwd"
              type="button"
              onClick={handleClickShowHide}
            >
              {isShowPwd ? (
                <AiFillEye className="icon__pwd"></AiFillEye>
              ) : (
                <AiFillEyeInvisible className="icon__pwd"></AiFillEyeInvisible>
              )}
            </button>
          </div>
          <div className="form-control__first-login form-control__pwd mb-16">
            <label
              htmlFor="pwdConfirm"
              className="form-label form-label__first-login"
            >
              Confirm Password
            </label>
            {/* <span
            className={getErrValue.isErrValue ? 'form__error' : 'form__success'}
          >
            {getErrValue.msg}
          </span> */}
            <input
              type={pwdTypeText ? 'text' : 'password'}
              className={
                styleInputLogin.isFirstPwdConfirm === 'true'
                  ? 'form-input form-input__error'
                  : styleInputLogin.isFirstPwdConfirm === 'false'
                  ? 'form-input form-input__success'
                  : 'form-input'
              }
              id="pwdConfirm"
              name="pwdConfirm"
              value={values.pwdConfirm}
              onChange={handleChange}
            />
            <button
              className="btn__pwd"
              type="button"
              onClick={handleClickShowHide}
            >
              {isShowPwd ? (
                <AiFillEye className="icon__pwd"></AiFillEye>
              ) : (
                <AiFillEyeInvisible className="icon__pwd"></AiFillEyeInvisible>
              )}
            </button>
          </div>

          <button
            className="btn-link__first-login"
            type="button"
            onClick={handleClick}
          >
            Logout
          </button>

          <button className="btn" type="submit">
            Submit
          </button>
        </form>
      </section>
    </FirstLoginStyled>
  );
};

export default FirstLogin;
