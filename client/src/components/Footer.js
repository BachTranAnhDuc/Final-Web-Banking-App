import React from 'react';

import Logo from '../assets/images/logos/bankist.svg';
import Logo2 from '../assets/images/logos/bankist_2.svg';

import { FaFacebook, FaInstagram, FaCcVisa, FaCcPaypal } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      <img src={Logo2} alt="" className="footer__logo" />

      <div className="footer__icons-list">
        <div className="footer__contacts">
          <h2 className="heading--secondary footer__heading">Follow Us</h2>
          <div className="footer__contact-logos">
            <FaFacebook className="footer__icon footer__icon--contact"></FaFacebook>
            <FaInstagram className="footer__icon footer__icon--contact"></FaInstagram>
          </div>
        </div>

        <div className="footer__payments">
          <FaCcVisa className="footer__icon footer__icon--payment"></FaCcVisa>
          <FaCcPaypal className="footer__icon footer__icon--payment"></FaCcPaypal>
          <FaCcVisa className="footer__icon footer__icon--payment"></FaCcVisa>
          <FaCcPaypal className="footer__icon footer__icon--payment"></FaCcPaypal>
        </div>
        <p className="footer__copyright">
          <small>&copy; Copyright 2022, Bankist App</small>{' '}
        </p>
      </div>

      <div className="footer__content">
        <h2 className="heading--secondary footer__heading">Product</h2>
        <ul className="footer__list">
          <li className="footer__item">Something</li>
          <li className="footer__item">Something</li>
          <li className="footer__item">Something</li>
          <li className="footer__item">Something</li>
          <li className="footer__item">Something</li>
        </ul>
      </div>
      <div className="footer__content">
        <h2 className="heading--secondary footer__heading">Product</h2>
        <ul className="footer__list">
          <li className="footer__item">Something</li>
          <li className="footer__item">Something</li>
          <li className="footer__item">Something</li>
        </ul>
      </div>
      <div className="footer__content">
        <h2 className="heading--secondary footer__heading">Product</h2>
        <ul className="footer__list">
          <li className="footer__item">Something</li>
          <li className="footer__item">Something</li>
          <li className="footer__item">Something</li>
          <li className="footer__item">Something</li>
        </ul>
      </div>
      <div className="footer__content">
        <h2 className="heading--secondary footer__heading">Product</h2>
        <ul className="footer__list">
          <li className="footer__item">Something</li>
          <li className="footer__item">Something</li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
