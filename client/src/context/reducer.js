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
      messageErrorForm: 'Valid user',
      typeErrorForm: 'form__success',
    };
  }

  if (action.type === LOGIN_SUCCESS) {
    return {
      ...state,
      isErrorForm: false,
      messageErrorForm: 'Valid user',
      typeErrorForm: 'form__success',
      user: action.payload,
    };
  }

  if (action.type === LOGIN_ERROR) {
    return { ...state };
  }

  if (action.type === REGISTER_BEGIN) {
    return { ...state };
  }

  if (action.type === REGISTER_SUCCESS) {
    return { ...state };
  }

  if (action.type === REGISTER_ERROR) {
    return { ...state };
  }
};

export default reducer;
