import { Box, Button, FormControl, TextField, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { useState } from 'react';

const ContactFormWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 15px;
  max-width: 700px;
  margin: auto;
  margin-bottom: 50px;
  margin-top: 20px;
  padding: 40px;
  border-radius: 10px;

  background-color: var(--mui-palette-secondary-dark);
  transition: all 0.1s ease-in-out;
  /* box-shadow: inset 0px 0px 40px 30px var(--mui-palette-background-default); */

  &:hover {
    box-shadow: 0px 0px 40px 5px var(--mui-palette-background-paper);
  }
`;

const FormTextInput = styled(TextField)`
  & .MuiInputBase-input:-webkit-autofill,
  & .MuiInputBase-input:-webkit-autofill:hover,
  & .MuiInputBase-input:-webkit-autofill:focus,
  & .MuiInputBase-input:-webkit-autofill:active {
    -webkit-text-fill-color: var(--mui-palette-text-primary);
    -webkit-box-shadow: 0 0 0 30px var(--mui-palette-secondary-light) inset;
    transition: background-color 5000s ease-in-out 0s;
  }
`;

type contactFormDataType = {
  name: string;
  email: string;
  message: string;
  company: string;
};

function ContactMe() {
  const [formData, setFormData] = useState<contactFormDataType>({
    name: '',
    email: '',
    message: '',
    company: '',
  });
  const [emailError, setEmailError] = useState(false);

  const allowSubmission = () => {
    return !(formData.name && formData.email && formData.message && !emailError);
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // str@str.str
    const isValid = !emailRegex.test(email);
    setEmailError(isValid);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === 'email') validateEmail(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // TODO Replace with actual API endpoint
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormData({ name: '', email: '', message: '', company: '' });
      }
    } catch (error) {
      //   console.error('Error submitting form:', error);
    }
  };

  return (
    <ContactFormWrapper onSubmit={handleSubmit}>
      <Typography variant='h6' gutterBottom sx={{ textAlign: 'center' }}>
        If you have any queries or want to get in touch, please fill out the form below. I will get back to you as soon
        as possible.
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2 }}>
        <FormTextInput required label='Name' name='name' value={formData.name} onChange={handleChange} fullWidth />
        <FormTextInput label='Company' name='company' value={formData.company} onChange={handleChange} fullWidth />
      </Box>
      <FormControl>
        {/* wrap email field in its own form control to track focus to avoid pre-emptively displaying errors */}
        <FormTextInput
          required
          label='Email'
          name='email'
          type='email'
          id='contact-me-email'
          value={formData.email}
          onChange={handleChange}
          error={emailError}
          helperText={emailError ? 'Please enter a valid email address' : ''}
        />
      </FormControl>
      <FormTextInput
        required
        fullWidth
        label='Message'
        name='message'
        multiline
        rows={4}
        value={formData.message}
        onChange={handleChange}
      />
      <Button type='submit' variant='contained' color='primary' disabled={allowSubmission()} sx={{ mt: 2 }}>
        Send Message
      </Button>
    </ContactFormWrapper>
  );
}

export default ContactMe;
