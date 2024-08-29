import { InvocationContext } from '@azure/functions';
import { notificationRunner } from '../notificationRunner';

describe('notificationRunner', () => {
  const mockContext = {
    log: jest.fn()
  } as unknown as InvocationContext;
  it('should log the notification processing', async () => {
    await notificationRunner(null, mockContext);

    expect(mockContext.log).toHaveBeenCalledWith('RealTime notification as been processed');
  });

  it('should log the notification processing with custom run frequency', async () => {
    const runFrequency = 'Hourly';

    await notificationRunner(runFrequency, mockContext);

    expect(mockContext.log).toHaveBeenCalledWith('Hourly notification as been processed');
  });
});
