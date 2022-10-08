import React from 'react';

import {
  SHOW_HIDE_LOADING,
  SWITCH_PAGE,
  LOGIN_BEGIN,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  REGISTER_BEGIN,
  REGISTER_SUCCESS,
  REGISTER_ERROR,
  OPEN_SIDE_BAR,
  OPEN_MODAL,
  CLOSE_MODAL,
  CLOSE_SIDE_BAR,
  LOGOUT,
  FIRST_LOGIN_BEGIN,
  FIRST_LOGIN_SUCCESS,
  FIRST_LOGIN_ERROR,
  OPEN_COUNTDONW,
  CLOSE_COUNTDOWN,
  HIDE_LOADING,
  IS_LOGIN,
  IS_ALERT,
  RESET_LOGIN_FORM,
  RESET_ALERT,
  UPLOAD_IMAGE,
  SAVE_IMAGE_BACK,
  SAVE_IMAGE_FRONT,
  SHOW_LOADER,
  HIDE_LOADER,
  SHOW_STYLE_BODY,
  HIDE_STYLE_BODY,
  CONFIRM_PWD_BUY,
  NUM_PAGE_BANK,
  CONFIRM_DIGITAL_CARD,
  VALID_MONEY_INPUT,
} from './action';

const reducer = (state, action) => {
  if (action.type === SHOW_HIDE_LOADING) {
    return { ...state, isLoading: true };
  }

  if (action.type === HIDE_LOADING) {
    return { ...state, isLoading: false };
  }

  if (action.type === SWITCH_PAGE) {
    return { ...state, isLoading: false };
  }

  if (action.type === LOGIN_BEGIN) {
    return {
      ...state,
      isErrorForm: true,
      messageErrorForm: 'Login is processing...',
      typeErrorForm: 'processing',
      isLoadingForm: true,
      isLogin: false,
      styleAlert: 'form__alert form__alert--processing',
    };
  }

  if (action.type === LOGIN_SUCCESS) {
    return {
      ...state,
      isErrorForm: true,
      messageErrorForm: action.payloadMsg,
      typeErrorForm: 'success',
      // user: action.payloadUser,
      isLogin: true,
      user: action.payloadUser,
      token: action.payloadToken,
      isFirstLogin: action.payloadIsFirst,
      isLoadingForm: false,
      numberOfLoginFail: action.payloadFail,
      styleAlert: 'form__alert form__alert--success',
      styleInputLogin: action.payloadStyle,
    };
  }

  if (action.type === LOGIN_ERROR) {
    return {
      ...state,
      isErrorForm: true,
      messageErrorForm: action.payloadMsg,
      typeErrorForm: 'error',
      isLoadingForm: false,
      user: null,
      isLogin: false,
      numberOfLoginFail: action.payloadFail,
      styleAlert: 'form__alert form__alert--error',
      styleInputLogin: action.payloadStyle,
    };
  }

  if (action.type === REGISTER_BEGIN) {
    return { ...state };
  }

  if (action.type === REGISTER_SUCCESS) {
    return {
      ...state,
      isErrorForm: false,
      messageErrorForm: 'Login success',
      typeErrorForm: 'success',
      // isError: false,
    };
  }

  if (action.type === REGISTER_ERROR) {
    return {
      ...state,
      isErrorForm: true,
      messageErrorForm: action.payload,
      typeErrorForm: 'form__error',
      // isError: true,
    };
  }

  if (action.type === OPEN_SIDE_BAR) {
    return {
      ...state,
      isSidebarOpen: true,
    };
  }
  if (action.type === CLOSE_SIDE_BAR) {
    return {
      ...state,
      isSidebarOpen: false,
    };
  }

  if (action.type === LOGOUT) {
    return {
      ...state,
      user: null,
      token: '',
      isFirstLogin: true,
      isErrorForm: false,
      messageErrorForm: '',
      isLogin: false,
    };
  }

  if (action.type === FIRST_LOGIN_BEGIN) {
    return {
      ...state,
      isErrorForm: true,
      messageErrorForm: 'Loading is processing...',
      typeErrorForm: 'processing',
      styleAlert: 'form__alert form__alert--processing',
    };
  }
  if (action.type === FIRST_LOGIN_SUCCESS) {
    return {
      ...state,
      isErrorForm: true,
      styleAlert: 'form__alert form__alert--success',
      messageErrorForm: 'Changing success',
      typeErrorForm: 'success',
      token: action.payloadToken,
      user: action.payloadUser,
      isFirstLogin: action.payloadIsFirst,
      styleInputLogin: action.payloadStyle,
    };
  }
  if (action.type === FIRST_LOGIN_ERROR) {
    return {
      ...state,
      isErrorForm: true,
      messageErrorForm: action.payloadMsg,
      styleInputLogin: action.payloadStyle,
      styleAlert: 'form__alert form__alert--error',
      isFirstLogin: true,
    };
  }

  if (action.type === OPEN_COUNTDONW) {
    return {
      ...state,
      isCountDown: true,
      isErrorForm: true,
      messageErrorForm: 'You can login now',
      styleAlert: 'form__alert form__alert--success',
    };
  }
  if (action.type === CLOSE_COUNTDOWN) {
    return {
      ...state,
      isCountDown: false,
      isErrorForm: true,
      messageErrorForm: 'You can login now',
      styleAlert: 'form__alert form__alert--success',
    };
  }

  if (action.type === IS_LOGIN) {
    return {
      ...state,
      isLogin: true,
    };
  }

  if (action.type === IS_ALERT) {
    return {
      ...state,
      isErrorForm: false,
    };
  }

  if (action.type === RESET_LOGIN_FORM) {
    return {
      ...state,
      styleInputLogin: {
        isUserErr: 'default',
        isPwdForm: 'default',
        isFirstPwd: 'default',
        isFirstPwdConfirm: 'default',
        style: 'form-input',
      },
    };
  }

  if (action.type === RESET_ALERT) {
    return {
      ...state,
      isErrorForm: false,
      messageErrorForm: '',
    };
  }

  if (action.type === UPLOAD_IMAGE) {
    return {
      ...state,
    };
  }

  if (action.type === SAVE_IMAGE_BACK) {
    return {
      ...state,
      /* imgs:{...imgs,imageBack: action.pageLoadImage} */
      imgBack: action.pageLoadImage,
    };
  }

  if (action.type === SAVE_IMAGE_FRONT) {
    return {
      ...state,
      /* imgs:{...imgs,imageBack: action.pageLoadImage} */
      imgFront: action.pageLoadImage,
    };
  }

  if (action.type === SHOW_LOADER) {
    return {
      ...state,
      isLoader: true,
    };
  }

  if (action.type === HIDE_LOADER) {
    return {
      ...state,
      isLoader: false,
    };
  }

  if (action.type === SHOW_STYLE_BODY) {
    return {
      ...state,
      styleBody: 'container__dashboard setting-background',
    };
  }
  if (action.type === HIDE_STYLE_BODY) {
    return {
      ...state,
      styleBody: 'container__dashboard',
    };
  }

  if (action.type === CONFIRM_PWD_BUY) {
    return {
      ...state,
      isConfirmPwdBuy: action.payload,
    };
  }

  if (action.type === NUM_PAGE_BANK) {
    const { numPage, name, length, actionType, isOK } = action.payload;

    return {
      ...state,
      bankPage: { numPage, name, length, actionType, isOK },
    };
  }

  if (action.type === CONFIRM_DIGITAL_CARD) {
    return { ...state, isConfirmDigitalCard: action.payload };
  }

  if (action.type === VALID_MONEY_INPUT) {
    return { ...state, isCorrectMoney: action.payload };
  }
};

export default reducer;
