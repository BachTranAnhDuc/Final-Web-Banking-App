import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, Link } from 'react-router-dom';
import { useGlobalContext } from '../context/appContext.js';

import { Error } from './index.js';
import { Loading } from '../components';

import verifyImage from '../assets/images/verify.svg';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const VerifyEmail = () => {
  const [error, setError] = useState(false);
  const query = useQuery();
  const { isLoading, switchPage, isError } = useGlobalContext();

  const verifyToken = async () => {
    try {
      const res = await axios.post('/api/v1/auth/verify-email', {
        verificationToken: query.get('verificationToken'),
        email: query.get('email'),
      });

      console.log('Success');

      console.log(res);
    } catch (error) {
      setError(true);
      console.log('Something went wrong');
      console.log(error);
    }
  };

  useEffect(() => {
    verifyToken();
  }, []);

  if (error) {
    return <Error></Error>;
  } else {
    return (
      <section className="section-register__verify">
        <div className="section-register__verify-image">
          <img src={verifyImage} alt="image" />
        </div>

        <div className="section-register__verify-content">
          <h2 className="heading--secondary">Validation success</h2>
          <Link
            to={'/login'}
            className="register__verify--text"
            onClick={() => switchPage()}
          >
            Login now
          </Link>
        </div>
      </section>
    );
  }
};

export default VerifyEmail;
