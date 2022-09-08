import React from 'react';
import Landing1 from '../assets/images/landing-page-1.svg';

const Landing = () => {
  return (
    <>
      <header className="header">
        <h1 className="heading--primary header__heading">
          Easy way to <span className="heading__highlight">manage</span> to your
          money
        </h1>
        <p className="header__text">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam vel
          felis laoreet, vestibulum massa eu, ultricies diam. Duis in tortor vel
          eros commodo dictum vel et tortor. Ut vulputate imperdiet egestas. Ut
          ultrices tempus velit vel tristique. Vivamus eget convallis diam, eu
          dignissim lacus. Mauris iaculis leo nec imperdiet feugiat. Sed auctor
          scelerisque ipsum, commodo dignissim nunc euismod in. Aenean posuere
          ultricies ipsum, quis pharetra lacus vehicula at. Sed dictum metus a
          enim vulputate ornare.
        </p>

        <img src={Landing1} alt="landing 1" className="header__image" />
      </header>
      <main></main>
    </>
  );
};

export default Landing;
