import { expect, test, describe, vi, afterEach } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import ContactPage from '../ContactPage';

const ToRender = () => {
  return <ContactPage />;
};

describe('Test ContactPage', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });
  test('ContactPage should have all elements', async () => {
    render(ToRender());
    expect(screen.getByTestId('header')).toBeDefined();
    expect(screen.getByTestId('contact-form')).toBeDefined();

    expect(screen.getByTestId('send-button')).toBeDefined();

    expect(screen.getByTestId('first-name-field')).toBeDefined();
    expect(screen.getByTestId('last-name-field')).toBeDefined();
    expect(screen.getByTestId('email-address-field')).toBeDefined();
    expect(screen.getByTestId('inquiry-field')).toBeDefined();
  });

  test('ContactPage should submit the form with valid data', () => {
    render(ToRender());

    // Fill in the form fields
    fireEvent.change(screen.getByTestId('first-name-field'), { target: { value: 'John' } });
    fireEvent.change(screen.getByTestId('last-name-field'), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByTestId('email-address-field'), {
      target: { value: 'john.doe@example.com' },
    });
    fireEvent.change(screen.getByTestId('inquiry-field'), { target: { value: 'Test inquiry' } });

    // Submit the form

    fireEvent.click(screen.getByTestId('send-button'));

    // Assert that all fields are empty
    const firstNameField = screen.getByTestId('first-name-field') as HTMLInputElement;
    const lastNameField = screen.getByTestId('last-name-field') as HTMLInputElement;
    const emailAddressField = screen.getByTestId('email-address-field') as HTMLInputElement;
    const inquiryField = screen.getByTestId('inquiry-field') as HTMLInputElement;

    expect(firstNameField.value).toBe('');
    expect(lastNameField.value).toBe('');
    expect(emailAddressField.value).toBe('');
    expect(inquiryField.value).toBe('');
  });

  test('ContactPage should not submit the form with invalid data', () => {
    render(ToRender());

    // Submit the form

    fireEvent.click(screen.getByTestId('send-button'));

    const feedbacks = screen.getAllByTestId('invalid-feedback');
    expect(feedbacks).toHaveLength(4);
  });
});
