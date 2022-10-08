import styled from 'styled-components';

const AboutPage = styled.main`
  .section-about {
    height: 85vh;
    padding: 8rem 16rem;

    display: grid;

    grid-template-columns: repeat(2, 1fr);

    align-items: center;

    gap: 0 3.2rem;
  }

  .about-image {
    width: 50rem;

    /* grid-column: 2 / 3; */
    grid-area: 1 / 2 / 4 / 3;
  }

  .about-heading {
    align-self: center;
  }

  .about-team {
    /* justify-self: end; */
    display: flex;

    /* gap: 1.2rem; */
  }

  /* .about-avatar {
  border-radius: 50%;
  border: 3px solid orange;
  width: 4.8rem;
} */

  .about-team img {
    border-radius: 50%;
    border: 3px solid var(--color-primary);
    width: 4.8rem;
    margin-right: -1.6rem;
  }
`;

export default AboutPage;
