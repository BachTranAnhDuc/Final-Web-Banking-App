import React from 'react';

const Alert = ({ isError, msgError, typeError }) => {
  return (
    <div
      className={
        typeError === 'success'
          ? 'form__alert form__alert--success'
          : typeError === 'processing'
          ? 'form__alert form__alert--processing'
          : 'form__alert form__alert--error'
      }
    >
      <p>{isError ? `${msgError} 💣` : `${msgError} 🎉`}</p>
    </div>
  );
};

export default Alert;
