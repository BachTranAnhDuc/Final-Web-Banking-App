import React, { useContext, useState, useReducer } from 'react';
import { Navigate } from 'react-router-dom';

import reducer from './reducer';

import axios from 'axios';

import toast, { Toaster } from 'react-hot-toast';

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
  UPLOAD_IMAGE,
  SAVE_IMAGE,
  SAVE_IMAGE_FRONT,
  SAVE_IMAGE_BACK,
  SHOW_LOADER,
  HIDE_LOADER,
  SHOW_STYLE_BODY,
  HIDE_STYLE_BODY,
  CONFIRM_PWD_BUY,
  NUM_PAGE_BANK,
  CONFIRM_DIGITAL_CARD,
  VALID_MONEY_INPUT,
} from './action';

const token = localStorage.getItem('token');
const user = localStorage.getItem('user');
const isFirstLogin = localStorage.getItem('isFirstLogin');

const defaultState = {
  // check loading
  isLoading: false,

  // show login alert
  showAlert: false,
  isErrorForm: false,
  messageErrorForm: '',
  typeErrorForm: '',

  // save user to local store
  user: user ? JSON.parse(user) : null,
  isError: false,

  // check is login
  isLogin: false,

  // sidebar dashboard
  isSidebarOpen: false,

  // modal dialog
  isModalOpen: false,

  // token
  token: token,

  // check is first login
  isFirstLogin: isFirstLogin,

  // onclick form check loading
  isLoadingForm: false,

  // if your account is block
  isLockForm: false,

  // number of login fail
  numberOfLoginFail: 0,

  // time count down
  isCountDown: false,

  // style form when login (success, error, warning)
  styleAlert: '',
  styleInputLogin: {
    isUserErr: 'default',
    isPwdErr: 'default',
    isFirstPwd: 'default',
    isFirstPwdConfirm: 'default',
    style: 'form-input',
  },
  isAlert: true,

  // image identify front and back
  imgFront: '',
  imgBack: '',

  // check loader in dashboard
  isLoader: false,
  styleBody: 'container__dashboard',

  // check confirm password
  isConfirmPwdBuy: false,

  // check comfirm card
  isConfirmDigitalCard: false,

  // check input money is correct
  isCorrectMoney: false,

  // page in bank
  bankPage: {
    numPage: 1,
    name: 'default',
    length: 0,
    actionType: '',
    isOK: false,
  },
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, defaultState);

  // custom toast
  // msg: message, time: time countdown, type: error, success, warming...
  const showToast = (msg, time, type) => {
    // type error
    if (type === 'error') {
      return toast(msg, {
        duration: time,
        style: {
          border: '2px solid #ff6b6b',
          padding: '16px',
          color: '#662b2b',
        },
        iconTheme: {
          primary: '#713200',
          secondary: '#FFFAEE',
        },
      });
    }
    // type warming
    else if (type === 'warming') {
      return toast(msg, {
        duration: time,
        style: {
          border: '2px solid #fcc419',
          padding: '16px',
          color: '#4c3b07',
        },
        iconTheme: {
          primary: '#713200',
          secondary: '#FFFAEE',
        },
      });
    }
    // type success
    else if (type === 'success') {
      return toast(msg, {
        duration: time,
        style: {
          border: '2px solid #36cea1',
          padding: '16px',
          color: '#0a3c2d',
        },
        iconTheme: {
          primary: '#0a3c2d',
          secondary: '#FFFAEE',
        },
      });
    }

    return toast(msg, {
      duration: time,
    });
  };

  const showToastSuccess = (msg) => {
    return toast.success(msg);
  };

  const showToastError = (msg) => {
    return toast.error(msg, {
      style: {
        border: '1px solid #713200',
        padding: '16px',
        color: '#713200',
      },
      iconTheme: {
        primary: '#713200',
        secondary: '#FFFAEE',
      },
    });
  };

  const showToastPromise = (promiseInput, msgSuccess, msgError) => {
    return toast.promise(promiseInput, {
      loading: 'Loading...',
      success: <b>{msgSuccess}</b>,
      error: <b>{msgError}</b>,
    });
  };

  // handle click next page or previous page
  const actionBankPage = ({ numPage, name, length, actionType, isOK }) => {
    // console.log(actionType);

    // if you in page buy card
    if (name === 'buy-card') {
      // if you click next page
      if (actionType === 'plus') {
        // if this is last page then page = length
        if (numPage === length) {
          dispatch({
            type: NUM_PAGE_BANK,
            payload: { numPage, name, length, actionType, isOK },
          });
        }

        // is your are in page 2 then you must enter your password to continue
        else if (numPage === 2) {
          // if you enter correct password
          if (isOK) {
            const page = numPage + 1;
            dispatch({
              type: NUM_PAGE_BANK,
              payload: { numPage: page, name, length, actionType, isOK },
            });
          }
          // if you enter wrong password
          else {
            dispatch({
              type: NUM_PAGE_BANK,
              payload: { numPage, name, length, actionType, isOK },
            });
          }
        }
        // other
        else {
          // console.log('check page here');

          // if this is not last page then page = page + 1
          const page = numPage + 1;

          dispatch({
            type: NUM_PAGE_BANK,
            payload: { numPage: page, name, length, actionType, isOK },
          });
        }
      }
      // if you click previous page
      else if (actionType === 'minus') {
        if (numPage === 1) {
          dispatch({
            type: NUM_PAGE_BANK,
            payload: { numPage: 1, name, length, actionType, isOK },
          });
        } else {
          const page = numPage - 1;

          dispatch({
            type: NUM_PAGE_BANK,
            payload: { numPage: page, name, length, actionType, isOK },
          });
        }
      }
      // others
      else {
      }
    }
    // if you in page transfer
    if (name === 'transfer') {
      // if you click next page
      if (actionType === 'plus') {
        // if this is last page then page = length
        if (numPage === length) {
          dispatch({
            type: NUM_PAGE_BANK,
            payload: { numPage, name, length, actionType, isOK },
          });
        }

        // is your are in page 2 then you must enter your password to continue
        else if (numPage === 1) {
          // if you enter correct password
          if (isOK) {
            const page = numPage + 1;
            dispatch({
              type: NUM_PAGE_BANK,
              payload: { numPage: page, name, length, actionType, isOK },
            });
          }
          // if you enter wrong password
          else {
            dispatch({
              type: NUM_PAGE_BANK,
              payload: { numPage, name, length, actionType, isOK },
            });
          }
        }
        // other
        else {
          // console.log('check page here');

          // if this is not last page then page = page + 1
          const page = numPage + 1;

          dispatch({
            type: NUM_PAGE_BANK,
            payload: { numPage: page, name, length, actionType, isOK },
          });
        }
      }
      // if you click previous page
      else if (actionType === 'minus') {
        if (numPage === 1) {
          dispatch({
            type: NUM_PAGE_BANK,
            payload: { numPage: 1, name, length, actionType, isOK },
          });
        } else {
          const page = numPage - 1;

          dispatch({
            type: NUM_PAGE_BANK,
            payload: { numPage: page, name, length, actionType, isOK },
          });
        }
      }
      // others
      else {
      }
    }
    // if you in page withdraw
    if (name === 'withdraw') {
      // if you click next page
      if (actionType === 'plus') {
        // if this is last page then page = length
        if (numPage === length) {
          dispatch({
            type: NUM_PAGE_BANK,
            payload: { numPage, name, length, actionType, isOK },
          });
        } else if (numPage === 1) {
          // if you enter valid money
          if (isOK) {
            const page = numPage + 1;
            showToast('Valid money', 2000, 'success');
            dispatch({
              type: NUM_PAGE_BANK,
              payload: { numPage: page, name, length, actionType, isOK },
            });
          }
          // if you enter not valid money
          else {
            showToast('💣 Not valid money', 2000, 'error');

            dispatch({
              type: NUM_PAGE_BANK,
              payload: { numPage, name, length, actionType, isOK },
            });
          }
        }

        // is your are in page 2 then you must enter your password to continue
        else if (numPage === 2) {
          // if you enter correct password
          if (isOK) {
            const page = numPage + 1;
            showToast('Valid card', 2000, 'success');
            dispatch({
              type: NUM_PAGE_BANK,
              payload: { numPage: page, name, length, actionType, isOK },
            });
          }
          // if you enter wrong password
          else {
            showToast('💣 Not valid card', 2000, 'error');

            dispatch({
              type: NUM_PAGE_BANK,
              payload: { numPage, name, length, actionType, isOK },
            });
          }
        }
        // other
        else {
          // console.log('check page here');

          // if this is not last page then page = page + 1
          const page = numPage + 1;

          dispatch({
            type: NUM_PAGE_BANK,
            payload: { numPage: page, name, length, actionType, isOK },
          });
        }
      }
      // if you click previous page
      else if (actionType === 'minus') {
        if (numPage === 1) {
          dispatch({
            type: NUM_PAGE_BANK,
            payload: { numPage: 1, name, length, actionType, isOK },
          });
        } else {
          const page = numPage - 1;

          dispatch({
            type: NUM_PAGE_BANK,
            payload: { numPage: page, name, length, actionType, isOK },
          });
        }
      }
      // others
      else {
      }
    }
    // if you in page withdraw
    if (name === 'recharge') {
      // if you click next page
      if (actionType === 'plus') {
        // if this is last page then page = length
        if (numPage === length) {
          dispatch({
            type: NUM_PAGE_BANK,
            payload: { numPage, name, length, actionType, isOK },
          });
        } else if (numPage === 1) {
          // if you enter valid money
          if (isOK) {
            const page = numPage + 1;
            showToast('Valid money', 2000, 'success');
            dispatch({
              type: NUM_PAGE_BANK,
              payload: { numPage: page, name, length, actionType, isOK },
            });
          }
          // if you enter not valid money
          else {
            showToast('💣 Not valid money', 2000, 'error');

            dispatch({
              type: NUM_PAGE_BANK,
              payload: { numPage, name, length, actionType, isOK },
            });
          }
        }

        // check valid card
        else if (numPage === 2) {
          // if you enter correct password
          if (isOK) {
            const page = numPage + 1;
            showToast('Valid card', 2000, 'success');
            dispatch({
              type: NUM_PAGE_BANK,
              payload: { numPage: page, name, length, actionType, isOK },
            });
          }
          // if you enter wrong password
          else {
            showToast('💣 Not valid card', 2000, 'error');

            dispatch({
              type: NUM_PAGE_BANK,
              payload: { numPage, name, length, actionType, isOK },
            });
          }
        }
        // other
        else {
          // console.log('check page here');

          // if this is not last page then page = page + 1
          const page = numPage + 1;

          dispatch({
            type: NUM_PAGE_BANK,
            payload: { numPage: page, name, length, actionType, isOK },
          });
        }
      }
      // if you click previous page
      else if (actionType === 'minus') {
        if (numPage === 1) {
          dispatch({
            type: NUM_PAGE_BANK,
            payload: { numPage: 1, name, length, actionType, isOK },
          });
        } else {
          const page = numPage - 1;

          dispatch({
            type: NUM_PAGE_BANK,
            payload: { numPage: page, name, length, actionType, isOK },
          });
        }
      }
      // others
      else {
      }
    }
  };

  const confirmMoneyInput = (input) => {
    dispatch({ type: VALID_MONEY_INPUT, payload: input });
  };

  const resetPageBank = (name, length) => {
    if (name === 'buy-card') {
      dispatch({
        type: NUM_PAGE_BANK,
        payload: { numPage: 1, name: name, length: length, actionType: '' },
      });
    }
  };

  const confirmPwdBuy = (input) => {
    dispatch({ type: CONFIRM_PWD_BUY, payload: input });
  };

  const confirmDigitalCard = (input) => {
    dispatch({ type: CONFIRM_DIGITAL_CARD, payload: input });
  };

  const showStyleBody = () => {
    dispatch({ type: SHOW_STYLE_BODY });
  };

  const hideStyleBody = () => {
    dispatch({ type: HIDE_STYLE_BODY });
  };

  const showLoading = () => {
    dispatch({ type: SHOW_HIDE_LOADING });
  };
  const hideLoading = () => {
    dispatch({ type: HIDE_LOADING });
  };

  const showLoader = () => {
    dispatch({ type: SHOW_LOADER });
  };

  const hideLoader = () => {
    dispatch({ type: HIDE_LOADER });
  };

  const switchSetting = (time) => {
    showLoader();

    setTimeout(() => {
      hideLoader();
    }, time);
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
  /* const saveImg = (img) => {
    dispatch({ type: SAVE_IMAGE, pageLoadImage: img});  
  } */
  const uploadImage = async (imgFile, imgName) => {
    // dispatch({ type: UPLOAD_IMAGE });

    let imageValue;
    const formData = new FormData();
    formData.append(imgName, imgFile);
    try {
      const response = await axios.post('/api/v1/auth/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const { data } = response;
      const { msg, data: datasrc } = data;
      //const {msg: msgFinal, data: dataFinal} = datasrc;
      console.log(datasrc);
      if (imgName === 'imageFront') {
        dispatch({ type: SAVE_IMAGE_FRONT, pageLoadImage: datasrc });
      } else {
        dispatch({ type: SAVE_IMAGE_BACK, pageLoadImage: datasrc });
      }
    } catch (error) {
      imageValue = null;

      console.log(error);
    }
  };

  const login = async (userInput) => {
    dispatch({ type: LOGIN_BEGIN });
    resetLoginForm();

    showToastPromise(
      axios.post('/api/v1/auth/login', userInput),
      'Login success',
      'Login error'
    );

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
        console.log(data);
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
        const postUser = await axios.post('/api/v1/auth/register', user, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
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
        uploadImage,
        showToast,
        showToastSuccess,
        showToastError,
        showToastPromise,
        switchSetting,
        showStyleBody,
        hideStyleBody,
        confirmPwdBuy,
        actionBankPage,
        resetPageBank,
        confirmDigitalCard,
        confirmMoneyInput,
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
