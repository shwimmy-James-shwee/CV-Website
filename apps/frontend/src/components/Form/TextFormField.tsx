import { Form } from 'react-bootstrap';
import { BodyText } from '../text/BodyText';
import styled from 'styled-components';
// import styled from 'styled-components'

interface TextFormFieldProps {
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  className?: string;
  'data-testid'?: string;
  isInvalid?: boolean;
  invalidText?: string;
  value?: string;
  // height?: string
  // width?: string
  defaultValue?: string | number | readonly string[] | undefined;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  fontWeight?: number;
  color?: string;
  type?: string;

  // For textarea type
  rows?: number;
  textarea?: boolean;
}

// const StyledFormControl = styled(Form.Control)`
//   border-radius: 6px;
//   border: 1px solid var(--form-field-bg);
//   padding: 0.4rem 0.8rem;
//   font-size: 1rem;
//   background: var(--secondary-form-field-bg) !important;
//   transition:
//     border-color 0.15s ease-in-out,
//     box-shadow 0.15s ease-in-out;

//   &:focus-visible {
//     border-color: var(--form-field-focus-border-color);
//     outline: 0;
//     box-shadow: 0 0 0 0.25rem rgba(var(--form-field-shadow-rgb), 0.25);
//   }
// `

const FormGroup = styled(Form.Group)``;
const TextFormField = ({
  label,
  textarea,
  className,
  invalidText,
  fontWeight,
  isInvalid,
  color,
  ...props
}: TextFormFieldProps) => {
  const id = props['data-testid'] || 'text-form-field';

  return (
    <FormGroup className={className}>
      {label && (
        <Form.Label htmlFor={id}>
          <BodyText fontWeight={fontWeight} color={color}>
            {label}
            {props.required && <span style={{ color: 'var(--asterisk-color)' }}>*</span>}
          </BodyText>
        </Form.Label>
      )}

      <Form.Control
        as={textarea ? 'textarea' : undefined}
        isInvalid={isInvalid}
        id={id}
        className={'w-100 ' || className}
        {...props}
      />

      <Form.Control.Feedback type='invalid' data-testid='invalid-feedback'>
        {invalidText || 'Please enter a value'}
      </Form.Control.Feedback>
    </FormGroup>
  );
};

export default TextFormField;
