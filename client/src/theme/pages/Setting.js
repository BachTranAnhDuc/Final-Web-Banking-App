import styled from 'styled-components';

const SettingStyled = styled.main`
  .section-setting__container {
    min-height: 100vh;
    padding: 6rem 26rem;

    display: grid;

    grid-template-rows: max-content 1fr;

    /* grid-template-rows: max-content minmax(6rem, 7rem) 1fr; */

    gap: 4.8rem;
  }
  .section-setting {
    /* margin-top: 2.4rem; */

    /* min-height: 20rem; */
  }

  .setting-header {
    background-color: var(--color-white);
    border-radius: 8px;
    padding: 2rem 4rem;

    height: 30rem;

    box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px,
      rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;

    display: grid;

    grid-template-columns: min-content 1fr;
  }

  .setting-header__context {
    padding: 1.6rem 3.2rem;
    grid-area: 1 / 2 / 2 / 3;

    display: grid;

    grid-template-rows: max-content 1fr;

    gap: 1.6rem;
  }

  .setting-header__roles {
    display: grid;
    grid-template-columns: min-content 1fr;

    gap: 1.2rem;

    /* align-items: center; */
  }

  .setting-header__roles--text {
    font-size: 1.6rem;
    font-weight: 300;
    letter-spacing: 0.1rem;
  }

  .setting-header__roles--icon {
    font-size: 2rem;

    color: var(--color-primary-light-1);
  }

  .setting__heading {
    font-size: 2.4rem;
    letter-spacing: 0.2rem;
    font-weight: 400;
  }

  .setting-nav {
    grid-area: 2 / 1 / 3 / 3;
    align-self: end;
    justify-self: start;

    display: grid;

    /* grid-template-columns: repeat(5, 1fr); */
    grid-template-columns: repeat(6, max-content);

    gap: 3.2rem;
  }

  .setting-header__avt {
    height: 12rem;

    justify-self: center;
    align-self: center;
  }

  .setting-nav__link:link,
  .setting-nav__link:visited {
    text-decoration: none;
    font-size: 1.6rem;

    color: var(--color-grey-light-1);
  }

  .setting-nav__link--active {
    color: var(--color-primary-dark-6);
    font-weight: 500;
    font-size: 1.8rem;

    transform: translateY(-0.1rem);
  }

  /* SETTING ALL */
  .setting-all {
    /* padding: 2rem 4rem; */

    display: grid;
  }

  .setting-form {
    padding: 3.2rem 6rem;

    /* height: 100%; */

    height: 60rem;

    background-color: var(--color-white);
    border-radius: 8px;

    box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px,
      rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;

    display: grid;

    align-items: center;

    grid-template-rows: max-content 1fr;

    row-gap: 4.8rem;
  }

  .setting-form__heading {
    font-size: 2rem;
    font-weight: 400;
  }

  .form-control__setting {
    display: grid;
    padding: 0rem 4rem;
    grid-template-columns: 1fr 2fr 5rem;
    /* gap: 1.6rem; */

    align-items: center;
  }

  .setting-form__input {
    padding: 1.6rem 3.2rem;

    outline: none;
    border: none;

    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;

    background-color: var(--color-primary-light-9);

    /* border-radius: 8px; */

    letter-spacing: 0.2rem;
  }

  .setting-form__label {
    color: var(--color-primary-dark-9);
    font-size: 1.8rem;
    font-weight: 400;
    letter-spacing: 0.2rem;
  }

  .setting-heading__content {
    border-bottom: 2px solid var(--color-grey-light-9);
    padding: 4rem 4rem;
    display: grid;

    grid-template-columns: 1fr max-content;
  }

  .setting-heading__text {
  }

  .setting-heading__text--small {
    font-size: 1.4rem;
    font-weight: 300;
    letter-spacing: 0.2rem;
  }

  .setting-heading__buttons {
    display: grid;

    grid-template-columns: repeat(2, max-content);

    gap: 1.6rem;
  }

  .setting__border--bottom {
    border-bottom: 2px solid var(--color-grey-light-9);
  }

  .setting__icon-container {
    background: radial-gradient(
      circle,
      rgba(32, 201, 151, 1) 0%,
      rgba(166, 233, 213, 1) 100%
    );
    height: 100%;
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;

    display: grid;

    justify-items: center;
    align-items: center;
  }

  .setting__icon {
    font-size: 2rem;

    color: var(--color-white);

    position: relative;
  }

  /* Setting account */
  .section-setting__account {
    background-color: var(--color-white);
    border-radius: 8px;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px,
      rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;

    display: grid;
    grid-template-rows: max-content 1fr;

    gap: 3.2rem;
  }

  .setting-account__context-header {
    border-bottom: 2px solid var(--color-grey-light-9);
    padding: 2rem 4rem;
    display: grid;

    grid-template-columns: 1fr max-content;

    align-items: center;
    justify-items: start;
  }

  .setting-account__heading {
    font-size: 2.4rem;
    font-size: 500;
    letter-spacing: 0.3rem;
  }

  .setting-account__context-body {
    height: 40rem;
    padding: 3.2rem 4rem;
    /* padding: 1.6rem 4rem 6.4rem 4rem; */
    display: grid;

    grid-template-rows: repeat(4, max-content);

    row-gap: 4.8rem;
  }

  .setting-account__context--control {
    display: grid;

    /* grid-template-columns: 8rem max-content 1fr; */

    grid-template-columns: 2.5fr 4fr 1fr;

    align-items: center;

    column-gap: 1.6rem;
  }

  .setting-account__context--label {
    font-size: 2rem;
    font-weight: 400;
    letter-spacing: 0.2rem;
  }

  .setting-account__context--text {
    font-size: 1.8rem;
    font-weight: 300;
    letter-spacing: 0.2rem;
  }

  .setting-account__icon {
    font-size: 2rem;

    color: var(--color-primary-light-1);
  }

  /* SETTING UPLOAD IMAGE */
  .section-setting__upload {
    display: grid;

    background-color: var(--color-white);
    border-radius: 8px;
    padding: 2rem 4rem;

    /* height: 30rem; */

    box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px,
      rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
    /* grid-template-columns: repeat(2, 1fr); */
  }

  .setting-upload__container-img {
    justify-self: center;
    align-self: start;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }

  .setting-upload__image-front {
    /* background-color: orange; */
    display: grid;
    justify-items: end;
    align-items: start;

    /* border-right: 2px solid var(--color-primary-dark-8); */
  }

  .setting-upload__image-back {
    /* background-color: #0d503c; */
  }

  .upload-cccd__img {
    width: 30rem;
  }

  /* DEPOSIT SETTING */
  .setting-deposit {
    background-color: var(--color-white);
    border-radius: 8px;
    padding: 2rem 4rem;

    /* height: 30rem; */

    box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px,
      rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;

    display: grid;

    grid-template-columns: min-content 1fr;

    gap: 4rem;
  }

  .deposit__container-img {
    display: grid;
  }

  .deposit__img {
    height: 35rem;

    transform: translateY(-4rem);
  }

  .deposit__context {
  }

  .deposit__context--item {
    /* background-color: orange; */
    display: grid;

    align-items: center;

    gap: 3.2rem;

    grid-template-columns: max-content 1fr;
  }

  .deposit__label {
    font-size: 2.4rem;
    font-weight: 500;
    letter-spacing: 0.2rem;
  }

  .deposit__label--heading {
  }

  .deposit__text {
    font-size: 2rem;
    font-weight: 300;
    letter-spacing: 0.3rem;
  }

  /* SETTING PASSWORD */
  .section-setting__password {
    background-color: var(--color-white);
    border-radius: 8px;

    /* height: 30rem; */

    box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px,
      rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
    display: grid;

    grid-template-rows: max-content 1fr;

    gap: 6rem;
  }

  .setting-password__heading {
    padding: 2rem 4rem;
    border-bottom: 2px solid var(--color-grey-light-9);
    display: grid;

    grid-template-columns: 1fr max-content;
    grid-template-rows: max-content 1fr;

    align-items: center;
  }

  .setting-password__heading-text {
    font-size: 2rem;
    font-weight: 400;
    letter-spacing: 0.2rem;
  }

  .setting-password__group-btns {
    display: grid;

    grid-template-columns: repeat(2, max-content);

    gap: 2.4rem;
  }

  .setting-password__form {
    position: relative;
    height: 30rem;
    padding: 2rem 4rem;
    margin-top: 2rem;

    display: grid;

    gap: 2.4rem 0;

    /* display: grid;

    grid-template-rows: repeat(2, max-content);

    gap: 3.6rem; */
  }

  .setting-password__form-controls {
    display: grid;

    grid-template-columns: 1fr 1.25fr 5rem;

    align-items: center;

    /* gap: 2rem; */
  }

  .setting-password__form-controls--first {
    grid-template-columns: 1fr 1.25fr 5rem;
  }

  .setting-password__form-label {
    font-size: 1.8rem;
    font-weight: 300;
    letter-spacing: 0.2rem;
  }

  .setting-password__form-input {
    border: none;
    outline: none;

    border-bottom-left-radius: 8px;
    border-top-left-radius: 8px;

    background-color: var(--color-primary-light-9);

    padding: 1.6rem 3.2rem;
    border-radius: 4px;
  }

  .setting-password__btn-next {
    /* justify-self: end; */

    position: absolute;
    bottom: 0;
    right: 2.4rem;

    border: none;
    background-color: inherit;
  }

  .setting-password__icon {
    font-size: 2.4rem;
  }

  /* SETTING SECURITY */
  .section-setting__security {
    background-color: var(--color-white);
    border-radius: 8px;
    padding: 2rem 4rem;

    /* height: 30rem; */

    box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px,
      rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
  }
`;

export default SettingStyled;
