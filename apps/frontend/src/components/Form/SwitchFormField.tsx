import { Form } from 'react-bootstrap';
import styled from 'styled-components';
import { BodyText } from '../text/BodyText';

interface SwitchFormFieldProps {
  fieldLabel?: string;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  height?: string;
  className?: string;
  'data-testid'?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

const StyledFormSwitch = styled(Form.Switch)<{ height?: string }>`
  .form-check-input {
    height: 1.5rem;
    width: 3rem;
    margin: auto 0.5rem;
  }
  padding-left: 0;
  height: ${(props) => `${props.height || '100%'}`};
  .form-check-input:checked {
    background-color: var(--switch-checked-background);
    border-color: var(--switch-checked-background);
  }
`;

const SwitchFormField = ({ required, className, fieldLabel, ...props }: SwitchFormFieldProps) => {
  const id = props['data-testid'] || 'switch-form-field';

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

      <StyledFormSwitch height={props.height} id={id} {...props} />
    </Form.Group>
  );
};

export default SwitchFormField;
