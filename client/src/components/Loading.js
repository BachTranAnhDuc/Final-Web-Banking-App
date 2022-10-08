import React from 'react';

import { SpinnerStyled } from '../theme/components/Spinner';

const Loading = () => {
  return (
    <div className="container__loading">
      <SpinnerStyled>
        <div></div>
        <div></div>
      </SpinnerStyled>
    </div>
  );
};

export default Loading;
