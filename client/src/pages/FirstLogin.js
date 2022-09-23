import React, { useState } from 'react';
import { Loading, Alert } from '../components';
import { useGlobalContext } from '../context/appContext';
import loginImage from '../assets/images/login_1.svg';
import { Link, useNavigate } from 'react-router-dom';

import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

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
  } = useGlobalContext();

  const [values, setValues] = useState(defaultState);

  const [isFirst, setFirst] = useState(true);
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

  const handleSubmit = (e) => {
    e.preventDefault();

    login({ username: values.username, password: values.password });

    setAlert(!isAlert);

    // if (isLogin) {
    //   // switchPage();
    //   setTimeout(() => {
    //     navigate('/dashboard');
    //   }, 3000);
    // } else {
    // }

    // switchPage();
    setTimeout(() => {
      navigate('/dashboard');
    }, 3000);
  };

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <section className="section-login">
      <div className="login__container-image">
        <img src={loginImage} alt="login image" />
      </div>
      <div className="login__content">
        <h1 className="heading--primary login__heading">
          <span className="heading__highlight">Log</span>in
        </h1>

        <form className="login__form" onSubmit={handleSubmit}>
          {isAlert && (
            <Alert
              isError={isErrorForm}
              typeError={typeErrorForm}
              msgError={messageErrorForm}
            ></Alert>
          )}
          <div className="form-control__2">
            <label htmlFor="name" className="form-label">
              Password
            </label>

            <input
              type="text"
              className="form-input"
              id="pwd"
              name="pwd"
              value={values.pwd}
              onChange={handleChange}
            />
          </div>
          <div className="form-control__2 form-control__pwd">
            <label htmlFor="password" className="form-label form-label__pwd">
              Confirm password
            </label>

            <input
              type={pwdTypeText ? 'text' : 'password'}
              className="form-input form-input__pwd"
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

          <button className="btn">Submit</button>
        </form>
      </div>
    </section>
  );
};

export default FirstLogin;
