import styled from 'styled-components';

const NavLanding = styled.section`
  .nav-bar {
    /* background-color: var(--color-secondary-light-2); */
    /* width: 100vw; */
    height: 15vh;
    padding: 2rem 12rem;
    display: grid;

    grid-template-columns: min-content 1fr max-content;

    gap: 12rem;

    align-items: center;
  }

  .nav-logo {
    height: 8rem;

    transition: all 0.3s;
  }

  .nav-logo:hover {
    transform: scale(1.05);
  }

  .nav-list {
    list-style-type: none;
    display: grid;

    align-items: center;

    grid-template-columns: repeat(2, max-content);

    gap: 4rem;
  }

  .nav-list__item {
  }

  .nav-link:link,
  .nav-link:visited {
    text-decoration: none;
    font-size: 1.6rem;
    font-weight: 600;
    text-transform: uppercase;

    color: var(--color-grey-light-2);

    position: relative;
  }

  .nav-link::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 4px;
    border-radius: 4px;
    background-color: var(--color-primary);
    top: 2rem;
    left: 0;
    transform-origin: right;
    transform: scaleX(0);
    transition: transform 0.3s ease-in-out;
  }

  .nav-link:hover::before {
    transform-origin: left;
    transform: scaleX(1);
  }

  .nav-link__active {
    border-bottom: 2px solid var(--color-primary-dark-5);
    color: var(--color-primary-dark-2);
  }

  /* NAVBAR DASHBOARD */

  .container__dashboard {
    /* min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center; */

    position: relative;
  }

  .nav-dash {
    /* border-bottom: 0.5px solid var(--color-grey-light-9); */
    /* background-color: #1f1e2e; */
    height: 15vh;
    padding: 0rem 12rem;
    display: grid;

    grid-template-columns: 1fr max-content;

    grid-template-rows: 1fr;

    /* column-gap: 12rem; */

    align-items: center;
  }

  .nav-dash__left-side {
    display: grid;

    grid-template-columns: min-content 1fr;
    gap: 12rem;
  }

  .nav-dash__right-side {
    display: grid;

    grid-template-columns: min-content 1fr;
  }

  .nav-dash__logo {
    /* height: 16rem; */
    width: 12rem;
    /* height: 100%; */

    transition: all 0.3s;

    /* align-self: start; */
  }

  .nav-dash__logo:hover {
    transform: scale(1.05);
  }

  .nav-dash__list {
    list-style-type: none;
    display: grid;

    align-items: center;

    grid-template-columns: repeat(3, max-content);

    gap: 4rem;
  }

  .nav-dash__list-item {
  }

  .nav__menu {
    /* background-color: orange; */
  }

  .nav__menu--img {
    height: 4rem;
  }

  .nav__menu--item {
    display: grid;

    grid-template-columns: max-content 1fr;
    gap: 0.8rem;
  }
`;

export default NavLanding;
