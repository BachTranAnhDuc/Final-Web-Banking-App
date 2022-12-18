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
  NUM_PAGE_FORGOT_PASSWORD,
  NUM_PAGE_REGISTER,
  GET_ALL_USERS,
  GET_SINGLE_USER,
  RECHARGE_BEGIN,
  RECHARGE_ERROR,
  RECHARGE_SUCCESS,
  TRANSFER_BEGIN,
  TRANSFER_SUCCESS,
  TRANSFER_ERROR,
  WITH_DRAW_BEGIN,
  WITH_DRAW_SUCCESS,
  WITH_DRAW_ERROR,
  BUY_CARD_BEGIN,
  BUY_CARD_ERROR,
  BUY_CARD_SUCCESS,
  GET_HISTORY_BY_USER,
  GET_HISTORY_BY_ID,
  SEND_OTP_FORGOT_BEGIN,
  SEND_OTP_FORGOT_ERROR,
  SEND_OTP_FORGOT_SUCCESS,
  CONFIRM_OTP_FORGOT_BEGIN,
  CONFIRM_OTP_FORGOT_SUCCESS,
  CONFIRM_OTP_FORGOT_ERROR,
  CONFIRM_PWD_FORGOT_BEGIN,
  CONFIRM_PWD_FORGOT_SUCCESS,
  GET_ALL_HISTORY_USERS,
  ALLOW_TRANSFER_MONEY_BEGIN,
  ALLOW_TRANSFER_MONEY_SUCCESS,
  ALLOW_TRANSFER_MONEY_ERROR,
  ALLOW_WITHDRAW_MONEY_ERROR,
  ALLOW_WITHDRAW_MONEY_BEGIN,
  ALLOW_WITHDRAW_MONEY_SUCCESS,
  GET_ALL_USER_WITH_CONDITION_ERROR,
  GET_ALL_USER_WITH_CONDITION_SUCCESS,
  GET_ALL_USER_WITH_CONDITION_BEGIN,
  UPDATE_IDENTIFY_USER_BEGIN,
  UPDATE_IDENTIFY_USER_ERROR,
  UPDATE_IDENTIFY_USER_SUCCESS,
  GET_HISTORY_BY_USER_ID,
  CHANGE_PASSWORD_BEGIN,
  CHANGE_PASSWORD_ERROR,
  CHANGE_PASSWORD_SUCCESS,
  TO_USER_TRANSFER,
  UPLOAD_CMND_BEGIN,
  UPLOAD_CMND_SUCCESS,
  UPLOAD_CMND_ERROR,
  CONFIRM_PWD_FORGOT_ERROR,
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

  // forgot pwd page
  forgotPage: {
    numPage: 1,
    isOK: false,
    length: 3,
    actionType: 'default',
  },

  registerPage: {
    numPage: 1,
    isOK: false,
    length: 3,
    actionType: 'default',
  },

  registerTempUser: { email: '' },

  // get all users
  users: [],
  userById: null,

  historyByUser: [],
  dataHistoryByUser: [],

  historyById: null,
  buyCardData: [],
  forgotUserTemp: {},

  historyAllUsers: [],
  historyAllUsersData: [],

  // CHECK ALLOW TRANSFER
  isAllowTransfer: false,
  isAllowWithdraw: false,
  toUserTransfer: {},
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, defaultState);

  // Random component
  const Completionist = () => <span>You are good to go!</span>;

  // Renderer callback with condition
  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a complete state
      return <Completionist />;
    } else {
      // Render a countdown
      return (
        <span>
          {hours}:{minutes}:{seconds}
        </span>
      );
    }
  };

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

        // is your are in page 2 then you must enter your money to continue
        else {
          // if you enter correct money
          if (isOK) {
            const page = numPage + 1;
            dispatch({
              type: NUM_PAGE_BANK,
              payload: { numPage: page, name, length, actionType, isOK },
            });
          }
          // if you enter wrong money
          else {
            dispatch({
              type: NUM_PAGE_BANK,
              payload: { numPage, name, length, actionType, isOK },
            });
          }
        }
        // other
        // else {
        //   // console.log('check page here');

        //   // if this is not last page then page = page + 1
        //   const page = numPage + 1;

        //   dispatch({
        //     type: NUM_PAGE_BANK,
        //     payload: { numPage: page, name, length, actionType, isOK },
        //   });
        // }
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
          // } else if (numPage === 1) {
          //   // if you enter valid money
          //   if (isOK) {
          //     const page = numPage + 1;
          //     showToast('Valid money', 2000, 'success');
          //     dispatch({
          //       type: NUM_PAGE_BANK,
          //       payload: { numPage: page, name, length, actionType, isOK },
          //     });
          //   }
          //   // if you enter not valid money
          //   else {
          //     showToast('💣 Not valid money', 2000, 'error');

          //     dispatch({
          //       type: NUM_PAGE_BANK,
          //       payload: { numPage, name, length, actionType, isOK },
          //     });
          //   }
          // }

          // // is your are in page 2 then you must enter your password to continue
          // else if (numPage === 2) {
          //   // if you enter correct password
          //   if (isOK) {
          //     const page = numPage + 1;
          //     showToast('Valid card', 2000, 'success');
          //     dispatch({
          //       type: NUM_PAGE_BANK,
          //       payload: { numPage: page, name, length, actionType, isOK },
          //     });
          //   }
          //   // if you enter wrong password
          //   else {
          //     showToast('💣 Not valid card', 2000, 'error');

          //     dispatch({
          //       type: NUM_PAGE_BANK,
          //       payload: { numPage, name, length, actionType, isOK },
          //     });
          //   }
        }
        // other
        else {
          // console.log('check page here');

          // if this is not last page then page = page + 1

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
            // showToast('Valid money', 2000, 'success');
            dispatch({
              type: NUM_PAGE_BANK,
              payload: { numPage: page, name, length, actionType, isOK },
            });
          }
          // if you enter not valid money
          else {
            // showToast('💣 Not valid money', 2000, 'error');

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

  const actionForgotPage = ({ numPage, isOK, type, length }) => {
    if (type === 'plus') {
      if (numPage === length) {
        dispatch({
          type: NUM_PAGE_FORGOT_PASSWORD,
          payload: { numPage, isOK, type, length },
        });
      } else {
        if (isOK) {
          const page = numPage + 1;
          // showToast('Valid phone and email', 2000, 'success');

          dispatch({
            type: NUM_PAGE_FORGOT_PASSWORD,
            payload: { numPage: page, isOK, type, length },
          });
        } else {
          // showToast('Not valid phone or email', 2000, 'error');

          dispatch({
            type: NUM_PAGE_FORGOT_PASSWORD,
            payload: { numPage, isOK, type, length },
          });
        }
      }
    }
    if (type === 'minus') {
      if (numPage === 1) {
        dispatch({
          type: NUM_PAGE_FORGOT_PASSWORD,
          payload: { numPage, isOK, type, length },
        });
      } else {
        const page = numPage - 1;
        dispatch({
          type: NUM_PAGE_FORGOT_PASSWORD,
          payload: { numPage: page, isOK, type, length },
        });
      }
    }
  };
  const actionRegisterPage = ({ numPage, isOK, type, length }) => {
    if (type === 'plus') {
      if (numPage === length) {
        dispatch({
          type: NUM_PAGE_REGISTER,
          payload: { numPage, isOK, type, length },
        });
      } else {
        if (isOK) {
          const page = numPage + 1;
          // showToast('Valid phone and email', 2000, 'success');

          dispatch({
            type: NUM_PAGE_REGISTER,
            payload: { numPage: page, isOK, type, length },
          });
        } else {
          // showToast('Not valid phone or email', 2000, 'error');

          dispatch({
            type: NUM_PAGE_REGISTER,
            payload: { numPage, isOK, type, length },
          });
        }
      }
    }
    if (type === 'minus') {
      if (numPage === 1) {
        dispatch({
          type: NUM_PAGE_REGISTER,
          payload: { numPage, isOK, type, length },
        });
      } else {
        const page = numPage - 1;
        dispatch({
          type: NUM_PAGE_REGISTER,
          payload: { numPage: page, isOK, type, length },
        });
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
    if (name === 'withdraw') {
      dispatch({
        type: NUM_PAGE_BANK,
        payload: { numPage: 1, name: name, length: length, actionType: '' },
      });
    }
    if (name === 'transfer') {
      dispatch({
        type: NUM_PAGE_BANK,
        payload: { numPage: 1, name: name, length: length, actionType: '' },
      });
    }
    if (name === 'recharge') {
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

  const getSingleUser = async (inputId) => {
    try {
      const res = await axios.get(`/api/v1/user/${inputId}`);

      const { data } = res;

      const { msg, user } = data;

      console.log(msg, user);

      dispatch({ type: GET_SINGLE_USER, payload: { msg, user } });
    } catch (error) {
      console.log(error);
    }
  };
  const getSingleUserToTransfer = async (inputPhone) => {
    try {
      const res = await axios.get(`/api/v1/user/getUserByPhone/${inputPhone}`);

      const { data } = res;

      const { msg, getUser } = data;

      console.log(data);

      dispatch({ type: TO_USER_TRANSFER, payload: { msg, getUser } });
    } catch (error) {
      console.log(error);
    }
  };

  const login = async (userInput, actions, loginSuccess) => {
    dispatch({ type: LOGIN_BEGIN });
    resetLoginForm();

    // showToastPromise(
    //   axios.post('/api/v1/auth/login', userInput),
    //   'Login success',
    //   'Login error'
    // );

    setTimeout(async () => {
      try {
        const postUser = await axios.post('/api/v1/auth/login', userInput);

        // function send otp
        // const forgot = await axios.post('/api/v1/auth/forgotpassword', {
        //   email,
        //   phone,
        // });

        // testUser = {email, phone} true
        // false: testUser = null

        // function enterOTP:
        // const enter = await axios.post('/api/v1/auth/enterOTP', {testUser.email, testUser.phone, otp})

        const { data } = postUser;

        const { msg, user, token, isFirstLogin } = data;
        const { loginFail, identify } = user;

        addUserToLocalStorage({ user, token, isFirstLogin });

        if (loginFail === 6) {
          showToast(
            'You login wrong 6 time, you account is blocked forever! Please contact with 1800-00 to solve problem!',
            5000,
            'error'
          );
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
          showToast('Loggin success', 5000, 'success');
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

          loginSuccess();
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

            // actions.setErrors({
            //   password: 'Password is not correct',
            // });

            // if (loginFail !== 3 && loginFail !== 6) {
            showToast('Password is not correct', 4000, 'error');
            // }
          }

          if (message === 'Invalid password') {
            styleInput = 'form-input form-input__error';
            isPwdErr = 'true';

            actions.setErrors({
              password: 'Password is not correct',
            });
            showToast('Password is not correct', 5000, 'error');
          }

          const { loginFail } = user;

          if (loginFail === 3) {
            message = '3 fails, your account is lock in 1 minute';

            showToast(
              'You login wrong 3 time, you account is blocked!',
              3000,
              'success'
            );
            dispatch({ type: OPEN_COUNTDONW });

            setTimeout(() => {
              dispatch({ type: CLOSE_COUNTDOWN });

              showToast('You can login now', 3000, 'success');
            }, 5000);
          } else {
            dispatch({ type: CLOSE_COUNTDOWN });
          }

          if (loginFail === 6) {
            message =
              '6 fails, your account is blocked forever, please contact with admin';

            showToast(
              'You login wrong 6 time, you account is blocked forever! Please contact with 1800-00 to solve problem!',
              5000,
              'error'
            );
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

            actions.setErrors({
              username: 'Username must not empty',
            });

            showToast('Username must empty', 4000, 'error');
          }
          if (message === 'Please provide username and password') {
            styleInput = 'form-input form-input__error';
            isUserErr = 'true';
            isPwdErr = 'true';

            // actions.setErrors({
            //   username: 'Username must not empty',
            // });
            // actions.setErrors({
            //   password: 'Password must not empty',
            // });

            showToast('Username and password must empty', 4000, 'error');
          }
          if (message === 'Can not find user, please provide true username') {
            styleInput = 'form-input form-input__error';
            isUserErr = 'true';

            actions.setErrors({
              username: 'User is not exist',
            });

            showToast('Cannot find any user', 4000, 'error');
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

  const registerNode = async (user, actions) => {
    dispatch({ type: REGISTER_BEGIN });

    console.log('register begin');

    console.log(user);

    setTimeout(async () => {
      try {
        const postUser = await axios.post('/api/v1/auth/register', user, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log(postUser);
        dispatch({ type: REGISTER_SUCCESS, payload: postUser });
        dispatch({
          type: NUM_PAGE_REGISTER,
          payload: { numPage: 8, isOK: true, type: 'plus', length: 8 },
        });

        showToast('Register success', 4000, 'success');

        actions.resetForm();
      } catch (error) {
        dispatch({ type: REGISTER_ERROR });
        console.log(`Cannot register ${error}`);

        const { response } = error;
        const { data } = response;
        const { msg } = data;

        const { email } = user;

        console.log(data);

        dispatch({ type: REGISTER_ERROR, payload: msg, payloadEmail: email });
        showToast(msg, 4000, 'error');
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

  const firstLogin = async (pwd, pwdConfirm, loginSuccess) => {
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

        loginSuccess();
      } catch (error) {
        const { response } = error;
        const { data } = response;
        const { msg } = data;
        showToast(msg, 5000, 'error');

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

  const getAllUsers = async () => {
    try {
      const res = await axios.get('/api/v1/user');

      const { data } = res;

      const { msg, users } = data;

      console.log(msg, users);

      for (let i = 0; i < users.length; i++) {
        users[i].key = users[i]._id;
      }

      dispatch({ type: GET_ALL_USERS, payload: { msg, users } });
    } catch (error) {
      console.log(error);
    }
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

  const rechargeMoneyApp = async ({ money, idCard, dateEnd, cvv }) => {
    dispatch({ type: RECHARGE_BEGIN });

    setTimeout(async () => {
      try {
        const res = await axios.post(`/api/v1/user/recharge`, {
          money,
          numberCard: idCard,
          dateExpire: dateEnd,
          cvvNumber: cvv,
        });

        console.log(res);

        actionBankPage({
          numPage: 2,
          name: 'recharge',
          length: 3,
          actionType: 'plus',
          isOK: true,
        });

        dispatch({ type: RECHARGE_SUCCESS });
      } catch (error) {
        const { response } = error;

        const { data } = response;

        const { msg } = data;

        console.log(data);

        showToast(msg, 5000, 'error');

        dispatch({ type: RECHARGE_ERROR });
      }
    }, 1000);

    // setTimeout(async () => {
    //   try {
    //     const res = await axios.get(`/api/v1/user/${idUser}`);

    //     const { data } = res;

    //     const { msg, user } = data;

    //     console.log(msg, user);

    //     dispatch({ type: GET_SINGLE_USER, payload: { msg, user } });
    //   } catch (error) {
    //     console.log(error);
    //   }
    // }, 1500);
  };

  const transferMoneyApp = async ({
    money,
    numberPhone,
    message,
    userBearFee,
    otpTransaction,
  }) => {
    dispatch({ type: TRANSFER_BEGIN });

    setTimeout(async () => {
      try {
        const res = await axios.post(`/api/v1/user/transfer/enterOtp`, {
          money: Number(money),
          numberPhone,
          message,
          userBearFee,
          otpTransaction,
        });

        console.log(res);

        const { data } = res;

        const { msg, status } = res;

        actionBankPage({
          numPage: 4,
          name: 'transfer',
          length: 5,
          actionType: 'plus',
          isOK: true,
        });

        dispatch({ type: TRANSFER_SUCCESS });
      } catch (error) {
        const { response } = error;

        const { data } = response;

        // console.log(data);

        const { msg } = data;

        console.log('Catch error otp here');

        showToast(msg, 4000, 'error');

        console.log(data);

        dispatch({ type: TRANSFER_ERROR });
      }
    }, 1000);
  };

  const transferSendOtp = async ({
    money: money,
    numberPhone,
    message,
    userBearFee,
  }) => {
    dispatch({ type: TRANSFER_BEGIN });

    setTimeout(async () => {
      try {
        console.log('Catch not enough money here');
        const res = await axios.post('/api/v1/user/transfer', {
          money: Number(money),
          numberPhone,
          message,
          userBearFee,
        });

        console.log(res);

        actionBankPage({
          numPage: 3,
          name: 'transfer',
          length: 5,
          actionType: 'plus',
          isOK: true,
        });

        dispatch({ type: TRANSFER_SUCCESS });
      } catch (error) {
        const { response } = error;

        const { data } = response;

        const { msg } = data;

        // console.log(data);

        showToast(msg, 4000, 'error');

        dispatch({ type: TRANSFER_ERROR });
      }
    }, 1000);
  };

  const withDrawApp = async ({
    money,
    numberCard,
    dateExpire,
    cvvNumber,
    message,
  }) => {
    dispatch({ type: WITH_DRAW_BEGIN });

    setTimeout(async () => {
      try {
        const res = await axios.post('/api/v1/user/withdraw', {
          money: Number(money),
          numberCard,
          dateExpire,
          cvvNumber,
          message,
        });

        const { data } = res;

        console.log(data);

        const { status, msg } = data;

        actionBankPage({
          numPage: 2,
          name: 'withdraw',
          length: 3,
          actionType: 'plus',
          isOK: true,
        });

        dispatch({ type: WITH_DRAW_SUCCESS });
      } catch (error) {
        console.log(error);

        const { response } = error;

        const { data } = response;

        console.log(data);

        const { msg, status } = data;

        showToast(msg, 4000, 'error');

        dispatch({ type: WITH_DRAW_ERROR });
      }
    }, 1000);
  };

  const buyCardApp = ({ amount, nameCard, price }) => {
    dispatch({ type: BUY_CARD_BEGIN });

    setTimeout(async () => {
      try {
        const res = await axios.post('/api/v1/user/buyMobileCard', {
          amount: Number(amount),
          nameCard,
          price: Number(price),
        });

        console.log(res);

        actionBankPage({
          numPage: 2,
          name: 'buy-card',
          length: 3,
          actionType: 'plus',
          isOK: true,
        });

        const { data } = res;

        const { dataCard } = data;

        // dt = {nameCard: '', numberCard: ''}

        dispatch({ type: BUY_CARD_SUCCESS, payload: dataCard });
      } catch (error) {
        const { response } = error;
        const { data } = response;

        console.log(data);

        dispatch({ type: BUY_CARD_ERROR });
      }
    }, 1000);
  };

  const getHistoryByUser = async () => {
    try {
      const res = await axios.get('/api/v1/history/getHistoryByUserLogin');

      console.log(res);

      const { data } = res;
      const { history } = data;

      console.log(history);

      const dataHistoryDisplay = history.map((el) => {
        return {
          key: el._id,
          type: el.type,
          money: Number(el.money).toLocaleString('vi', {
            style: 'currency',
            currency: 'VND',
          }),
          date: el.date,
          status: el.status,
          description: '',
        };
      });

      dispatch({
        type: GET_HISTORY_BY_USER,
        payload: history,
        payloadData: dataHistoryDisplay,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const getHistoryByUserId = async (idUser) => {
    try {
      const res = await axios.get(
        `/api/v1/history/getHistoryByOneUserSort/${idUser}`
      );

      console.log('get all history by user id here');
      console.log(res);

      const { data } = res;
      const { history } = data;

      console.log(history);

      const dataHistoryDisplay = history.map((el) => {
        return {
          key: el._id,
          type: el.type,
          money: el.money,
          date: el.date,
          status: el.status,
          description: '',
        };
      });

      console.log('----');

      console.log(dataHistoryDisplay);

      dispatch({
        type: GET_HISTORY_BY_USER_ID,
        payload: history,
        payloadData: dataHistoryDisplay,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getHistoryById = async (idHistory) => {
    try {
      const res = await axios.get(`/api/v1/history/getHistory/${idHistory}`);

      console.log('Get history by id here');

      const { data } = res;

      console.log(data);

      const { history } = data;

      dispatch({ type: GET_HISTORY_BY_ID, payload: history });
    } catch (error) {
      console.log(error);
    }
  };

  const sendOtpForgotPwd = ({ email, phone }) => {
    dispatch({ type: SEND_OTP_FORGOT_BEGIN });

    setTimeout(async () => {
      try {
        const res = await axios.post(`/api/v1/auth/forgotPassword`, {
          email,
          phone,
        });

        console.log(res);

        actionForgotPage({
          numPage: 1,
          isOK: true,
          type: 'plus',
          length: 3,
        });

        dispatch({ type: SEND_OTP_FORGOT_SUCCESS, payload: { email, phone } });
      } catch (error) {
        console.log(error);

        const { response } = error;

        const { data } = response;

        const { msg } = data;

        showToast(msg, 3000, 'error');

        dispatch({ type: SEND_OTP_FORGOT_ERROR });
      }
    }, 1000);
  };

  const confirmOtpForgotPwd = ({ email, phone, otpForgotPass }) => {
    dispatch({ type: CONFIRM_OTP_FORGOT_BEGIN });

    setTimeout(async () => {
      try {
        const res = await axios.post('/api/v1/auth/enterOTP', {
          email,
          phone,
          otpForgotPass,
        });

        console.log(res);

        actionForgotPage({
          numPage: 2,
          isOK: true,
          type: 'plus',
          length: 3,
        });

        dispatch({ type: CONFIRM_OTP_FORGOT_SUCCESS });
      } catch (error) {
        const { response } = error;

        const { data } = response;

        console.log(data);

        const { msg } = data;

        showToast(msg, 4000, 'error');

        dispatch({ type: CONFIRM_OTP_FORGOT_ERROR });
      }
    }, 1000);
  };

  const confirmPwdForgotPwd = (
    { password, confirmPassword, email, phone },
    forgotPwdSuccesss
  ) => {
    dispatch({ type: CONFIRM_PWD_FORGOT_BEGIN });

    setTimeout(async () => {
      try {
        const res = await axios.post('/api/v1/auth/changePwd', {
          password,
          confirmPassword,
          email,
          phone,
        });

        console.log(res);

        forgotPwdSuccesss();

        dispatch({ type: CONFIRM_PWD_FORGOT_SUCCESS });
      } catch (error) {
        const { response } = error;

        const { data } = response;

        const { msg } = data;

        showToast(msg, 4000, 'error');

        dispatch({ type: CONFIRM_PWD_FORGOT_ERROR });
      }
    }, 1000);
  };

  const getAllHistoryUsers = async () => {
    try {
      const res = await axios.get('/api/v1/history/getAllHistory');

      console.log(res);

      const { data } = res;

      const { histories } = data;

      const reHis = histories.map((el) => {
        return {
          key: el._id,
          type: el.type,
          money: Number(el.money).toLocaleString('vi', {
            style: 'currency',
            currency: 'VND',
          }),
          date: el.date,
          status: el.status,
        };
      });

      dispatch({ type: GET_ALL_HISTORY_USERS, payload: { reHis, histories } });
    } catch (error) {
      console.log(error);

      const { response } = error;

      const { data } = error;

      console.log(data);
    }
  };

  const allowTransferMoney = async (idHis, statusInput) => {
    dispatch({ type: ALLOW_TRANSFER_MONEY_BEGIN });

    setTimeout(async () => {
      try {
        const res = await axios.post(`/api/v1/admin/updateStatus/${idHis}`, {
          status: statusInput,
        });

        console.log(res);

        dispatch({ type: ALLOW_TRANSFER_MONEY_SUCCESS });
      } catch (error) {
        const { response } = error;

        const { data } = response;

        const { msg } = data;

        console.log(msg);
        dispatch({ type: ALLOW_TRANSFER_MONEY_ERROR });
      }
    }, 1000);
  };

  const allowWithdrawMoney = async (idHis, statusInput) => {
    dispatch({ type: ALLOW_WITHDRAW_MONEY_BEGIN });

    setTimeout(async () => {
      try {
        const res = await axios.post(
          `/api/v1/admin/updateStatusWithdrawMoney/${idHis}`,
          {
            status: statusInput,
          }
        );

        console.log(res);

        dispatch({ type: ALLOW_WITHDRAW_MONEY_SUCCESS });
      } catch (error) {
        const { response } = error;

        const { data } = response;

        const { msg } = data;

        console.log(msg);
        dispatch({ type: ALLOW_WITHDRAW_MONEY_ERROR });
      }
    }, 1000);
  };

  const getAllUserWithCondition = async (typeCondition) => {
    dispatch({ type: GET_ALL_USER_WITH_CONDITION_BEGIN });

    setTimeout(async () => {
      console.log('get all users witn condition here');
      try {
        if (typeCondition === 'UserProcessing') {
          console.log('get all user processing here');
          const res = await axios.get('/api/v1/admin/getAllUserProcessing');
          console.log(res);

          const { data } = res;

          const { allUser } = data;

          for (let i = 0; i < allUser.length; i++) {
            allUser[i].key = allUser[i]._id;
          }

          console.log(allUser);
          dispatch({
            type: GET_ALL_USER_WITH_CONDITION_SUCCESS,
            payload: allUser,
          });
        }
        if (typeCondition === 'UserActive') {
          const res = await axios.get('/api/v1/admin/getAllUserActive');
          console.log(res);

          const { data } = res;

          const { allUser } = data;

          for (let i = 0; i < allUser.length; i++) {
            allUser[i].key = allUser[i]._id;
          }

          console.log(allUser);
          dispatch({
            type: GET_ALL_USER_WITH_CONDITION_SUCCESS,
            payload: allUser,
          });
        }
        if (typeCondition === 'UserBlock') {
          const res = await axios.get('/api/v1/admin/getAllUserBlock');
          console.log(res);

          const { data } = res;

          const { allUser } = data;

          for (let i = 0; i < allUser.length; i++) {
            allUser[i].key = allUser[i]._id;
          }

          console.log(allUser);
          dispatch({
            type: GET_ALL_USER_WITH_CONDITION_SUCCESS,
            payload: allUser,
          });
        }
        if (typeCondition === 'UserBlockPassword') {
          const res = await axios.get('/api/v1/admin/getAllUsersBlockPassword');
          console.log(res);

          const { data } = res;

          const { allUser } = data;

          for (let i = 0; i < allUser.length; i++) {
            allUser[i].key = allUser[i]._id;
          }

          console.log(allUser);
          dispatch({
            type: GET_ALL_USER_WITH_CONDITION_SUCCESS,
            payload: allUser,
          });
        }
      } catch (error) {
        const { response } = error;

        const { data } = response;

        console.log(data);

        dispatch({ type: GET_ALL_USER_WITH_CONDITION_ERROR });
      }
    }, 1000);
  };

  const updateIdentifyUser = async (typeIdentify, idUser) => {
    dispatch({ type: UPDATE_IDENTIFY_USER_BEGIN });

    setTimeout(async () => {
      try {
        if (typeIdentify === 'cancel') {
          const res = await axios.post(
            `/api/v1/admin/updateIdentifyUser/${idUser}`,
            {
              identify: 'fail',
            }
          );

          console.log(res);
        }
        if (typeIdentify === 'success') {
          const res = await axios.post(
            `/api/v1/admin/updateIdentifyUser/${idUser}`,
            {
              identify: 'success',
            }
          );

          console.log(res);
        }
        if (typeIdentify === 'waiting') {
          const res = await axios.post(
            `/api/v1/admin/updateIdentifyUser/${idUser}`,
            {
              identify: 'waiting',
            }
          );

          console.log(res);
        }

        if (typeIdentify === 'block') {
          const res = await axios.post(
            `/api/v1/admin/unlockUserWrongPassword/${idUser}`
          );

          console.log(res);
        }
        dispatch({ type: UPDATE_IDENTIFY_USER_SUCCESS });
      } catch (error) {
        const { response } = error;

        const { data } = response;
        console.log(data);

        dispatch({ type: UPDATE_IDENTIFY_USER_ERROR });
      }
    }, 1000);
  };

  const changePassword = async ({ password, confirmPassword, oldPassword }) => {
    dispatch({ type: CHANGE_PASSWORD_BEGIN });

    setTimeout(async () => {
      try {
        const res = await axios.post(
          '/api/v1/auth/changeNewPasswordAfterLogin',
          { password, confirmPassword, oldPassword }
        );

        console.log(res);

        showToast('Change password success', 4000, 'success');

        dispatch({ type: CHANGE_PASSWORD_SUCCESS });
      } catch (error) {
        const { response } = error;
        const { data } = response;

        console.log(data);

        const { msg } = data;

        showToast(msg, 4000, 'error');

        dispatch({ type: CHANGE_PASSWORD_ERROR });
      }
    }, 1500);
  };

  const uploadImageCMND = ({ imageFront, imageBack, idUser }) => {
    // dispatch({ type: REGISTER_BEGIN });

    console.log('upload begin');

    // console.log(user);

    dispatch({ type: UPLOAD_CMND_BEGIN });

    setTimeout(async () => {
      try {
        const postUser = await axios.post(
          '/api/v1/auth/upload',
          { imageFront, imageBack, idUser: idUser },
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );
        console.log(postUser);
        // dispatch({ type: REGISTER_SUCCESS, payload: postUser });

        showToast('Upload success', 4000, 'success');

        dispatch({ type: UPLOAD_CMND_SUCCESS });

        // actions.resetForm();
      } catch (error) {
        // dispatch({ type: REGISTER_ERROR });
        console.log(`Cannot upload ${error}`);

        const { response } = error;
        const { data } = response;
        // const { msg } = data;

        // const { email } = user;

        console.log(data);

        dispatch({ type: UPLOAD_CMND_ERROR });

        // showToast(msg, 4000, 'error');
      }
    }, 100);
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        showLoading,
        switchPage,
        login,
        registerNode,
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
        actionForgotPage,
        actionRegisterPage,
        getAllUsers,
        getSingleUser,
        rechargeMoneyApp,
        transferMoneyApp,
        transferSendOtp,
        withDrawApp,
        buyCardApp,
        getHistoryByUser,
        getHistoryById,
        sendOtpForgotPwd,
        confirmPwdForgotPwd,
        confirmOtpForgotPwd,
        getAllHistoryUsers,
        allowTransferMoney,
        allowWithdrawMoney,
        getAllUserWithCondition,
        updateIdentifyUser,
        updateIdentifyUser,
        getHistoryByUserId,
        changePassword,
        uploadImageCMND,
        getSingleUserToTransfer,
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
