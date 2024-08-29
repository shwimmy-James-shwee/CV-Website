import { ReactNode } from 'react'
import styled, { CSSProperties } from 'styled-components'

interface TitleTextProps {
  size?: number // rem
  fontWeight?: 'normal' | 'bold'
  color?: string
  style?: CSSProperties
  'data-testid'?: string
  className?: string
  children: ReactNode
}

const TitleTextComponent = styled.h1<{
  size?: number
  fontWeight?: 'normal' | 'bold'
  color?: string
}>`
  font-size: ${(props) => `${props.size || 1.6}rem`};
  font-weight: ${(props) => props.fontWeight || 'bold'};
  color: ${(props) => props.color || 'var(--body-text-color, #333)'};
  line-height: 117%;
  margin: 0;
  width: 100%;
`

export const TitleText = ({
  children,
  size,
  fontWeight,
  style,
  color,
  'data-testid': dataTestId,
  className,
}: TitleTextProps) => {
  return (
    <TitleTextComponent
      color={color}
      size={size}
      fontWeight={fontWeight}
      style={style}
      data-testid={dataTestId || 'title-text'}
      className={className}
    >
      {children}
    </TitleTextComponent>
  )
}
