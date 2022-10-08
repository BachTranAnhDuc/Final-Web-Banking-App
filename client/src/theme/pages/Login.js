import styled from 'styled-components';

const LoginStyled = styled.main`
  .form-control {
    display: grid;

    grid-template-columns: 1fr 2fr;
    grid-template-rows: min-content 1fr;

    align-items: center;
  }

  .form-control__register {
    display: grid;

    grid-template-columns: 1fr 2fr;
    grid-template-rows: min-content max-content;

    align-items: center;

    gap: 1.2rem 0;
  }

  .form-control__image {
    display: grid;

    grid-template-columns: 1fr 2fr 1fr;

    align-items: center;
  }

  .form-control__image img {
    justify-self: end;
    width: 4.8rem;
  }

  .form-buttons {
    justify-self: end;
    align-self: start;
    display: grid;

    grid-template-columns: repeat(2, min-content);
    gap: 1.6rem;
  }

  .form-label {
    font-size: 1.8rem;
    font-weight: 400;

    color: var(--color-primary-dark-6);
  }

  .form-label__register {
    grid-row: 1 / 3;
    align-self: center;
  }

  .form-input {
    padding: 1.6rem 3.2rem;
    border: none;
    border-radius: 4px;

    font-size: 1.4rem;

    letter-spacing: 0.2rem;

    background-color: var(--color-primary-light-9);
  }

  .form-input__disabled {
    border: 2px solid var(--color-tertiary-dark-3);
  }

  .form-input:focus {
    outline: none;
    /* border: 2px solid black; */
    border: 2px solid var(--color-primary-dark-5);
  }

  .form-input__register {
    grid-column: 2 / 3;
  }

  .form-control__2 {
    display: grid;
    grid-template-rows: repeat(2, 1fr);
  }

  .form-control__pwd {
    /* grid-template-columns: 1fr min-content; */

    /* column-gap: 1.2rem; */

    position: relative;
  }

  .form-label__pwd {
    /* grid-area: 1 / 1 / 2 / 3; */
  }

  .form__error {
    font-size: 1.4rem;
    color: var(--color-tertiary-dark-1);
  }

  .form__success {
    font-size: 1.4rem;
    color: var(--color-primary-light-1);
  }

  .form-input__error {
    border: 2px solid var(--color-tertiary-dark-3);
  }

  .form-input__success {
    border: 2px solid var(--color-primary-light-3);
  }

  .form-input__pwd {
  }

  .btn__pwd {
    position: absolute;

    top: 65%;
    right: 1.2rem;
    /* background-color: var(--color-primary-light-9); */
    background-color: inherit;
    border: none;

    /* transform: translateY(300%); */

    transition: all 0.3s;
    cursor: pointer;
  }

  .icon__pwd {
    font-size: 1.8rem;
    color: var(--color-primary-dark-5);

    /* transform: translateX(-1.6rem); */
  }

  .form__alert {
    position: relative;
    border-radius: 4px;

    padding: 0.8rem 1.2rem;
    justify-self: center;

    display: grid;

    justify-items: center;
  }

  .form__alert--success {
    background-color: var(--color-primary-light-6);
    border-top: 4px solid var(--color-primary-dark-5);
  }

  .form__alert--error {
    background-color: var(--color-tertiary-light-2);
    border-top: 4px solid var(--color-tertiary-dark-5);
  }

  .form__alert--processing {
    background-color: var(--color-secondary-light-4);
    border-top: 4px solid var(--color-secondary-dark-5);
  }

  .form__alert p {
    color: var(--color-white);
  }

  .form__alert button {
    padding: 2px;
    position: absolute;
    top: 0;
    right: 0;

    transform: translate(0, -50%);

    border: none;
    border-radius: 50%;
    background-color: inherit;

    transition: all 0.3s;
    cursor: pointer;
  }

  .form__alert--close {
  }

  .section-login {
    height: 85vh;
    padding: 8rem 16rem;

    display: grid;

    grid-template-columns: repeat(2, 1fr);

    justify-content: center;
    justify-items: center;
  }

  .login__container-image {
  }

  .login__content {
    justify-self: start;

    width: 75%;

    display: grid;

    grid-template-rows: min-content 1fr;
  }

  .login__container-image img {
    height: 47rem;
  }

  .login__form {
    /* margin-top: 2.4rem; */
    align-self: center;
    display: grid;

    gap: 2.4rem;
  }

  .login__heading {
    transform: translateY(-2.8rem);
  }
`;

export default LoginStyled;
