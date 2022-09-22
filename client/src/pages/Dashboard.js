import React, { useEffect, useState } from 'react';

import { Loading } from '../components';

const Dashboard = () => {
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
    </section>
  );
};

export default Dashboard;
