import styled from 'styled-components';

const FirstLoginStyled = styled.main`
  .section-firstlogin {
    /* padding: 8rem 16rem; */
    height: 100vh;

    background-color: var(--color-grey-light-9);

    display: grid;

    align-items: center;
    justify-items: center;
  }

  .form__first-login--logo {
    justify-self: center;
    display: grid;

    /* background-color: orange; */

    grid-template-columns: min-content max-content;

    align-items: center;
  }
  .form__first-login--logo img {
    height: 8.6rem;
  }

  .form__first-login--headtertiary {
    font-size: 3.2rem;
    font-style: italic;
    color: var(--color-primary);

    letter-spacing: 0.4rem;
  }

  .form__first-login {
    border-top: 6px solid var(--color-primary-dark-1);
    box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px,
      rgba(0, 0, 0, 0.3) 0px 18px 36px -18px;
    border-radius: 8px;
    padding: 4.8rem 6.4rem;
    background-color: var(--color-white);

    width: 45rem;
    height: 50rem;

    display: grid;

    /* justify-items: center; */

    gap: 1.6rem;
  }

  .form-control__first-login {
    position: relative;
    display: grid;

    gap: 1.2rem;
  }

  .form-control__first-login span {
    position: absolute;

    bottom: -2.4rem;
    left: 0;
  }

  .first-login__span {
    font-size: 1.4rem;
    justify-self: center;

    color: var(--color-secondary-dark-1);

    font-weight: 400;
  }

  .form-label__first-login {
    font-size: 1.6rem;
    font-weight: 400;

    /* color: var(--color-grey-light-1); */
    color: var(--color-primary-dark-7);
  }

  .btn-link__first-login {
    border: none;
    background-color: inherit;
    justify-self: center;

    font-size: 1.6rem;
    color: var(--color-primary-dark-7);
    letter-spacing: 0.2rem;

    transition: all 0.3s;
    cursor: pointer;
  }

  .btn-link__first-login:hover {
    color: var(--color-primary);

    transform: scale(1.1);
  }
`;

export default FirstLoginStyled;
