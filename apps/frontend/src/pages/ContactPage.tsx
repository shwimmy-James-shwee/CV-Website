import { Form, Button } from 'react-bootstrap';
import { Header } from '../components/banners/Header';

import styled from 'styled-components';
import { useState } from 'react';
import TextFormField from '../components/Form/TextFormField';

const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledForm = styled(Form)`
  width: 50%;
  margin-top: 20px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
  margin-bottom: 20px;
`;

function ContactPage() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [inquiry, setInquiry] = useState('');
  const [validated, setValidated] = useState(false);
  const handleSubmit = (event: {
    currentTarget: HTMLFormElement;
    preventDefault: () => void;
    stopPropagation: () => void;
  }) => {
    const form = event.currentTarget;
    // invalidation check
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();
      setFirstName('');
      setLastName('');
      setEmailAddress('');
      setInquiry('');
    }

    setValidated(true);
  };

  return (
    <>
      <Header title='Contact' description='Send us an inquiry' />
      <StyledContainer>
        <StyledForm
          onSubmit={handleSubmit}
          noValidate
          validated={validated}
          onChange={() => {
            setValidated(false);
          }}
          data-testid='contact-form'
        >
          <TextFormField
            data-testid='first-name-field'
            type='text'
            label='First Name'
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <TextFormField
            data-testid='last-name-field'
            type='text'
            label='Last Name'
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
          <TextFormField
            data-testid='email-address-field'
            label='Email Address'
            value={emailAddress}
            onChange={(e) => setEmailAddress(e.target.value)}
            required
          />
          <TextFormField
            data-testid='inquiry-field'
            type='textarea'
            label='Inquiry'
            value={inquiry}
            onChange={(e) => setInquiry(e.target.value)}
            required
            rows={4}
          />

          <ButtonContainer>
            <Button type='submit' data-testid='send-button'>
              Send
            </Button>
          </ButtonContainer>
        </StyledForm>
      </StyledContainer>
    </>
  );
}
export default ContactPage;
