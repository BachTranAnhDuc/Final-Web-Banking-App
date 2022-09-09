import React from 'react';
import { Loading } from '../components';
import { useGlobalContext } from '../context/appContext';

const About = () => {
  const { isLoading } = useGlobalContext();

  if (isLoading) {
    return (
      <section className="section-about">
        <Loading></Loading>
      </section>
    );
  }

  if (!isLoading) {
    return <section className="section-about">About me</section>;
  }
};

export default About;
