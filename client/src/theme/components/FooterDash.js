import styled from 'styled-components';

const FooterDashStyled = styled.section`
  /* FOOTER DASH */
  .footer-dash {
    padding: 4rem 16rem;
    background-color: var(--color-grey-light-9);
  }

  .footer-dash__content {
    border-top: 1px solid var(--color-grey-light-7);
    background-color: var(--color-grey-light-9);
    /* background-color: orange; */
    display: grid;
    min-height: 6rem;

    align-items: center;

    grid-template-columns: 1fr max-content;
  }

  .footer-dash__copyright {
    font-size: 1.4rem;
    letter-spacing: 0.1rem;
  }
`;

export default FooterDashStyled;
