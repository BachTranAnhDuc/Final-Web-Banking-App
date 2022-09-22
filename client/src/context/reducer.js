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
} from './action';

const reducer = (state, action) => {
  if (action.type === SHOW_HIDE_LOADING) {
    return { ...state, isLoading: true };
  }

  if (action.type === SWITCH_PAGE) {
    return { ...state, isLoading: false };
  }

  if (action.type === LOGIN_BEGIN) {
    return {
      ...state,
      isErrorForm: false,
      messageErrorForm: 'Login is processing...',
      typeErrorForm: 'processing',
    };
  }

  if (action.type === LOGIN_SUCCESS) {
    return {
      ...state,
      isErrorForm: false,
      messageErrorForm: action.payloadMsg,
      typeErrorForm: 'success',
      // user: action.payloadUser,
      isLogin: true,
      user: action.payloadUser,
      token: action.payloadToken,
    };
  }

  if (action.type === LOGIN_ERROR) {
    return {
      ...state,
      isErrorForm: true,
      messageErrorForm: action.payload,
      typeErrorForm: 'error',
      // user: null,
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
    };
  }
};

export default reducer;
