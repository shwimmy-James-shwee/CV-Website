import React from 'react';
import styled from 'styled-components';

interface GradienFullPageProps {
  className?: string;
  'data-testid'?: string;
  children?: React.ReactNode;
}
const GradienFullPageDiv = styled.div`
  background: var(--Gradient-1, linear-gradient(178deg, #7213ea 1.23%, #1e49e2 100%));
  width: 100v;
  min-height: 100vh;
  height: 100vh;
  overflow: hidden;
`;

function GradienFullPage({
  className,
  'data-testid': dataTestId = 'gradient-full-page',
  children
}: GradienFullPageProps) {
  return (
    <GradienFullPageDiv className={`my-auto mx-auto ${className ?? ''}`} data-testid={dataTestId}>
      {children}
    </GradienFullPageDiv>
  );
}

export default GradienFullPage;
