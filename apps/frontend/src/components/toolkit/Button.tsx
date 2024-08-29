import { ReactNode } from 'react'
import { Stack } from 'react-bootstrap'
import styled from 'styled-components'

interface ButtonProps {
  variant?: 'primary' | 'secondary'
  rounded?: boolean
  label?: ReactNode
  style?: React.CSSProperties | undefined
  className?: string
  width?: number
  textColor?: string
  textSize?: string
  textWeight?: number | string
  disabled?: boolean

  // Icon standing in front of the label
  icon?: string

  // For form buttons
  type?: 'button' | 'submit' | 'reset' | undefined

  onClick?: () => void
  'data-testid'?: string
}

const BaseButton = styled.button<{
  width?: number
  height?: number
  fontSize?: number
  $rounded: boolean
}>`
  border-radius: 0.5rem;
  border: 0px;
  padding-right: 1rem;
  padding-left: 1rem;
  width: ${(props) => `${props.width || '100'}%`};
  height: ${(props) => `${props.height || '100'}%`};
  font-size: ${(props) => `${props.fontSize || '1'}rem`};
  height: 2.5rem;
  white-space: nowrap;

  ${(props) => props.$rounded && 'border-radius: 50%;  width: 100px; height: 100px; padding: 0;'}
`

const PrimaryButton = styled(BaseButton)`
  background: var(--primary-button-color);
  box-shadow: 0 0.25rem 0.25rem 0 rgba(var(--primary-button-color), 0.05);
  color: var(--primary-button-text-color);

  &:hover {
    background: var(--primary-button-hover-bg);
  }

  &:active {
    background: var(--primary-button-active-bg);
  }

  &:disabled {
    background: var(--secondary-button-text-color);
  }
`

const SecondaryButton = styled(BaseButton)`
  background: var(--secondary-button-bg);
  color: var(--secondary-button-text-color);
  border: 1px solid var(--secondary-button-border-color);

  &:hover {
    background: var(--secondary-button-hover-bg);
  }

  &:active {
    background: var(--secondary-button-active-bg);
    color: var(--secondary-button-active-text-color);
  }
  &:disabled {
    background: var(--secondary-button-text-color);
    color: var(--primary-button-text-color);
  }
`

const IconButton = styled.button`
  border: 0;
  background: none;
  color: var(--icon-button-color);
`

const ButtonText = styled.span<{
  $textColor?: string
  $textSize?: string
  $textWeight?: string | number
}>`
  width: 100%;
  font-size: ${(props) => props.$textSize ?? 1}rem;
  font-weight: ${(props) => props.$textWeight ?? 600};
  ${(props) => props.$textColor && `color: ${props.$textColor};`}
`

const ButtonComponent = ({
  variant = 'primary',
  label,
  icon,
  type,
  className,
  textColor,
  style = {},
  rounded,
  'data-testid': dataTestId,
  ...props
}: ButtonProps) => {
  const StyledButton = !label ? IconButton : variant === 'primary' ? PrimaryButton : SecondaryButton

  return (
    <StyledButton
      className={className}
      type={type}
      style={style}
      width={props.width}
      $rounded={rounded || false}
      {...props}
      data-testid={dataTestId ?? 'button-component'}
    >
      <Stack direction='horizontal' gap={2} className='text-center'>
        {icon && <span className='material-icons-outlined'>{icon}</span>}
        {label && (
          <ButtonText
            $textColor={textColor}
            $textSize={props.textSize}
            $textWeight={props.textWeight}
          >
            {label}
          </ButtonText>
        )}
      </Stack>
    </StyledButton>
  )
}

export default ButtonComponent
