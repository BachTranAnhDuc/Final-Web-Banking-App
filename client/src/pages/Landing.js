import React from 'react';
import Landing1 from '../assets/images/landing-page-1.svg';
import { IoLogoGooglePlaystore } from 'react-icons/io5';
import Logo1 from '../assets/images/logos/logo-Franke.svg';
import Logo2 from '../assets/images/logos/logo-Zenlink.svg';
import Logo3 from '../assets/images/logos/logo-Mensa-Brands.svg';
import Logo4 from '../assets/images/logos/logo-TaskRabbit.svg';
import Logo5 from '../assets/images/logos/logo-XBox-Black.svg';
import Logo6 from '../assets/images/logos/logo-Unity-New-2021.svg';
import Logo7 from '../assets/images/logos/Brussels-Airlines-New-2021.svg';
import Logo8 from '../assets/images/logos/logo-Alegra.svg';

import 'animate.css';
import { useGlobalContext } from '../context/appContext';
import { Loading } from '../components';

import LandingPage from '../theme/pages/LandingPage';

import {
  DefaultButton,
  LoginButton,
  Button83,
  ContactButton,
  DownloadButton,
} from '../theme/components/Buttons';

const Landing = () => {
  const { isLoading } = useGlobalContext();

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <LandingPage>
      <header className="header">
        <h1 className="heading--primary header__heading animate__animated animate__lightSpeedInLeft">
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

        <div className="header__buttons">
          <DownloadButton>
            <IoLogoGooglePlaystore className="logo-playstore"></IoLogoGooglePlaystore>
            <span className="btn-text"> Download app</span>
          </DownloadButton>
          <ContactButton className="btn btn-contact">Contact us</ContactButton>
        </div>

        <img
          src={Landing1}
          alt="landing 1"
          className="header__image animate__animated animate__fadeInRight"
        />
      </header>
      <main>
        <section className="section-features">
          <div className="features__images">
            <img src={Logo7} alt="Brand 1" className="features__image" />
            <img src={Logo2} alt="Brand 2" className="features__image" />
            <img src={Logo3} alt="Brand 3" className="features__image" />
            <img src={Logo8} alt="Brand 4" className="features__image" />
            <img src={Logo5} alt="Brand 5" className="features__image" />
            <img src={Logo6} alt="Brand 6" className="features__image" />
          </div>
        </section>
        <section className="section-features">
          <div className="features__images">
            <img src={Logo7} alt="Brand 1" className="features__image" />
            <img src={Logo2} alt="Brand 2" className="features__image" />
            <img src={Logo3} alt="Brand 3" className="features__image" />
            <img src={Logo8} alt="Brand 4" className="features__image" />
            <img src={Logo5} alt="Brand 5" className="features__image" />
            <img src={Logo6} alt="Brand 6" className="features__image" />
          </div>
        </section>
      </main>
    </LandingPage>
  );
};

export default Landing;
