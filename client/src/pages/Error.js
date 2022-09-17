import React from 'react';
import ErrorImage from '../assets/images/error.svg';

const Error = () => {
  return (
    <section className="section-error">
      <img src={ErrorImage} alt="error image" className="error-image" />
      <h2 className="heading--secondary">Something went wrong!</h2>
    </section>
  );
};

export default Error;
