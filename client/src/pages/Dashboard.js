import React, { useEffect, useState } from 'react';

import { Loading } from '../components';

const Dashboard = () => {
  const [getLoading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  }, []);

  if (getLoading) {
    return <Loading></Loading>;
  }

  return <div>Dashboard</div>;
};

export default Dashboard;
