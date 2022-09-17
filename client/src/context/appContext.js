import React, { useContext, useState, useReducer } from 'react';

import reducer from './reducer';

import {
  SHOW_HIDE_LOADING,
  SWITCH_PAGE,
  REGISTER_SUCCESS,
  REGISTER_ERROR,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGIN_BEGIN,
} from './action';

const defaultState = {
  isLoading: false,
  showAlert: false,
  isErrorForm: null,
  messageErrorForm: '',
  typeErrorForm: '',
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, defaultState);

  const showLoading = () => {
    dispatch({ type: SHOW_HIDE_LOADING });
  };

  const switchPage = () => {
    showLoading();

    setTimeout(() => {
      dispatch({ type: SWITCH_PAGE });
    }, 1000);
  };

  const login = () => {
    dispatch({ type: LOGIN_BEGIN });

    setTimeout(() => {
      dispatch({ type: LOGIN_SUCCESS });
    }, 2000);
  };

  return (
    <AppContext.Provider value={{ ...state, showLoading, switchPage, login }}>
      {children}
    </AppContext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider, useGlobalContext };
