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
  OPEN_MODAL,
  OPEN_SIDE_BAR,
  CLOSE_MODAL,
  CLOSE_SIDE_BAR,
  LOGOUT,
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

  const login = async (userInput) => {
    dispatch({ type: LOGIN_BEGIN });

    setTimeout(async () => {
      try {
        const postUser = await axios.post('/api/v1/auth/login', userInput);

        const { data } = postUser;

        const { msg, user, token, isFirstLogin } = data;

        console.log(user);

        addUserToLocalStorage({ user, token, isFirstLogin });

        dispatch({
          type: LOGIN_SUCCESS,
          payloadMsg: msg,
          payloadUser: user,
          payloadToken: token,
          payloadIsFirst: isFirstLogin,
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

  const logout = async () => {
    try {
      const log = await axios.post('/api/v1/auth/logout');

      removeUserFromLocalStorage();

      // console.log(log);
      dispatch({ type: LOGOUT });
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
