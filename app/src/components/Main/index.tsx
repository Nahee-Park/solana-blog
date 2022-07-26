import React from 'react';
import MainHead from './MainHead';
import styled from '@emotion/styled';

function Main() {
  return (
    <StyledRoot>
      <MainHead />
      메인임
    </StyledRoot>
  );
}

export default Main;

const StyledRoot = styled.main``;
