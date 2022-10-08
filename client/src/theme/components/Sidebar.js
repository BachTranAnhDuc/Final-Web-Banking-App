import styled from 'styled-components';

const SidebarStyled = styled.main`
  .sidebar-header {
    /* display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem; */

    padding: 1.6rem 3.2rem;

    display: grid;

    grid-template-columns: 1fr max-content;

    align-items: center;
  }

  .sidebar-logo {
    height: 8rem;
  }

  .close-btn {
    font-size: 2rem;
    background: transparent;
    border-color: transparent;
    color: var(--color-primary);
    transition: all 0.3s linear;
    cursor: pointer;
    color: var(--color-tertiary);
    /* margin-top: 0.2rem; */
  }
  .close-btn:hover {
    color: var(--color-tertiary-light-1);
  }

  .sidebar-links {
    list-style: none;
    display: grid;

    grid-template-rows: repeat(5, min-content);
    /* align-items: center; */
    padding: 4rem 4.8rem;

    gap: 3.2rem;
  }

  .sidebar-links li {
    padding: 1.2rem 2.4rem;
    display: grid;

    grid-template-columns: min-content 1fr;
    gap: 2.4rem;

    align-items: center;
  }

  .sidebar-links li:hover {
    background-color: var(--color-primary-light-7);
  }

  .sidebar-links a {
    text-decoration: none;
    font-size: 1.8rem;
    text-transform: capitalize;
    color: var(--color-grey);
    transition: all 0.3s linear;
    letter-spacing: 0.1rem;
  }

  .sidebar-links a:hover {
    color: var(--color-primary-dark-5);
  }

  .sidebar-links__icon {
    font-size: 2.8rem;
  }
  /* .links a svg {
  font-size: 1.5rem;
  color: var(--clr-grey-5);
  margin-right: 1rem;
  transition: var(--transition);
} */
  /* .links a:hover svg {
  color: var(--clr-grey-4);
} */
  .sidebar__social-icons {
    margin-bottom: 3.2rem;
    list-style: none;
    justify-self: center;
    display: grid;
  }

  .sidebar__social-icons li {
    display: grid;

    grid-template-columns: min-content 1fr;

    align-items: center;

    gap: 1.6rem;
  }

  .sidebar__social-icons a {
    text-decoration: none;
    font-size: 1.6rem;
    margin: 0 0.5rem;
    color: var(--color-primary-dark-6);
    transition: all 0.3s linear;
  }
  .sidebar__social-icons a:hover {
    color: var(--color-primary-dark-1);
  }

  .sidebar-links__icon:hover {
    color: var(--color-primary-dark-7);
  }

  .sidebar__social-icon {
    font-size: 2.9rem;
    color: var(--color-primary-dark-3);
  }

  .sidebar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: var(--color-white);
    display: grid;
    grid-template-rows: auto 1fr auto;
    row-gap: 3.2rem;
    box-shadow: var(--color-tertiary-dark-1);
    transition: all 0.3s linear;
    transform: translate(-100%);

    z-index: 10;
  }
  .show-sidebar {
    transform: translate(0);
  }
  @media screen and (min-width: 676px) {
    .sidebar {
      width: 400px;
    }
  }
`;

export default SidebarStyled;
