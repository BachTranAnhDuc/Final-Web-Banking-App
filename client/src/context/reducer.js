import React from 'react';
import { SHOW_HIDE_LOADING, SWITCH_PAGE } from './action';

const reducer = (state, action) => {
  if (action.type === SHOW_HIDE_LOADING) {
    return { ...state, isLoading: true };
  }

  if (action.type === SWITCH_PAGE) {
    return { ...state, isLoading: false };
  }
};

export default reducer;
