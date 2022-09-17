import React from 'react';
import { Loading } from '../components';
import { useGlobalContext } from '../context/appContext';
import Aboutme from '../assets/images/about-me.svg';
import TypeWriterEffect from 'react-typewriter-effect';
import avt1 from '../assets/images/avt/hacker.png';

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
    return (
      <section className="section-about">
        <h1 className="heading--primary about-heading">
          <span className="heading__highlight">About</span> me
        </h1>
        {/* <h4 className="about-name">Bach Tran Anh Duc</h4> */}

        <TypeWriterEffect
          textStyle={{
            fontFamily: 'Roboto, sans-serif',
            color: '#333',
            fontWeight: 500,
            fontSize: '1.8rem',
            alignSelf: 'start',
          }}
          startDelay={2000}
          cursorColor="inherit"
          multiText={[
            'Bach Tran Anh Duc - 51900313',
            'Lam Quoc Hung - 519H***',
            'Tran Thien Phong - 519H***',
            'Phu Huu Chi Trung - 519H***',
          ]}
          multiTextDelay={1000}
          typeSpeed={30}
        />
        <img src={Aboutme} alt="about me" className="about-image" />

        <div className="about-team">
          <img
            src={avt1}
            alt="avatar 1"
            className="about-avatar about-avatar__1"
          />
          <img
            src={avt1}
            alt="avatar 1"
            className="about-avatar about-avatar__2"
          />
          <img
            src={avt1}
            alt="avatar 1"
            className="about-avatar about-avatar__3"
          />
          <img
            src={avt1}
            alt="avatar 1"
            className="about-avatar about-avatar__4"
          />
        </div>
      </section>
    );
  }
};

export default About;
