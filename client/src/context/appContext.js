import React, { useContext, useState, useReducer } from 'react';

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
} from './action';

const defaultState = {
  isLoading: false,
  showAlert: false,
  isErrorForm: false,
  messageErrorForm: '',
  typeErrorForm: '',
  user: null,
  isError: false,
  isLogin: false,
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

  const login = async (userInput) => {
    dispatch({ type: LOGIN_BEGIN });

    setTimeout(async () => {
      try {
        const postUser = await axios.post('/api/v1/auth/login', userInput);

        const { data } = postUser;

        const { msg, user } = data;

        dispatch({
          type: LOGIN_SUCCESS,
          payloadMsg: msg,
          payloadUser: user,
        });
      } catch (error) {
        const { response } = error;
        const { data } = response;
        const { msg } = data;

        dispatch({ type: LOGIN_ERROR, payload: msg });
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

  return (
    <AppContext.Provider
      value={{ ...state, showLoading, switchPage, login, register }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider, useGlobalContext };
