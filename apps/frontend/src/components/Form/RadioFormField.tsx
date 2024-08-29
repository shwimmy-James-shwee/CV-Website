import { Form } from 'react-bootstrap'
import { BodyText } from '../text/BodyText'

interface RadioFormFieldProps {
  fieldLabel?: string
  label?: string
  required?: boolean
  disabled?: boolean
  height?: string
  width?: string
  className?: string
  'data-testid'?: string
  defaultChecked?: boolean
  checked?: boolean
  onChange?: React.ChangeEventHandler<HTMLInputElement>

  // To group radio fields together
  name?: string
}

const RadioFormField = ({ required, className, fieldLabel, ...props }: RadioFormFieldProps) => {
  const id = props['data-testid'] || 'radio-form-field'

  return (
    <Form.Group className={className || 'py-3'}>
      {fieldLabel && (
        <Form.Label htmlFor={id}>
          <BodyText>
            {fieldLabel}
            {required && <span style={{ color: 'var(--asterisk-color)' }}>*</span>}
          </BodyText>
        </Form.Label>
      )}

      <Form.Check type='radio' id={id} {...props} />
    </Form.Group>
  )
}

export default RadioFormField
