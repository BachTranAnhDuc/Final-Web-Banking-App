import React from 'react';

const AlertRegister = ({ isError, typeError, msgError }) => {
  return (
    <div className="register__result">
      <h2 className="heading--primary register__result--heading">
        {isError ? 'Register error 💥' : 'Register success 🥰'}
      </h2>
      <p className="register__result--text">
        {isError ? `${msgError}` : 'Please check your email to validation'}
      </p>
    </div>
  );
};

export default AlertRegister;
