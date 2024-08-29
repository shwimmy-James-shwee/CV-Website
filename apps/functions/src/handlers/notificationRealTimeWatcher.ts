import { app, InvocationContext, Timer } from '@azure/functions';
import { notificationRunner } from '../services/notificationRunner';

export async function notificationRealTimeWatcher(timer: Timer, context: InvocationContext): Promise<void> {
  await notificationRunner(null, context);
}

app.timer('notificationRealTimeWatcher', {
  schedule: process.env.TIME_TRIGGER || '0 */10 * * * *', // every 10 minutes
  handler: notificationRealTimeWatcher
});
