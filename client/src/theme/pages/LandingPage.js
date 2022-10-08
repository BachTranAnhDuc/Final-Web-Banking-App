import styled from 'styled-components';

const LandingPage = styled.main`
  .header {
    /* background-color: var(--color-tertiary-light-2); */
    padding: 0 16rem;
    height: 85vh;
    display: grid;

    grid-template-columns: 1fr 1fr;

    align-items: center;

    gap: 4.8rem 0;
    /* grid-template-rows: repeat(2, min-content); */
  }

  .header__heading {
    align-self: end;
    /* margin-top: 3.2rem; */
  }

  .header__text {
    font-size: 1.4rem;
    line-height: 1.8;
    grid-row: 2 / 3;

    align-self: start;

    color: var(--color-grey-light-2);
  }

  .heading__highlight {
    position: relative;

    font-size: 4rem;
    color: var(--color-white);
    /* padding: 0.8rem 0; */
    margin: 0 0.8rem;
  }

  .heading__highlight::after {
    content: '';

    display: block;
    position: absolute;
    top: 0;
    left: 0;

    height: 100%;
    width: 100%;

    background-color: var(--color-primary-dark-1);

    z-index: -1;

    padding: 0.8rem;

    background: var(--background-gradient-1);

    transform: scale(1.1) skewX(-15deg);
  }

  .header__image {
    /* grid-column: 2 / 3;
  grid-row: 1 / 3; */

    justify-self: center;
    /* align-self: center; */

    grid-area: 1 / 2 / 4 / 3;

    height: 40rem;
  }

  .header__buttons {
    align-self: start;

    transform: translateY(-6.2rem);

    display: grid;

    grid-template-columns: repeat(2, max-content);

    gap: 0 3.2rem;
  }

  /* SECTION FEATURES */
  .section-features {
    padding: 6.2rem 16rem;
    /* max-width: 100rem; */
  }

  .features__images {
    display: grid;

    grid-template-columns: repeat(3, 1fr);

    justify-content: center;
    justify-items: center;
    align-items: center;
  }

  .features__image {
    width: 12rem;

    filter: brightness(0);
    opacity: 50%;
  }
`;

export default LandingPage;
