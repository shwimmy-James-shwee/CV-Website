import { app, InvocationContext } from '@azure/functions';
import sgMail from '@sendgrid/mail';
import { decrypt } from '../services/helperFunctions';
import { queueEmail } from '../services/azureStorageQueue';

export async function emailWatcher(email: queueEmail, context: InvocationContext): Promise<void> {
  const cryptoKey = process.env.AZURE_KEY_VAULT_NAME;
  sgMail.setApiKey(process.env.SENDGRID_KEY);

  let sgResponseCode = 0;
  const mail: sgMail.MailDataRequired = {
    to: email['sentTo'], // recipient/s
    from: 'no-reply@kpmgservices.co.nz', // verified sender
    subject: decrypt(cryptoKey, email['header']),
    text: decrypt(cryptoKey, email['content']),
    html: decrypt(cryptoKey, email['content']),
  };
  try {
    const response = await sgMail.send(mail);
    sgResponseCode = response[0].statusCode;
    context.log(`email ${email['id']} to ${email['sentTo']} status = ${response[0].statusCode}`);
    // TODO update email object status if there is any
  } catch (error) {
    // if the sg was able to send email, then not to retry sending again incase of spamming user
    if (sgResponseCode !== 202) {
      context.log(`ERROR: email ${email['id']} to ${email['sentTo']} status = ${sgResponseCode}`);
      context.error(error);
      throw Error(error);
    } else {
      // capture error of the above TODO where emails are sent but other action failed
      // context.log(`ERROR: email ${email["id"]} to ${email["sentTo"]} status = ${sgResponseCode}, other errors`);
      // context.log(error);
    }
  }
}

app.storageQueue('emailWatcher', {
  queueName: process.env.EMAIL_QUEUE_NAME || 'tpl-queue',
  connection: 'AzureWebJobsStorage',
  handler: emailWatcher,
});
