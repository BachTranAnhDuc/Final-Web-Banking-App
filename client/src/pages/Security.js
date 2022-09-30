import React from 'react';

import { useGlobalContext } from '../context/appContext';

import { Loader2 } from '../components';

const Security = () => {
  const { isLoader } = useGlobalContext();

  if (isLoader) {
    return (
      <div className="section-setting">
        <Loader2></Loader2>;
      </div>
    );
  }

  return <div className="section-setting">Security</div>;
};

export default Security;
