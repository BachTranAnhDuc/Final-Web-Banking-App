import styled from 'styled-components';

const NewRegisterStyled = styled.main`
  .section__new-register {
    min-height: 100vh;
    background-color: var(--color-grey-light-9);

    display: grid;

    justify-items: center;
    align-items: center;
  }

  .new-register {
    border-radius: 8px;
    width: 92rem;
    min-height: 64vh;

    background-color: orange;

    display: grid;

    grid-template-columns: 1fr 1fr;
  }

  .new-register__left {
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
    padding: 4rem 6.4rem;
    background-color: var(--color-white);

    display: grid;

    grid-template-rows: max-content min-content 1fr;

    gap: 4rem 0;
  }

  .new-register__right {
    background: linear-gradient(135deg, #20c997 0%, #90e4cb 100%);
    padding: 4rem 6.4rem;

    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;

    display: grid;

    grid-template-rows: repeat(3, max-content);

    align-content: center;

    row-gap: 2rem;

    justify-items: center;
  }

  .new-register__right--header {
    display: grid;

    grid-template-columns: max-content 1fr;

    align-items: center;
  }

  .new-register__right--header-icons {
    justify-self: end;
    display: grid;

    grid-template-columns: repeat(2, min-content);

    gap: 0 1.6rem;
  }

  .new-register__icon-container {
    border-radius: 50%;
    background-color: var(--color-primary-light-3);
    padding: 0.8rem;

    width: 3.6rem;
    height: 3.6rem;

    display: grid;

    justify-items: center;
    align-items: center;
  }

  .new-register__icon {
    font-size: 2rem;
    color: var(--color-white);
  }

  .new-register__right--body {
    display: grid;

    /* align-items: center; */
  }

  .new-register__form {
    display: grid;

    grid-template-rows: 1fr max-content;

    align-items: center;

    /* background-color: orange; */
  }

  .new-register__right--result {
    /* background-color: orange; */

    padding-top: 3.2rem;
    display: grid;

    grid-template-rows: repeat(2, max-content);

    row-gap: 1.2rem;
  }

  .new-register__right--result-heading {
  }

  .new-register__right--result-text {
  }
`;

export default NewRegisterStyled;
