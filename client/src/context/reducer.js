import React from 'react';
import { SHOW_HIDE_LOADING } from './action';

const reducer = (state, action) => {
  if (action.type === SHOW_HIDE_LOADING) {
    return { ...state, isLoading: true };
  }
};

export default reducer;
