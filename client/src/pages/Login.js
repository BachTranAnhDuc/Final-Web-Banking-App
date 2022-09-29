import React, { useState, useEffect } from 'react';
import { Loading, Alert, CountDown, Toast } from '../components';
import { useGlobalContext } from '../context/appContext';
import loginImage from '../assets/images/login_1.svg';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

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
    styleInputLogin,
    resetLoginForm,
  } = useGlobalContext();

  const [values, setValues] = useState(defaultState);

  const [getErrValue, setErrValue] = useState({});
  const [isShowPwd, setShowPwd] = useState(false);
  const [pwdTypeText, setPwdType] = useState(false);
  const [btnText, setBtnText] = useState('Login');
  const [getClassInput, setClassInput] = useState('form-input');

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

  const checkEmptyValue = (inputValue) => {
    if (!inputValue) {
      setErrValue({ isErrValue: true, msg: 'Please provide value' });
      setClassInput('form-input form-input__error');

      return;
    }
  };

  const checkEmptyValues = (inputValues) => {
    inputValues.forEach((el) => {
      checkEmptyValue(el);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // setBtnText('Login is processing...');

    // if (!values.username || !values.password) {
    //   setErrValue({ isErrValue: true, msg: 'Please provide all values' });

    //   return;
    // }

    checkEmptyValues([values.username, values.password]);

    setErrValue({ isErrValue: false, msg: '' });

    login({ username: values.username, password: values.password });

    // toast.promise(
    //   login({ username: values.username, password: values.password }),
    //   {
    //     loading: 'Loading',
    //     success: 'Got the data',
    //     error: 'Error when fetching',
    //   }
    // );

    // resetLoginForm();
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
              //   styleInputLogin.isUserErr ? styleInputLogin.style : 'form-input'
              // }
              className={
                styleInputLogin.isUserErr === 'true'
                  ? 'form-input form-input__error'
                  : styleInputLogin.isUserErr === 'false'
                  ? 'form-input form-input__success'
                  : 'form-input'
              }
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
              className={
                styleInputLogin.isPwdErr === 'true'
                  ? 'form-input form-input__error'
                  : styleInputLogin.isPwdErr === 'false'
                  ? 'form-input form-input__success'
                  : 'form-input'
              }
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

      <Toast></Toast>
    </section>
  );
};

export default Login;
