import { notificationRealTimeWatcher } from '../notificationRealTimeWatcher';
import { InvocationContext, Timer } from '@azure/functions';
import { notificationRunner } from '../../services/notificationRunner';

jest.mock('../shared/notificationRunner', () => ({
  notificationRunner: jest.fn()
}));

describe('notificationRealTimeWatcher', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call notificationRunner with null and context', async () => {
    // Arrange
    const mockTimer = {} as Timer;
    const mockContext = {} as InvocationContext;

    // Act
    await notificationRealTimeWatcher(mockTimer, mockContext);

    // Assert
    expect(notificationRunner).toHaveBeenCalledWith(null, mockContext);
  });
});
