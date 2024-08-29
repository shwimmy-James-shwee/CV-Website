import { expect, test, describe, vi, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import UserProvider from '../UserContext';
import { mockUseFetchWithMsal, defaultExecute } from '../../tests/utils';

describe('UserProvider', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });
  test('fetches current user data and sets it in the context', async () => {
    mockUseFetchWithMsal();
    await waitFor(async () => {
      render(
        <UserProvider>
          <div>Test Component</div>
        </UserProvider>
      );
    });

    // Wait for the data to be fetched and set in the context
    expect(screen.getByText('Test Component')).toBeDefined();
    expect(defaultExecute).toHaveBeenCalledTimes(1);
  });

  test('fetch branch options', async () => {
    // Mock the useFetchWithMsal hook
    const executeMock = vi.fn(() => {
      return Promise.resolve(null);
    });
    mockUseFetchWithMsal({ error: { someError: true }, execute: executeMock });

    render(
      <UserProvider>
        <div>Test Component</div>
      </UserProvider>
    );

    // Wait for the data to be fetched and set in the context
    expect(screen.getByText('Test Component')).toBeDefined();
    expect(executeMock).toHaveBeenCalledTimes(0);

    mockUseFetchWithMsal({ execute: executeMock });
    render(
      <UserProvider>
        <></>
      </UserProvider>,
      {}
    );

    // Wait for the data to be fetched and set in the context
    expect(screen.getByText('Test Component')).toBeDefined();
    expect(executeMock).toHaveBeenCalledTimes(1);
  });
});
