import { InvocationContext } from '@azure/functions';
import { emailWatcher } from '../emailWatcher';
import * as sgMail from '@sendgrid/mail';
import { encrypt } from '../../services/helperFunctions';

jest.mock('@sendgrid/mail', () => ({
  send: jest.fn().mockResolvedValue([{ statusCode: 200 }]),
  setApiKey: jest.fn()
}));

describe('emailWatcher', () => {
  const cryptoKey = 'test';
  process.env.AZURE_KEY_VAULT_NAME = cryptoKey;

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should send an email and log the status', async () => {
    const email = {
      id: '123',
      sentTo: ['test@example.com'],
      header: 'Test Email',
      content: 'This is a test email'
    };
    const context = {
      log: jest.fn(),
      error: jest.fn()
    } as unknown as InvocationContext;

    await emailWatcher(
      { ...email, header: encrypt(cryptoKey, email.header), content: encrypt(cryptoKey, email.content) },
      context
    );

    expect(sgMail.send).toHaveBeenCalledWith({
      to: email.sentTo,
      from: 'no-reply@kpmgservices.co.nz',
      subject: email.header,
      text: email.content,
      html: email.content
    });
    expect(context.log).toHaveBeenCalledWith(`email ${email.id} to ${email.sentTo} status = 200`);
    expect(context.error).not.toHaveBeenCalled();
  });

  it('should handle errors when sending an email', async () => {
    const email = {
      id: '123',
      sentTo: ['test@example.com'],
      header: 'Test Email',
      content: 'This is a test email'
    };
    const context = {
      log: jest.fn(),
      error: jest.fn()
    } as unknown as InvocationContext;

    // Mocking a rejected promise to simulate an error
    (sgMail.send as jest.Mock).mockRejectedValue(new Error('Send email failed'));

    await expect(
      emailWatcher(
        { ...email, header: encrypt(cryptoKey, email.header), content: encrypt(cryptoKey, email.content) },
        context
      )
    ).rejects.toThrow('Send email failed');

    expect(sgMail.send).toHaveBeenCalledWith({
      to: email.sentTo,
      from: 'no-reply@kpmgservices.co.nz',
      subject: email.header,
      text: email.content,
      html: email.content
    });
    expect(context.log).toHaveBeenCalledWith(`ERROR: email ${email.id} to ${email.sentTo} status = 0`);
    expect(context.error).toHaveBeenCalledWith(new Error('Send email failed'));
  });

  it('should handle database errors when sending an email', async () => {
    const email = {
      id: '123',
      sentTo: ['test@example.com'],
      header: 'Test Email',
      content: 'This is a test email'
    };
    const context = {
      log: jest.fn(),
      error: jest.fn()
    } as unknown as InvocationContext;

    // Mocking a successful email send with status code 202
    (sgMail.send as jest.Mock).mockResolvedValue([{ statusCode: 202 }]);

    await emailWatcher(
      { ...email, header: encrypt(cryptoKey, email.header), content: encrypt(cryptoKey, email.content) },
      context
    );

    expect(sgMail.send).toHaveBeenCalledWith({
      to: email.sentTo,
      from: 'no-reply@kpmgservices.co.nz',
      subject: email.header,
      text: email.content,
      html: email.content
    });
    expect(context.log).toHaveBeenCalledWith(`email ${email.id} to ${email.sentTo} status = 202`);
    expect(context.error).not.toHaveBeenCalled();
  });
});
