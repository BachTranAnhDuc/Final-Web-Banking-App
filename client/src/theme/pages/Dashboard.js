import styled from 'styled-components';

const DashboardStyle = styled.main`
  .section-dashboard {
    background-color: var(--color-grey-light-9);
    /* color: #f3f6f9; */
    min-height: 85vh;
    /* max-width: 160rem; */

    padding: 6.4rem 16rem;

    display: grid;

    gap: 3.2rem;
  }

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

  .dashboard__header {
    min-height: 24rem;
    width: 100%;
    justify-self: start;
    align-self: start;
    display: grid;

    grid-template-columns: repeat(3, 1fr);

    grid-template-rows: max-content;

    justify-items: start;

    gap: 8rem;
  }

  .dashboard__header--container {
    /* justify-self: center; */
    width: 100%;

    border-radius: 8px;
    /* background-color: orange; */
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    height: 22rem;
    /* width: 32rem; */

    position: relative;
  }

  .dashboard__header--container-1 {
    background: linear-gradient(90deg, #84d9d2, #07cdae);
  }

  .dashboard__header--container-2 {
    background: linear-gradient(90deg, #90caf9, #047edf 99%);
  }

  .dashboard__header--container-3 {
    background: linear-gradient(90deg, #ffbf96, #fe7096);
  }

  .dashboard__header--container-context {
    padding: 2rem 4rem;
    height: 100%;

    display: grid;

    align-items: center;

    grid-template-columns: 1fr min-content;
  }

  .dashboard__header--img-design {
    position: absolute;

    top: 0;
    right: 0;

    height: 100%;
  }

  .dashboard__header--icon {
    align-self: start;
    grid-area: 1 / 2 / 3 / 3;

    font-size: 2.4rem;

    color: var(--color-white);
  }

  .dashboard__heading {
    font-size: 2rem;
    font-weight: 400;
    letter-spacing: 0.2rem;
    color: var(--color-white);
  }

  .dashboard__span {
    font-size: 2.4rem;
    font-weight: 500;
    letter-spacing: 0.4rem;
    color: var(--color-white);
  }

  .dashboard__text {
    font-size: 1.6rem;
    letter-spacing: 0.2rem;
    color: var(--color-white);
  }

  .dashboard__something-1 {
    display: grid;

    grid-template-columns: 1.5fr 1fr;

    gap: 5.6rem;
  }
  .dashboard__something-1--v1 {
    /* width: 40rem; */
    height: 35rem;
    background-color: var(--color-white);
    border-radius: 8px;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  }
  .dashboard__something-1--v2 {
    background-color: var(--color-white);
    border-radius: 8px;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  }

  .dashboard__something-2 {
    display: grid;

    justify-items: center;
  }

  .dashboard__something-2--v1 {
    background-color: var(--color-white);
    width: 100%;
    height: 35rem;
  }
`;

export default DashboardStyle;
