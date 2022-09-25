import React, { useContext, useState, useReducer } from 'react';
import { Navigate } from 'react-router-dom';

import reducer from './reducer';

import axios from 'axios';

import {
  SHOW_HIDE_LOADING,
  SWITCH_PAGE,
  REGISTER_SUCCESS,
  REGISTER_ERROR,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGIN_BEGIN,
  REGISTER_BEGIN,
  OPEN_MODAL,
  OPEN_SIDE_BAR,
  CLOSE_MODAL,
  CLOSE_SIDE_BAR,
  LOGOUT,
  FIRST_LOGIN_BEGIN,
  FIRST_LOGIN_SUCCESS,
  FIRST_LOGIN_ERROR,
  CLOSE_COUNTDOWN,
  OPEN_COUNTDONW,
  HIDE_LOADING,
  IS_LOGIN,
  IS_ALERT,
  RESET_LOGIN_FORM,
  RESET_ALERT,
} from './action';

const token = localStorage.getItem('token');
const user = localStorage.getItem('user');
const isFirstLogin = localStorage.getItem('isFirstLogin');

const defaultState = {
  isLoading: false,
  showAlert: false,
  isErrorForm: false,
  messageErrorForm: '',
  typeErrorForm: '',
  user: user ? JSON.parse(user) : null,
  isError: false,
  isLogin: false,
  isSidebarOpen: false,
  isModalOpen: false,
  token: token,
  isFirstLogin: isFirstLogin,
  isLoadingForm: false,
  isLockForm: false,
  numberOfLoginFail: 0,
  isCountDown: false,
  styleAlert: '',
  styleInputLogin: {
    isUserErr: 'default',
    isPwdErr: 'default',
    isFirstPwd: 'default',
    isFirstPwdConfirm: 'default',
    style: 'form-input',
  },
  isAlert: true,
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, defaultState);

  const showLoading = () => {
    dispatch({ type: SHOW_HIDE_LOADING });
  };
  const hideLoading = () => {
    dispatch({ type: HIDE_LOADING });
  };

  const switchPage = () => {
    showLoading();

    setTimeout(() => {
      dispatch({ type: SWITCH_PAGE });
    }, 1000);
  };

  const addUserToLocalStorage = ({ user, token, isFirstLogin }) => {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
    localStorage.setItem('isFirstLogin', isFirstLogin);
  };

  const removeUserFromLocalStorage = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('isFirstLogin', isFirstLogin);
  };

  const resetLoginForm = () => {
    dispatch({ type: RESET_LOGIN_FORM });
  };

  const resetAlert = () => {
    dispatch({ type: RESET_ALERT });
  };

  const login = async (userInput) => {
    dispatch({ type: LOGIN_BEGIN });
    resetLoginForm();

    setTimeout(async () => {
      try {
        const postUser = await axios.post('/api/v1/auth/login', userInput);

        const { data } = postUser;

        const { msg, user, token, isFirstLogin } = data;
        const { loginFail, identify } = user;

        addUserToLocalStorage({ user, token, isFirstLogin });

        if (loginFail === 6) {
          dispatch({
            type: LOGIN_ERROR,
            payloadMsg:
              '6 fails, your account is blocked forever, please contact with admin',
            payloadFail: loginFail,
            payloadStyle: {
              ...defaultState.styleInputLogin,
              isUserErr: 'false',
              isPwdErr: 'false',
              style: 'form-input',
            },
          });
        } else if (identify === 'fail') {
          dispatch({
            type: LOGIN_ERROR,
            payloadMsg:
              'Your account is blocked forever, contact with 18001008 to solve this problem!',
            payloadFail: loginFail,
            payloadStyle: {
              ...defaultState.styleInputLogin,
              isUserErr: 'false',
              isPwdErr: 'false',
              style: 'form-input',
            },
          });
        } else {
          dispatch({
            type: LOGIN_SUCCESS,
            payloadMsg: msg,
            payloadUser: user,
            payloadToken: token,
            payloadIsFirst: isFirstLogin,
            payloadFail: loginFail,
            payloadStyle: {
              ...defaultState.styleInputLogin,
              isUserErr: 'false',
              isPwdErr: 'false',
              style: 'form-input',
            },
          });
        }

        // return <Navigate to={'/dashboard'}></Navigate>;
      } catch (error) {
        const { response } = error;
        const { data } = response;
        const { msg, user } = data;

        let message = msg;
        let styleInput = 'form-input';
        let isUserErr = 'false';
        let isPwdErr = 'false';

        // catch msg err
        // resetLoginForm();

        if (user) {
          if (message === 'Please provide password') {
            styleInput = 'form-input form-input__error';
            isPwdErr = 'true';
          }

          if (message === 'Invalid password') {
            styleInput = 'form-input form-input__error';
            isPwdErr = 'true';
          }

          const { loginFail } = user;

          if (loginFail === 3) {
            message = '3 fails, your account is lock in 1 minute';
            dispatch({ type: OPEN_COUNTDONW });
          } else {
            dispatch({ type: CLOSE_COUNTDOWN });
          }

          if (loginFail === 6) {
            message =
              '6 fails, your account is blocked forever, please contact with admin';
          }

          dispatch({
            type: LOGIN_ERROR,
            payloadMsg: message,
            payloadFail: loginFail,
            payloadStyle: {
              isUserErr: isUserErr,
              isPwdErr: isPwdErr,
              style: styleInput,
            },
          });
        } else {
          if (message === 'Please provide username') {
            styleInput = 'form-input form-input__error';
            isUserErr = 'true';
          }
          if (message === 'Please provide username and password') {
            styleInput = 'form-input form-input__error';
            isUserErr = 'true';
            isPwdErr = 'true';
          }
          if (message === 'Can not find user, please provide true username') {
            styleInput = 'form-input form-input__error';
            isUserErr = 'true';
          }

          dispatch({
            type: LOGIN_ERROR,
            payloadMsg: message,
            payloadFail: 0,
            payloadStyle: {
              ...defaultState.styleInputLogin,
              isUserErr: isUserErr,
              isPwdErr: isPwdErr,
              style: styleInput,
            },
          });
        }
      }
    }, 1500);
  };

  const register = async (user) => {
    dispatch({ type: REGISTER_BEGIN });

    console.log('register begin');

    setTimeout(async () => {
      try {
        const postUser = await axios.post('/api/v1/auth/register', user);
        console.log(postUser);
        dispatch({ type: REGISTER_SUCCESS, payload: postUser });
      } catch (error) {
        dispatch({ type: REGISTER_ERROR });
        console.log(`Cannot register ${error}`);

        const { response } = error;
        const { data } = response;
        const { msg } = data;

        dispatch({ type: REGISTER_ERROR, payload: msg });
      }
    }, 2000);
  };

  const logout = async () => {
    resetLoginForm();
    resetAlert();
    try {
      const log = await axios.post('/api/v1/auth/logout');

      removeUserFromLocalStorage();

      // console.log(log);
      dispatch({ type: LOGOUT });
    } catch (error) {
      console.log(error);
    }
  };

  const firstLogin = async ({ pwd, pwdConfirm }) => {
    resetLoginForm();
    dispatch({ type: FIRST_LOGIN_BEGIN });

    setTimeout(async () => {
      try {
        const changePwd = await axios.post('/api/v1/auth/first-login', {
          pwd,
          pwdConfirm,
        });

        const { data } = changePwd;

        const { msg, token, user, isFirstLogin } = data;

        addUserToLocalStorage({ user, token, isFirstLogin });

        console.log('First login success');
        console.log(data);

        dispatch({
          type: FIRST_LOGIN_SUCCESS,
          payloadMsg: msg,
          payloadUser: user,
          payloadToken: token,
          payloadIsFirst: isFirstLogin,
          payloadStyle: {
            ...defaultState.styleInputLogin,
            isFirstPwd: 'false',
            isFirstPwdConfirm: 'false',
          },
        });
      } catch (error) {
        const { response } = error;
        const { data } = response;
        const { msg } = data;

        let isFirstPwd = 'default';
        let isFirstPwdConfirm = 'default';

        if (
          msg === 'Password must not empty' ||
          msg === 'Password must at at least 6 characters'
        ) {
          isFirstPwd = 'true';
        }
        if (
          msg === 'Password confirm must not empty' ||
          msg === 'Confirm password is not correct!'
        ) {
          isFirstPwdConfirm = 'true';
        }

        console.log(response);
        dispatch({
          type: FIRST_LOGIN_ERROR,
          payloadStyle: {
            ...defaultState.styleInputLogin,
            isFirstPwd: isFirstPwd,
            isFirstPwdConfirm: isFirstPwdConfirm,
          },
          payloadMsg: msg,
        });
      }
    }, 1500);
  };

  const openSidebar = () => {
    // setIsSidebarOpen(true);

    dispatch({ type: OPEN_SIDE_BAR });
  };
  const closeSidebar = () => {
    // setIsSidebarOpen(false);
    dispatch({ type: CLOSE_SIDE_BAR });
  };

  const openModal = () => {
    // setIsModalOpen(true);
  };
  const closeModal = () => {
    // setIsModalOpen(false);
  };

  const closeCountDown = () => {
    dispatch({ type: CLOSE_COUNTDOWN });
  };

  const openCountDown = () => {
    dispatch({ type: OPEN_COUNTDONW });
  };

  const logginSuccess = () => {
    dispatch({ type: IS_LOGIN });
  };

  const closeAlert = () => {
    dispatch({ type: IS_ALERT });
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        showLoading,
        switchPage,
        login,
        register,
        closeSidebar,
        openModal,
        openSidebar,
        logout,
        firstLogin,
        closeCountDown,
        openCountDown,
        showLoading,
        hideLoading,
        logginSuccess,
        closeAlert,
        resetLoginForm,
        resetAlert,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider, useGlobalContext };
