import React from 'react';

import FooterDashStyled from '../theme/components/FooterDash';

const FooterDash = () => {
  return (
    <FooterDashStyled>
      <footer className="footer-dash">
        <div className="footer-dash__content">
          <p className="footer-dash__copyright">
            <small>&copy; Copyright 2022, Bankist App</small>
          </p>

          <span className="footer-dash__text">Group 6</span>
        </div>
      </footer>
    </FooterDashStyled>
  );
};

export default FooterDash;
