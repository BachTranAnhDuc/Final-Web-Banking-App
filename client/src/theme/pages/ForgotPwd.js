import styled from 'styled-components';

const ForgotPwdStyle = styled.main`
  .section-forgot {
    min-height: 100vh;

    display: grid;

    grid-template-columns: 1.5fr 3fr;
  }

  .forgot-left {
    background-color: var(--color-white);

    display: grid;

    justify-items: center;
    align-items: center;
  }

  .forgot-right {
    background-color: #44c97d;

    display: grid;

    justify-items: center;
    align-items: center;
  }

  .forgot-right__content {
    /* background-color: orange; */
    width: 36rem;
    height: 44rem;

    /* background-color: var(--color-fifth); */

    /* padding: 1.6rem 3.2rem; */

    display: grid;

    grid-template-rows: min-content max-content 4rem 1fr;

    gap: 1.2rem;
  }

  .forgot-right__content--logo {
    margin-bottom: 3.2rem;
  }

  .forgot-right__content--heading {
    font-size: 2.4rem;
    font-weight: 700;
    letter-spacing: 0.1rem;
    color: var(--color-white);
  }

  .forgot-right__content--text {
    font-size: 1.4rem;
    font-weight: 300;
    letter-spacing: 0.1rem;
    color: var(--color-white);
  }

  .forgot-right__form {
    height: 100%;
    background-color: inherit;
    padding: 3.2rem 0;
    display: grid;
    /* display: grid;

    grid-template-rows: 1fr max-content;

    gap: 1.6rem 0; */
  }

  .forgot-left__content--page2 {
    width: 50rem;

    display: grid;

    grid-template-rows: min-content repeat(2, max-content);

    gap: 3.2rem 0;
  }

  .forgot-input__otp {
  }

  .forgot-left__content {
    /* background-color: orange; */

    padding: 3.2rem 8rem;

    display: grid;

    grid-template-rows: repeat(2, max-content) min-content;

    gap: 3.2rem 0;
  }

  .forgot-left__content--heading {
    font-size: 2.4rem;
    font-weight: 700;
    letter-spacing: 0.1rem;
    line-height: 1.3;
  }

  .forgot-left__content--text {
  }

  .forgot-left__content--img {
    width: 100%;
    max-width: 30rem;
  }
`;

export default ForgotPwdStyle;
