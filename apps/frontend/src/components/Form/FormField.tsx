import { ReactNode } from 'react'
import { Form } from 'react-bootstrap'
import styled from 'styled-components'
import { BodyText } from '../text/BodyText'

interface FormFieldProps {
  fieldLabel?: string
  type: 'textarea' | 'text' | 'select' | 'multiselect' | 'checkbox' | 'radio' | 'switch'
  placeholder?: string
  value?: string
  rows?: number
  required?: boolean
  disabled?: boolean
  readonly?: boolean
  className?: string
  inputClassName?: string
  testId?: string
  fontSize?: string
  children?: ReactNode

  // For multiselect and select
  defaultValue?: string | number | readonly string[] | undefined

  // For checkbox, radio, switch
  defaultChecked?: boolean
  checked?: boolean
  itemLabel?: string

  isInvalid?: boolean
  invalidText?: string

  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const StyledFormControl = styled(Form.Control)`
  border-radius: 6px;
  border: 1px solid var(--form-field-bg);
  background: var(--secondary-form-field-bg);
`

const FormField = ({
  fieldLabel,
  type,
  placeholder,
  rows,
  value = '',
  required = false,
  disabled = false,
  readonly = false,
  className,
  inputClassName,
  testId,
  fontSize = '14px',
  children,
  defaultValue,
  defaultChecked,
  checked,
  itemLabel,
  isInvalid,
  invalidText,
  onChange,
}: FormFieldProps) => {
  // Determine the input type dynamically based on the "type" prop
  const isTextarea = type === 'textarea'
  const isSelect = type === 'select'
  const isMultiselect = type === 'multiselect'
  const isRadio = type === 'radio'
  const isCheckbox = type === 'checkbox'
  const isSwitch = type === 'switch'
  const dataTestId = testId || 'form-field'

  const inputProps = {
    required,
    value,
    defaultValue,
    disabled,
    isInvalid,
    multiple: isMultiselect,
    className: inputClassName,
    id: dataTestId,
    onChange: onChange as React.ChangeEventHandler<HTMLInputElement> | undefined,
    style: { fontSize },
    'data-testid': dataTestId,
  }

  return (
    <Form.Group className={className || 'my-4'}>
      {fieldLabel && (
        <Form.Label htmlFor={dataTestId}>
          <BodyText>
            {fieldLabel}
            {required && <span style={{ color: 'var(--asterisk-color)' }}>*</span>}
          </BodyText>
        </Form.Label>
      )}
      {isSelect || isMultiselect ? (
        <Form.Select
          {...inputProps}
          onChange={onChange as React.ChangeEventHandler<HTMLSelectElement> | undefined}
        >
          {children}
        </Form.Select>
      ) : isRadio || isCheckbox || isSwitch ? (
        <Form.Check
          label={itemLabel}
          checked={checked}
          type={type}
          defaultChecked={defaultChecked}
          {...inputProps}
        />
      ) : (
        <>
          <StyledFormControl
            as={isTextarea ? type : undefined}
            rows={isTextarea ? rows : undefined}
            type={type}
            readOnly={readonly}
            placeholder={placeholder}
            {...inputProps}
          />
        </>
      )}
      <Form.Control.Feedback type='invalid' data-testid='invalid-feedback'>
        {invalidText ||
          (isSelect || isMultiselect || isCheckbox || isRadio
            ? 'Please select a value'
            : 'Please enter a value')}
      </Form.Control.Feedback>
    </Form.Group>
  )
}

export default FormField
