import { ReactNode } from 'react'
import styled, { CSSProperties } from 'styled-components'

interface BodyTextProps {
  size?: number // rem
  fontWeight?: number
  color?: string
  style?: CSSProperties
  'data-testid'?: string
  className?: string
  onClick?: () => void
  children: ReactNode
}

const BodyTextComponent = styled.p<{ size?: number; fontWeight?: number; color?: string }>`
  font-size: ${(props) => `${props.size || 0.9}rem`};
  font-weight: ${(props) => props.fontWeight || 400};
  color: ${(props) => props.color || 'var(--body-text-color, #333)'};
  line-height: 130%;
  margin: 0;
  width: 100%;
`

export const BodyText = ({
  children,
  size,
  fontWeight,
  style,
  color,
  'data-testid': dataTestId,
  className,
  ...props
}: BodyTextProps) => {
  return (
    <BodyTextComponent
      color={color}
      size={size}
      fontWeight={fontWeight}
      style={style}
      className={className}
      data-testid={dataTestId || 'body-text'}
      onClick={props.onClick}
    >
      {children}
    </BodyTextComponent>
  )
}
