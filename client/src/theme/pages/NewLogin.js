import styled from 'styled-components';

const NewLoginStyled = styled.main`
  .section__new-login {
    min-height: 100vh;
    background-color: var(--color-grey-light-9);

    display: grid;

    justify-items: center;
    align-items: center;
  }

  .new-login {
    border-radius: 8px;
    width: 92rem;
    height: 50rem;

    background-color: orange;

    display: grid;

    grid-template-columns: 1fr 1fr;
  }

  .new-login__left {
    background: linear-gradient(135deg, #20c997 0%, #90e4cb 100%);
    padding: 4rem 6.4rem;

    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;

    display: grid;

    grid-template-rows: repeat(3, max-content);

    align-content: center;

    row-gap: 2rem;

    justify-items: center;
  }

  .new-login__right {
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
    padding: 4rem 6.4rem;
    background-color: var(--color-white);

    display: grid;

    grid-template-rows: max-content 1fr;

    gap: 1.6rem 0;
  }

  .new-login__form--alert-container {
    /* background-color: orange; */

    min-height: 4rem;
    align-self: end;
  }

  .new-login__right--header {
    display: grid;

    grid-template-columns: max-content 1fr;

    align-items: center;
  }

  .new-login__right--header-icons {
    justify-self: end;
    display: grid;

    grid-template-columns: repeat(2, min-content);

    gap: 0 1.6rem;
  }

  .new-login__icon-container {
    border-radius: 50%;
    background-color: var(--color-primary-light-3);
    padding: 0.8rem;

    width: 3.6rem;
    height: 3.6rem;

    display: grid;

    justify-items: center;
    align-items: center;
  }

  .new-login__icon {
    font-size: 2rem;
    color: var(--color-white);
  }

  .new-login__right--body {
    align-self: center;
    display: grid;

    grid-template-rows: repeat(5, max-content);
    transform: translateY(1.2rem);
  }

  .new-login__form {
    display: grid;

    grid-template-rows: repeat(3, max-content);

    gap: 2rem 0;
  }
`;

export default NewLoginStyled;
