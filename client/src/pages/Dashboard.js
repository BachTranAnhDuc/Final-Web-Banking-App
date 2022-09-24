import React, { useEffect, useState } from 'react';

import { Loading } from '../components';

import { useGlobalContext } from '../context/appContext';

const Dashboard = () => {
  const { user } = useGlobalContext();

  const { name, identify, role, email } = user;

  const [getLoading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);

  if (getLoading) {
    return <Loading></Loading>;
  }

  return (
    <section className="section-dashboard">
      <h1 className="heading--primary">This is dashboard</h1>
      <h2 className="heading--secondary">{`Hello ${name}`}</h2>
      <p>{`You are ${role}`}</p>

      <span>
        {identify === 'processing'
          ? 'Your account is processing....'
          : 'Success'}
      </span>
    </section>
  );
};

export default Dashboard;
