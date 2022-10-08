import styled from 'styled-components';

const FooterLandingStyled = styled.main`
  .footer {
    border-top: 2px solid var(--color-primary-dark-6);
    padding: 8rem 16rem;
    /* background-color: var(--color-grey-light-9); */

    display: grid;

    grid-template-columns: repeat(3, 1fr);

    justify-items: start;

    gap: 3.2rem 1.6rem;
  }

  .footer__logo {
    height: 9.2rem;

    align-self: center;
  }

  .footer__heading {
    font-size: 2.4rem;
    color: var(--color-grey-light-1);

    font-weight: 500;

    letter-spacing: 0.2rem;
  }

  .footer__icons-list {
    grid-area: 2 / 1 / 3 / 2;

    display: grid;

    align-items: center;
  }

  .footer__list {
    list-style: none;

    display: grid;

    gap: 1.6rem 3.2rem;
  }

  .footer__item {
    font-size: 1.4rem;

    letter-spacing: 0.1rem;
  }

  .footer__contacts {
    display: grid;
    /* gap: 1.2rem; */

    grid-template-columns: max-content 1fr;

    align-items: center;

    gap: 1.6rem;
  }

  .footer__payments {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1.6rem;
  }

  .footer__contact-logos {
    display: grid;

    grid-template-columns: repeat(2, min-content);

    gap: 1.6rem;

    /* align-items: center; */
  }

  .footer__content {
    display: grid;

    grid-template-rows: min-content max-content;

    gap: 1.6rem;
  }

  .footer__icon {
    font-size: 2.4rem;
  }

  .footer__icon--contact {
    color: var(--color-primary-light-2);
  }

  .footer__icon--payment {
    font-size: 3.2rem;
    color: var(--color-primary-dark-5);
  }

  .footer__copyright {
    align-self: end;
  }
`;

export default FooterLandingStyled;
