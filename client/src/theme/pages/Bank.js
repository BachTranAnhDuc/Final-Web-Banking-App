import styled from 'styled-components';

const BankStyled = styled.main`
  .dashboard__content-text {
    display: grid;

    grid-template-columns: min-content max-content;

    align-items: center;

    gap: 2rem;
  }

  .dashboard__content-text--containericon {
    background: radial-gradient(
      circle,
      rgba(32, 201, 151, 1) 0%,
      rgba(166, 233, 213, 1) 100%
    );

    box-shadow: rgba(0, 0, 0, 0.07) 0px 1px 1px, rgba(0, 0, 0, 0.07) 0px 2px 2px,
      rgba(0, 0, 0, 0.07) 0px 4px 4px, rgba(0, 0, 0, 0.07) 0px 8px 8px,
      rgba(0, 0, 0, 0.07) 0px 16px 16px;

    border-radius: 4px;
    height: 4rem;
    width: 4rem;

    display: grid;

    justify-items: center;
    align-items: center;

    /* padding: 0.8remm; */
  }

  .dashboard__content-text--icon {
    margin: 0.8rem;

    color: var(--color-white);
  }

  .dashboard__content-text--heading {
    font-size: 2rem;
    font-weight: 500;
    letter-spacing: 0.2rem;
  }

  .section-bank {
    background-color: var(--color-grey-light-9);

    min-height: 85vh;

    padding: 8rem 12rem;

    display: grid;

    align-items: start;

    grid-template-rows: max-content 1fr;

    gap: 1.6rem 0;
  }

  .bank-body {
    min-height: 62rem;
    /* background-color: #047edf; */

    display: grid;

    grid-template-columns: 1fr 1.5fr;
  }

  .bank-body__nav-container {
    /* background-color: #07cdae; */

    padding: 4rem 6.4rem;
    display: grid;
  }

  .bank-body__nav {
    /* background-color: var(--color-fourth); */
    background-color: var(--color-white);
    border-radius: 8px;

    position: relative;

    display: grid;
    grid-template-rows: repeat(2, 1fr);

    box-shadow: rgba(136, 165, 191, 0.48) 6px 2px 16px 0px,
      rgba(255, 255, 255, 0.8) -6px -2px 16px 0px;
  }

  .bg-background__bank-nav {
    background-color: #388078;
    /* background: radial-gradient(
    circle,
    rgba(56, 128, 120, 1) 0%,
    rgba(194, 237, 194, 1) 100%
  ); */
  }

  .bank-body__nav-top {
    display: grid;

    border-radius: 8px;
  }

  .bank-body__nav-bottom {
    border-radius: 8px;
    /* background-color: #f6f6f2; */
    /* background-color: #badfe7; */
  }

  .bank-body__nav-center {
    border-radius: 8px;
    /* padding: 2rem 2.4rem; */
    justify-self: center;
    position: absolute;

    top: 50%;
    /* left: 50%; */

    height: 28rem;
    width: 80%;

    transform: translate(0, -35%);

    /* background-color: #f6f6f2; */
    background-color: #c2edc2;
    /* background-color: #badfe7; */

    display: grid;
    justify-items: center;
    /* z-index: -1; */

    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  }

  .bank-body__nav-center--container {
    /* background-color: #047edf; */
    height: 100%;
    width: 100%;

    display: grid;

    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
  }

  .bank-body__nav--context {
    /* background-color: orange; */
    align-self: center;

    display: grid;

    grid-template-rows: repeat(2, max-content);

    justify-items: center;

    transform: translateY(-50%);
  }

  .bank-body__content {
  }

  .bank-body__nav--heading {
    font-size: 2rem;
    font-weight: 400;
    letter-spacing: 0.2rem;
    color: #f6f6f2;
  }

  .bank-body__nav--span {
    color: #f6f6f2;

    font-size: 2.8rem;
    font-weight: 500;
    letter-spacing: 0.2rem;
  }

  .bank-body__nav-center--container-item {
    padding: 1.6rem;
    display: grid;

    grid-template-rows: min-content 1fr;

    align-items: center;

    justify-items: center;

    /* gap: 1.2rem; */
  }

  .bank-body__nav-center--container-1 {
    border-bottom: 1px solid var(--color-white);
    border-right: 1px solid var(--color-white);
  }
  .bank-body__nav-center--container-2 {
  }
  .bank-body__nav-center--container-3 {
  }
  .bank-body__nav-center--container-4 {
    border-top: 1px solid var(--color-white);
    border-left: 1px solid var(--color-white);
  }

  .bank-body__nav-center--icons-container {
  }

  .bank-body__nav-center--icon {
    font-size: 2.4rem;
  }

  .bankbody__nav-center--heading {
    font-size: 2.4rem;
    font-weight: 500;
    letter-spacing: 0.2rem;
  }

  .bank-body__content {
    padding: 4rem 2rem;
  }

  .bank-body__content--container {
    border-radius: 8px;
    background-color: var(--color-fifth);

    height: 100%;
  }

  .bankbody__link:link,
  .bankbody__link:visited {
    text-decoration: none;
  }
  .bankbody__link {
    color: var(--color-grey);
  }

  .bankbody__link--active {
    color: #e27d60;
  }
  .bankbody__link--active:link,
  .bankbody__link:visited {
    text-decoration: none;
  }

  /* BANK TRANSFER */
  .bank-body__transfer {
    border-radius: 8px;
    background-color: var(--color-white);

    height: 100%;
  }

  /* BANK RECHARGE */
  .bank-body__recharge {
    border-radius: 8px;
    background-color: var(--color-white);

    box-shadow: rgba(136, 165, 191, 0.48) 6px 2px 16px 0px,
      rgba(255, 255, 255, 0.8) -6px -2px 16px 0px;

    height: 100%;

    display: grid;

    grid-template-rows: 14rem 1fr;

    /* gap: 1.6rem; */
  }

  .recharge-header {
    /* background-color: #07cdae; */

    /* background-color: #cee5d0; */
    /* background-color: #54bab9; */
    background: linear-gradient(
      90deg,
      rgba(56, 128, 120, 1) 0%,
      rgba(194, 237, 194, 1) 100%
    );

    border-top-left-radius: 8px;
    border-top-right-radius: 8px;

    /* border-bottom: 2px solid var(--color-white); */

    padding: 1.6rem 4.8rem;

    display: grid;

    align-items: center;
  }

  .recharge-header__heading--primary {
    font-size: 2.4rem;
    font-weight: 500;
    letter-spacing: 0.3rem;
    color: #f6f6f2;
  }

  .recharge-body {
    display: grid;

    grid-template-columns: 1fr 2fr;
  }

  .recharge-body__left {
    /* background-color: #94b49f; */
    /* background-color: #9ed2c6; */
    /* background: linear-gradient(
    180deg,
    rgba(56, 128, 120, 1) 0%,
    rgba(194, 237, 194, 1) 100%
  ); */

    padding: 1.6rem 3.2rem;
  }

  .recharge-body__right {
    padding: 1.6rem 3.2rem;
    /* background-color: #fcf8e8; */
    /* background-color: #f7ecde; */
    /* background: radial-gradient(
    circle,
    rgba(186, 223, 231, 1) 0%,
    rgba(166, 233, 213, 1) 100%
  ); */

    display: grid;

    justify-items: center;
    align-items: start;

    grid-template-rows: max-content 1fr;
  }

  .recharge-body__right--header {
    justify-self: end;
  }
  .recharge-form {
    padding: 1.2rem 2.4rem;
    height: 100%;

    width: 100%;
    display: grid;

    grid-template-rows: 1fr max-content;

    gap: 1.6rem 0;

    justify-items: start;
    align-items: center;
  }

  .recharge-form__control {
  }
  .recharge-form__control--2 {
    display: grid;

    grid-template-rows: max-content, 1fr;

    gap: 0.4rem;
  }

  .recharge-form__label {
    font-size: 1.4rem;
    font-weight: 300;
    letter-spacing: 0.2rem;
  }
  .recharge-form__label--second {
  }

  .recharge-form__input {
    border: none;
    outline: none;

    background-color: var(--color-primary-light-9);
    background-color: #badfe7;

    padding: 1.6rem 3.2rem;

    font-size: 1.6rem;
    letter-spacing: 0.2rem;
    font-weight: 300;
  }

  .recharge-form__input--2 {
  }

  .recharge-form__otp {
  }

  .recharge-suggestion {
    justify-self: end;
    display: grid;

    grid-template-columns: repeat(3, max-content);

    gap: 1.2rem;
  }

  .recharge-suggestion__item {
    background-color: #badfe7;
    color: var(--color-grey-light-2);
    padding: 0.4rem 0.8rem;

    border: none;
    outline: none;

    border-radius: 8px;

    font-size: 1.2rem;
    font-weight: 300;
    letter-spacing: 0.1rem;

    cursor: pointer;
  }

  .recharge__group-btns {
    justify-self: end;

    display: grid;

    grid-template-columns: repeat(2, max-content);

    gap: 1.6rem;
  }

  .recharge__btn {
    background: radial-gradient(
      circle,
      rgba(186, 223, 231, 1) 0%,
      rgba(56, 128, 120, 1) 100%
    );
    color: var(--color-white);

    border: none;
    outline: none;

    border-radius: 8px;

    padding: 0.8rem 1.6rem;

    font-size: 1.2rem;
    font-weight: 400;
    letter-spacing: 0.2rem;

    cursor: pointer;
  }

  .recharge-1 {
    align-self: center;
  }
  /* BANK WITHDRAW */
  .bank-body__withdraw {
    border-radius: 8px;
    background-color: var(--color-white);

    box-shadow: rgba(136, 165, 191, 0.48) 6px 2px 16px 0px,
      rgba(255, 255, 255, 0.8) -6px -2px 16px 0px;

    height: 100%;

    display: grid;

    grid-template-rows: 14rem 1fr;

    /* gap: 1.6rem; */
  }

  .withdraw-header {
    /* background-color: #07cdae; */

    /* background-color: #cee5d0; */
    /* background-color: #54bab9; */
    background: linear-gradient(
      90deg,
      rgba(56, 128, 120, 1) 0%,
      rgba(194, 237, 194, 1) 100%
    );

    border-top-left-radius: 8px;
    border-top-right-radius: 8px;

    /* border-bottom: 2px solid var(--color-white); */

    padding: 1.6rem 4.8rem;

    display: grid;

    align-items: center;
  }

  .withdraw-header__heading--primary {
    font-size: 2.4rem;
    font-weight: 500;
    letter-spacing: 0.3rem;
    color: #f6f6f2;
  }

  .withdraw-body {
    display: grid;

    grid-template-columns: 1fr 2fr;
  }

  .withdraw-body__left {
    /* background-color: #94b49f; */
    /* background-color: #9ed2c6; */
    /* background: linear-gradient(
    180deg,
    rgba(56, 128, 120, 1) 0%,
    rgba(194, 237, 194, 1) 100%
  ); */

    padding: 1.6rem 3.2rem;
  }

  .withdraw-body__right {
    padding: 1.6rem 3.2rem;
    /* background-color: #fcf8e8; */
    /* background-color: #f7ecde; */
    /* background: radial-gradient(
    circle,
    rgba(186, 223, 231, 1) 0%,
    rgba(166, 233, 213, 1) 100%
  ); */

    display: grid;

    justify-items: center;
    align-items: start;

    grid-template-rows: max-content 1fr;
  }

  .withdraw-body__right--header {
    /* width: 100%; */
    justify-self: end;
    display: grid;
    /* grid-template-columns: max-content 1fr; */
  }

  .withdraw-header__span {
    font-weight: 300;
    font-size: 1.4rem;
    letter-spacing: 0.2rem;

    color: var(--color-grey-light-2);
  }

  .withdraw-form {
    height: 100%;
    width: 100%;
    display: grid;

    grid-template-rows: 1fr max-content;

    gap: 1.6rem 0;

    justify-items: start;
    align-items: center;
  }

  .withdraw-form__control {
  }
  .withdraw-form__control--2 {
    display: grid;

    grid-template-rows: max-content, 1fr;

    gap: 0.4rem;
  }

  .withdraw-form__label {
    font-size: 1.4rem;
    font-weight: 300;
    letter-spacing: 0.2rem;
  }
  .withdraw-form__label--second {
  }

  .withdraw-form__input {
    border: none;
    outline: none;

    background-color: var(--color-primary-light-9);
    background-color: #badfe7;

    padding: 1.6rem 3.2rem;

    font-size: 1.6rem;
    letter-spacing: 0.2rem;
    font-weight: 300;
  }

  .withdraw-form__input--2 {
  }

  .withdraw-form__otp {
  }

  .withdraw-suggestion {
    justify-self: end;
    display: grid;

    grid-template-columns: repeat(3, max-content);

    gap: 1.2rem;
  }

  .withdraw-suggestion__item {
    background-color: #badfe7;
    color: var(--color-grey-light-2);
    padding: 0.4rem 0.8rem;

    border: none;
    outline: none;

    border-radius: 8px;

    font-size: 1.2rem;
    font-weight: 300;
    letter-spacing: 0.1rem;

    cursor: pointer;
  }

  .withdraw__group-btns {
    justify-self: end;

    display: grid;

    grid-template-columns: repeat(2, max-content);

    gap: 1.6rem;
  }

  .withdraw__btn {
    background: radial-gradient(
      circle,
      rgba(186, 223, 231, 1) 0%,
      rgba(56, 128, 120, 1) 100%
    );
    color: var(--color-white);

    border: none;
    outline: none;

    border-radius: 8px;

    padding: 0.8rem 1.6rem;

    font-size: 1.2rem;
    font-weight: 400;
    letter-spacing: 0.2rem;

    cursor: pointer;
  }

  .withdraw-1 {
    align-self: center;
  }

  .withdraw-notes {
    justify-self: end;
  }

  .withdraw-note {
    outline: none;
    border: none;

    border-radius: 8px;

    background-color: rgba(194, 237, 194, 0.25);

    padding: 1.6rem 3.2rem;

    /* font-size: 1.4rem; */
    font-weight: 300;
    letter-spacing: 0.2rem;
  }

  /* BANK TRANSFER */

  .bank-body__transfer {
    border-radius: 8px;
    background-color: var(--color-white);

    box-shadow: rgba(136, 165, 191, 0.48) 6px 2px 16px 0px,
      rgba(255, 255, 255, 0.8) -6px -2px 16px 0px;

    height: 100%;

    display: grid;

    grid-template-rows: 14rem 1fr;

    /* gap: 1.6rem; */
  }

  .transfer-header {
    /* background-color: #07cdae; */

    /* background-color: #cee5d0; */
    /* background-color: #54bab9; */
    background: linear-gradient(
      90deg,
      rgba(56, 128, 120, 1) 0%,
      rgba(194, 237, 194, 1) 100%
    );

    border-top-left-radius: 8px;
    border-top-right-radius: 8px;

    /* border-bottom: 2px solid var(--color-white); */

    padding: 1.6rem 4.8rem;

    display: grid;

    align-items: center;
  }

  .transfer-header__heading--primary {
    font-size: 2.4rem;
    font-weight: 500;
    letter-spacing: 0.3rem;
    color: #f6f6f2;
  }

  .transfer-body {
    display: grid;

    grid-template-columns: 1fr 2fr;
  }

  .transfer-body__left {
    /* background-color: #94b49f; */
    /* background-color: #9ed2c6; */
    /* background: linear-gradient(
    180deg,
    rgba(56, 128, 120, 1) 0%,
    rgba(194, 237, 194, 1) 100%
  ); */

    padding: 1.6rem 3.2rem;
  }

  .transfer-body__right {
    padding: 1.6rem 3.2rem;
    /* background-color: #fcf8e8; */
    /* background-color: #f7ecde; */
    /* background: radial-gradient(
    circle,
    rgba(186, 223, 231, 1) 0%,
    rgba(166, 233, 213, 1) 100%
  ); */

    display: grid;

    justify-items: end;
    align-items: start;

    grid-template-rows: max-content 1fr;

    gap: 1.6rem 0;
  }

  .transfer-body__right--body {
    width: 100%;
    height: 100%;
    padding: 1.6rem 3.2rem;
  }

  .transfer-form {
    height: 100%;

    display: grid;

    grid-template-rows: 1fr max-content;
    /* width: 80%; */
    /* display: grid; */

    /* gap: 2.4rem 0; */
    /* 
    justify-items: start;
    align-items: center; */
  }

  .transfer-form__control {
  }
  .transfer-form__control--2 {
    display: grid;

    grid-template-rows: max-content, 1fr;

    gap: 0.4rem;
  }

  .transfer-form__label {
    font-size: 1.4rem;
    font-weight: 300;
    letter-spacing: 0.2rem;
  }
  .transfer-form__label--second {
  }

  .transfer-form__input {
    border: none;
    outline: none;

    background-color: var(--color-primary-light-9);
    background-color: #badfe7;

    padding: 1.6rem 3.2rem;

    font-size: 1.6rem;
    letter-spacing: 0.2rem;
    font-weight: 300;
  }

  .transfer-form__input--2 {
  }

  .transfer-form__otp {
  }

  .transfer-suggestion {
    justify-self: end;
    display: grid;

    grid-template-columns: repeat(3, max-content);

    gap: 1.2rem;
  }

  .transfer-suggestion__item {
    background-color: #badfe7;
    color: var(--color-grey-light-2);
    padding: 0.4rem 0.8rem;

    border: none;
    outline: none;

    border-radius: 8px;

    font-size: 1.2rem;
    font-weight: 300;
    letter-spacing: 0.1rem;

    cursor: pointer;
  }

  .transfer__group-btns {
    justify-self: end;

    display: grid;

    grid-template-columns: repeat(2, max-content);

    gap: 1.6rem;
  }

  .transfer__btn {
    background: radial-gradient(
      circle,
      rgba(186, 223, 231, 1) 0%,
      rgba(56, 128, 120, 1) 100%
    );
    color: var(--color-white);

    border: none;
    outline: none;

    border-radius: 8px;

    padding: 0.8rem 1.6rem;

    font-size: 1.2rem;
    font-weight: 400;
    letter-spacing: 0.2rem;

    cursor: pointer;
  }

  .transfer-1 {
    align-self: center;
  }

  .transfer-2 {
    margin-top: 3.2rem;
    align-self: start;
  }

  .transfer-notes {
    justify-self: end;
  }

  .transfer-note {
    outline: none;
    border: none;

    border-radius: 8px;

    background-color: rgba(194, 237, 194, 0.25);

    padding: 1.6rem 3.2rem;

    /* font-size: 1.4rem; */
    font-weight: 300;
    letter-spacing: 0.2rem;
  }

  .transfer-information__header {
    display: grid;

    align-items: start;
  }
  .transfer-information__heading {
  }

  .transfer-information__body {
    /* margin-top: 1.6rem; */
    width: 100%;
    display: grid;

    grid-template-rows: repeat(4, max-content);

    gap: 2.8rem 0;

    align-items: center;
  }

  .transfer-information__control {
    display: grid;

    grid-template-columns: min-content 1fr 2fr;

    align-items: center;

    gap: 1.2rem;
  }

  .transfer-information__heading {
  }

  .transfer-information__text {
  }

  .transfer-information__radios {
    justify-self: start;
    display: grid;

    grid-template-columns: repeat(2, 1fr);
  }
  /* BUY CARD */
  .bank-body__buy-card {
    border-radius: 8px;
    background-color: var(--color-white);

    box-shadow: rgba(136, 165, 191, 0.48) 6px 2px 16px 0px,
      rgba(255, 255, 255, 0.8) -6px -2px 16px 0px;

    height: 100%;

    display: grid;

    grid-template-rows: 14rem 1fr;
  }

  .buy-card__header {
    background: linear-gradient(
      90deg,
      rgba(56, 128, 120, 1) 0%,
      rgba(194, 237, 194, 1) 100%
    );

    border-top-left-radius: 8px;
    border-top-right-radius: 8px;

    /* border-bottom: 2px solid var(--color-white); */

    padding: 1.6rem 4.8rem;

    display: grid;

    align-items: center;
  }

  .buy-card__header--heading {
    font-size: 2.4rem;
    font-weight: 500;
    letter-spacing: 0.2rem;
    color: var(--color-white);
    text-transform: uppercase;
  }

  .buy-card__body {
    display: grid;

    /* grid-template-rows: max-content 1fr; */
  }

  .buy-card__form {
    padding: 1.6rem 3.2rem;
    display: grid;

    grid-template-rows: 1fr max-content;
  }

  .buy-card__body--top {
    padding: 3.2rem 4.8rem;
    height: 8rem;
  }

  .buy-card__body--bottom {
    padding: 3.2rem 4.8rem;
    display: grid;

    justify-items: center;
  }

  .buy-card__list {
    display: grid;

    grid-template-columns: repeat(3, 1fr);

    gap: 2.4rem;
  }

  .buy-card__item-card {
    padding: 1.6rem 3.2rem;
    /* background-color: #07cdae; */

    border-radius: 8px;

    border: none;
    outline: none;

    font-size: 1.6rem;
    font-weight: 600;
    letter-spacing: 0.2rem;
    text-transform: uppercase;

    color: var(--color-white);

    transition: all 0.3s;
    cursor: pointer;
  }

  .buy-card__item-card--viettel {
    background-color: var(--color-primary);
  }
  .buy-card__item-card--mobile {
    background-color: var(--color-fourth);
  }
  .buy-card__item-card--vinaphone {
    background-color: var(--color-fifth);
  }

  .buy-card__item-card--viettel-active {
    border: 2px solid var(--color-primary-dark-4);
    transform: translateY(-4px);
  }
  .buy-card__item-card--mobile-active {
    border: 2px solid var(--color-primary-dark-4);
    transform: translateY(-4px);
  }
  .buy-card__item-card--vinaphone-active {
    border: 2px solid var(--color-primary-dark-4);
    transform: translateY(-4px);
  }

  .buy-card__list--items {
    align-self: center;
    display: grid;

    grid-template-columns: repeat(2, max-content);
    grid-template-rows: repeat(2, min-content);

    gap: 1.6rem;
  }

  .buy-card__item-value {
    background-color: #047edf;

    border: none;
    outline: none;

    padding: 1.2rem 2.4rem;

    border-radius: 8px;

    font-size: 1.4rem;
    font-weight: 400;
    letter-spacing: 0.2rem;

    color: var(--color-white);

    transition: all 0.2s;
    cursor: pointer;
  }

  .buy-card__item--viettel {
    background-color: var(--color-primary);
  }
  .buy-card__item--mobile {
    background-color: var(--color-fourth);
  }
  .buy-card__item--vinaphone {
    background-color: var(--color-fifth);
  }

  .buy-card__item--viettel-active {
    border: 2px solid var(--color-primary-dark-5);
    transform: translateY(-4px);
  }
  .buy-card__item--mobile-active {
    border: 2px solid #036cc1;
    transform: translateY(-4px);
  }
  .buy-card__item--vinaphone-active {
    border: 2px solid #e66060;
    transform: translateY(-4px);
  }

  .buy-card__item-value--choose {
    border: 2px solid var(--color-primary-dark-5);

    transform: scale(1.1);
  }

  .buy-card__item-number {
    width: 100%;
    display: grid;

    grid-template-columns: 1fr 1.5fr;
    gap: 0 1.6rem;
  }

  .buy-card__item-number--left {
    /* background-color: #13795b; */

    display: grid;

    grid-template-columns: 1fr repeat(3, max-content);

    align-items: center;

    gap: 1.2rem;
  }
  .buy-card__item-number--right {
    /* background-color: orange; */

    display: grid;

    align-items: center;

    gap: 1.2rem;
  }

  .buy-card__item--span {
    font-weight: 400;
    font-size: 1.6rem;
    letter-spacing: 0.2rem;
  }
  .buy-card__item--text {
    justify-self: start;

    font-weight: 400;
    font-size: 1.6rem;
    letter-spacing: 0.2rem;
  }

  .btn__buy-card--action {
    border: none;
    outline: none;

    background-color: inherit;

    /* padding: 0.8rem; */

    /* background-color: #047edf; */

    cursor: pointer;
  }

  .buy-card__icon {
    font-size: 2.4rem;
  }

  .buy-card__group-btns {
    justify-self: end;

    display: grid;

    grid-template-columns: repeat(2, max-content);

    gap: 1.6rem;
  }

  .buy-card__btn {
    background: radial-gradient(
      circle,
      rgba(186, 223, 231, 1) 0%,
      rgba(56, 128, 120, 1) 100%
    );
    color: var(--color-white);

    border: none;
    outline: none;

    border-radius: 8px;

    padding: 0.8rem 1.6rem;

    font-size: 1.2rem;
    font-weight: 400;
    letter-spacing: 0.2rem;

    cursor: pointer;
  }

  .buy-card__shop--body-infor {
    height: 24rem;
    padding: 3.2rem 4.8rem;

    display: grid;

    grid-template-rows: max-content 1fr;

    gap: 4.2rem 0;
  }

  .buy-card__shop--header {
    display: grid;

    justify-self: end;
  }

  .buy-card__shop--heading {
    font-size: 1.4rem;
    font-weight: 300;
    letter-spacing: 0.2rem;
  }

  .buy-card__shop--body {
    display: grid;
  }

  .buy-card__shop--body__content--left {
    display: grid;

    justify-items: center;
  }

  .buy-card__shop--body__content--img {
    height: 8rem;
  }

  .buy-card__shop--body__content {
    display: grid;

    grid-template-columns: 1fr 1.5fr;

    align-items: center;
  }

  .buy-card__shop--body__content--right {
    display: grid;

    /* grid-template-columns: repeat(3, 1fr); */
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);

    /* justify-items: center; */

    gap: 1.2rem 0;
  }

  .buy-card__shop--body__content-control {
    display: grid;

    grid-template-rows: repeat(2, max-content);
  }

  .buy-card__shop--body__content-heading {
    font-size: 2rem;
    font-weight: 500;
    letter-spacing: 0.2rem;
  }

  .buy-card__shop--body__content-span {
    font-size: 1.6rem;
    font-weight: 300;
    letter-spacing: 0.2rem;
  }

  .buy-card__shop--footer {
    padding: 3.2rem 4.8rem;
    display: grid;

    justify-items: end;
    align-items: end;
  }

  .buy-card__shop--footer-btns {
    display: grid;

    grid-template-columns: repeat(2, max-content);

    gap: 1.6rem;
  }

  .buy-card__shop--footer-btn {
    background: radial-gradient(
      circle,
      rgba(186, 223, 231, 1) 0%,
      rgba(56, 128, 120, 1) 100%
    );
    color: var(--color-white);

    border: none;
    outline: none;

    border-radius: 8px;

    padding: 0.8rem 1.6rem;

    font-size: 1.2rem;
    font-weight: 400;
    letter-spacing: 0.2rem;

    cursor: pointer;
  }

  .buy-card__result {
    padding: 3.2rem 4.8rem;

    display: grid;

    grid-template-rows: max-content 1fr;
  }

  .buy-card__result--header {
    display: grid;

    justify-items: end;
  }

  .buy-card__result--header__heading {
    font-size: 1.4rem;
    font-weight: 300;
    letter-spacing: 0.2rem;
  }

  .buy-card__result--body {
    display: grid;

    grid-template-columns: 1fr 1.5fr;

    align-items: center;

    gap: 2rem;
  }

  .buy-card__result--body-left {
    display: grid;
  }

  .buy-card__result--body-right {
  }

  .buy-card__result--body-left__img {
    justify-self: center;
    height: 16rem;
  }

  .buy-card__result--body-right__control {
  }

  .buy-card__result--body-right__heading {
    font-size: 2rem;
    font-weight: 500;
    letter-spacing: 0.2rem;
  }

  .buy-card__result--body-right__span {
    font-size: 1.6rem;
    font-weight: 300;
    letter-spacing: 0.2rem;
  }

  .buy-card__result--footer {
    padding: 3.2rem 4.8rem;
    display: grid;

    justify-items: end;
    align-items: end;
  }

  .buy-card__result--footer-btns {
    display: grid;

    grid-template-columns: repeat(2, max-content);

    gap: 1.6rem;
  }

  .buy-card__result--footer-btn {
    background: radial-gradient(
      circle,
      rgba(186, 223, 231, 1) 0%,
      rgba(56, 128, 120, 1) 100%
    );
    color: var(--color-white);

    border: none;
    outline: none;

    border-radius: 8px;

    padding: 0.8rem 1.6rem;

    font-size: 1.2rem;
    font-weight: 400;
    letter-spacing: 0.2rem;

    cursor: pointer;
  }
`;

export default BankStyled;
