import styled from 'styled-components';

import { ldsRipple, ldsHourglass } from '../animations/animations';

const SpinnerStyled = styled.div`
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;

  & div {
    position: absolute;
    border: 4px solid var(--color-primary);
    opacity: 1;
    border-radius: 50%;
    animation: ${ldsRipple} 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
  }

  & div:nth-child(2) {
    animation-delay: -0.5s;
  }
`;

const LoaderStyled = styled.div`
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;

  &:after {
    content: ' ';
    display: block;
    border-radius: 50%;
    width: 0;
    height: 0;
    margin: 8px;
    box-sizing: border-box;
    border: 32px solid rgb(255, 255, 255);
    border-color: #e660609c transparent #20c996af transparent;
    animation: ${ldsHourglass} 1.2s infinite;
  }
`;

export { SpinnerStyled, LoaderStyled };
