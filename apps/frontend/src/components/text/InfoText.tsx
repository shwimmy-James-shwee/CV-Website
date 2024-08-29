import { ReactNode } from 'react';
import styled, { CSSProperties } from 'styled-components';

interface InfoTextProps {
  size?: number; // rem
  fontWeight?: number;
  color?: string;
  style?: CSSProperties;
  'data-testid'?: string;
  className?: string;
  children: ReactNode;
}

const InfoTextComponent = styled.p<{ size?: number; fontWeight?: number; color?: string }>`
  font-size: ${(props) => `${props.size || 0.88}rem`};
  /* font-size: 14px; */
  font-weight: ${(props) => props.fontWeight || 400};
  color: ${(props) => props.color || 'var(--info-text-color, #333)'};
  line-height: 130%;
  margin: 0;
  width: 100%;
`;

export const InfoText = ({
  children,
  size,
  fontWeight,
  style,
  color,
  'data-testid': dataTestId,
  className
}: InfoTextProps) => {
  return (
    <InfoTextComponent
      color={color}
      size={size}
      fontWeight={fontWeight}
      style={style}
      data-testid={dataTestId || 'info-text'}
      className={className}
    >
      {children}
    </InfoTextComponent>
  );
};
