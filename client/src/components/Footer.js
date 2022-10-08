import React from 'react';

import Logo from '../assets/images/logos/bankist.svg';
import Logo2 from '../assets/images/logos/bankist_2.svg';

import {
  FaFacebook,
  FaInstagram,
  FaCcVisa,
  FaCcPaypal,
  FaCcDiscover,
  FaCcMastercard,
} from 'react-icons/fa';

import FooterLandingStyled from '../theme/components/FooterLanding';

const Footer = () => {
  return (
    <FooterLandingStyled>
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
            <FaCcDiscover className="footer__icon footer__icon--payment"></FaCcDiscover>
            <FaCcMastercard className="footer__icon footer__icon--payment"></FaCcMastercard>
          </div>
          <p className="footer__copyright">
            <small>&copy; Copyright 2022, Bankist App</small>{' '}
          </p>
        </div>

        <div className="footer__content">
          <h2 className="heading--secondary footer__heading">Services</h2>
          <ul className="footer__list">
            <li className="footer__item">Personal Loan</li>
            <li className="footer__item">Bussiness Loan</li>
            <li className="footer__item">Online Cash Loan</li>
            <li className="footer__item">Cash Advance</li>
          </ul>
        </div>
        <div className="footer__content">
          <h2 className="heading--secondary footer__heading">Quick Link</h2>
          <ul className="footer__list">
            <li className="footer__item">About</li>
            <li className="footer__item">Offers / Discount</li>
            <li className="footer__item">Get Coupon</li>
          </ul>
        </div>
        <div className="footer__content">
          <h2 className="heading--secondary footer__heading">Support</h2>
          <ul className="footer__list">
            <li className="footer__item">Frequently Asked Question</li>
            <li className="footer__item">Terms Conditions</li>
            <li className="footer__item">Privacy Policy</li>
            <li className="footer__item">Report a Payent issue</li>
          </ul>
        </div>
        <div className="footer__content">
          <h2 className="heading--secondary footer__heading">Open hours</h2>
          <ul className="footer__list">
            <li className="footer__item">
              We work all days a week, Please contact us for any inquiry.
            </li>
            <li className="footer__item">
              Monday - Friday: 11:00 am - 8:00 pm
            </li>
            <li className="footer__item">Saturday: 10:00 am - 6:00 pm</li>
            <li className="footer__item">Sunday: 11:00 am - 6:00 pm</li>
          </ul>
        </div>
      </footer>
    </FooterLandingStyled>
  );
};

export default Footer;
