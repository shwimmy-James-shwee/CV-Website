import { ReactNode } from 'react'
import { Form } from 'react-bootstrap'
// import styled from 'styled-components'
import { BodyText } from '../text/BodyText'

interface SelectFormFieldProps {
  label?: string
  multiple?: boolean
  required?: boolean
  disabled?: boolean
  className?: string
  'data-testid'?: string
  children?: ReactNode
  isInvalid?: boolean
  invalidText?: string
  value?: string | number | readonly string[] | undefined
  defaultValue?: string | number | readonly string[] | undefined
  onChange?: React.ChangeEventHandler<HTMLSelectElement> | undefined
  fontWeight?: number
  color?: string
}

// const StyledFormSelect = styled(Form.Select)`
//   border-radius: 6px;
//   border: 1px solid var(--form-field-bg);
//   background-color: var(--secondary-form-field-bg);
// `

const SelectFormField = ({
  label,
  required,
  children,
  invalidText,
  className,
  ...props
}: SelectFormFieldProps) => {
  const id = props['data-testid'] || 'select-form-field'

  return (
    <Form.Group className={className || 'py-3'}>
      {label && (
        <Form.Label htmlFor={id}>
          <BodyText fontWeight={props.fontWeight} color={props.color}>
            {label}
            {required && <span style={{ color: 'var(--asterisk-color)' }}>*</span>}
          </BodyText>
        </Form.Label>
      )}

      {/* <StyledFormSelect id={id} {...props}>
        {children}
      </StyledFormSelect> */}

      <Form.Select id={id} {...props}>
        {children}
      </Form.Select>

      <Form.Control.Feedback type='invalid' data-testid='invalid-feedback'>
        {invalidText || 'Please select a value'}
      </Form.Control.Feedback>
    </Form.Group>
  )
}

export default SelectFormField
