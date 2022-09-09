import React, { useContext, useState, useReducer } from 'react';

import reducer from './reducer';

import { SHOW_HIDE_LOADING, SWITCH_PAGE } from './action';

const defaultState = {
  isLoading: false,
  showAlert: false,
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

  return (
    <AppContext.Provider value={{ ...state, showLoading, switchPage }}>
      {children}
    </AppContext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider, useGlobalContext };
