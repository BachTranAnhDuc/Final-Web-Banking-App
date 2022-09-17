import React, { useState } from 'react';
import { Loading, Alert } from '../components';
import { useGlobalContext } from '../context/appContext';
import loginImage from '../assets/images/login_1.svg';
import { Link } from 'react-router-dom';

const Login = () => {
  const {
    isLoading,
    switchPage,
    isErrorForm,
    messageErrorForm,
    typeErrorForm,
    login,
  } = useGlobalContext();

  const handleSubmit = (e) => {
    e.preventDefault();

    login();
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
        <h1 className="heading--primary">
          <span className="heading__highlight">Log</span>in
        </h1>

        <form className="login__form" onSubmit={handleSubmit}>
          <div className="form-control__2">
            <label htmlFor="name" className="form-label">
              Username
            </label>

            {isErrorForm === null ? (
              <span></span>
            ) : (
              <span className={isErrorForm ? 'form__error' : 'form__success'}>
                {isErrorForm ? 'Something went wrong!' : 'It OK!'}
              </span>
            )}

            <input type="text" className="form-input" id="name" name="name" />
          </div>
          <div className="form-control__2">
            <label htmlFor="password" className="form-label">
              Password
            </label>

            {isErrorForm === null ? (
              <span></span>
            ) : (
              <span className={isErrorForm ? 'form__error' : 'form__success'}>
                {isErrorForm ? 'Something went wrong!' : 'It OK!'}
              </span>
            )}

            <input
              type="password"
              className="form-input"
              id="password"
              name="password"
            />
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

          <button className="btn">Login</button>
        </form>
      </div>
    </section>
  );
};

export default Login;
