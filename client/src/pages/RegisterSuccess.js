import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, Link } from 'react-router-dom';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const RegisterSuccess = () => {
  const [error, setError] = useState(false);
  const query = useQuery();

  const verifyToken = async () => {
    try {
      const { user } = await axios.post('/api/v1/auth/verify-email', {
        verificationToken: query.get('token'),
        email: query.get('email'),
      });

      console.log(user);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    verifyToken();
  }, []);

  if (error) {
    return (
      <section className="section-register__success">
        <p>Something went wrong!!</p>
      </section>
    );
  }

  return (
    <section className="section-register__success">
      <h2 className="heading--secondary">Register success</h2>
      <p className="register__success--text">You can login now</p>
    </section>
  );
};

export default RegisterSuccess;
