import React, { useState, useEffect } from 'react';
import { Loading, Alert, CountDown } from '../components';
import { useGlobalContext } from '../context/appContext';
import loginImage from '../assets/images/login_1.svg';
import { Link, useNavigate, Navigate } from 'react-router-dom';

import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

const defaultState = {
  username: '',
  password: '',
};

const Login = () => {
  const {
    isLoading,
    switchPage,
    isErrorForm,
    messageErrorForm,
    typeErrorForm,
    login,
    isLogin,
    isLoadingForm,
    isCountDown,
    isAlert,
    numberOfLoginFail,
  } = useGlobalContext();

  const [values, setValues] = useState(defaultState);

  const [getErrValue, setErrValue] = useState({});
  const [isShowPwd, setShowPwd] = useState(false);
  const [pwdTypeText, setPwdType] = useState(false);
  const [btnText, setBtnText] = useState('Login');

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
    setBtnText('Login is processing...');

    if (!values.username || !values.password) {
      setErrValue({ isErrValue: true, msg: 'Please provide all values' });

      return;
    }

    setErrValue({ isErrValue: false, msg: '' });

    login({ username: values.username, password: values.password });
  };

  useEffect(() => {
    if (isLogin) {
      console.log('-----------navigate success here--------------');
      setTimeout(() => {
        navigate('/dashboard');
      }, 3500);
    } else {
      console.log('navigate error here');
    }
  }, [isLogin]);

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
          {isErrorForm && (
            <Alert
              isError={isErrorForm}
              typeError={typeErrorForm}
              msgError={messageErrorForm}
            ></Alert>
          )}
          <div className="form-control__2">
            <label htmlFor="name" className="form-label">
              Username
            </label>

            <span
              className={
                getErrValue.isErrValue ? 'form__error' : 'form__success'
              }
            >
              {getErrValue.msg}
            </span>

            <input
              type="text"
              // className={
              //   isCountDown ? 'form-input form-input__disabled' : 'form-input'
              // }
              className="form-input"
              id="name"
              name="username"
              value={values.username}
              onChange={handleChange}
            />
          </div>
          <div className="form-control__2 form-control__pwd">
            <label htmlFor="password" className="form-label form-label__pwd">
              Password
            </label>

            <span
              className={
                getErrValue.isErrValue ? 'form__error' : 'form__success'
              }
            >
              {getErrValue.msg}
            </span>

            <input
              type={pwdTypeText ? 'text' : 'password'}
              // className={
              //   isCountDown
              //     ? 'form-input form-input__pwd form-input__disabled'
              //     : 'form-input form-input__pwd'
              // }
              className="form-input form-input__pwd"
              id="password"
              name="password"
              value={values.password}
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

          <p>
            Don't have account?{' '}
            <Link
              to={'/register'}
              className="btn-link"
              onClick={() => switchPage()}
            >
              Register here
            </Link>
          </p>

          <button
            type="submit"
            className="btn"
            disabled={isLoadingForm ? true : isCountDown ? true : false}
          >
            {isLoadingForm
              ? 'Loading is process...'
              : isCountDown
              ? 'Cannot login now...'
              : 'Login'}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Login;
