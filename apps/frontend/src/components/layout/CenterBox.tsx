import React from 'react';
import styled from 'styled-components';

interface CenterBoxProps {
  maxWidth?: string;
  className?: string;
  'data-testid'?: string;
  children?: React.ReactNode;
}
const CenterBoxDiv = styled.div<{ $maxWidth?: string }>`
  max-width: ${(props) => props.$maxWidth || '100%'};
  overflow: visible;
`;

function CenterBox({ className, maxWidth, 'data-testid': dataTestId = 'center-box', children }: CenterBoxProps) {
  return (
    <CenterBoxDiv $maxWidth={maxWidth} className={`my-auto mx-auto ${className ?? ''}`} data-testid={dataTestId}>
      {children}
    </CenterBoxDiv>
  );
}

export default CenterBox;
