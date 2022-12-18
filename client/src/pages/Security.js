import React from 'react';

import { useGlobalContext } from '../context/appContext';

import { Loader2 } from '../components';

import SettingStyled from '../theme/pages/Setting';

const Security = () => {
  const { isLoader, user } = useGlobalContext();

  if (isLoader) {
    return (
      <SettingStyled>
        <div className="section-setting">
          <Loader2></Loader2>;
        </div>
      </SettingStyled>
    );
  }

  return (
    <SettingStyled>
      <div className="section-setting section-setting__security">
        <div>
          <p>
            Your account is: <span>{user?.identify}</span>
          </p>

          {user?.identify === 'processing' && (
            <div>
              You are processing, so you cannot access deposit and history bank
              app, please wait your account is identify!
            </div>
          )}
          {user?.identify === 'waiting' && (
            <div>You are waiting, please update your account!</div>
          )}
          {user?.identify === 'success' && (
            <div>Your account is identify, so you can use all function!</div>
          )}
        </div>
      </div>
    </SettingStyled>
  );
};

export default Security;
