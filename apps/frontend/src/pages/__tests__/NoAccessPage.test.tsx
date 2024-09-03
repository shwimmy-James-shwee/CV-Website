import { expect, test, describe, vi, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NoAccessPage from '../NoAccessPage';

const ToRender = () => {
  return <NoAccessPage />;
};
const logoutRedirectMock = vi.fn();
vi.mock('@azure/msal-react', async (origicalImport) => {
  return {
    ...(await origicalImport<typeof import('@azure/msal-react')>()),
    useMsal: () => ({
      instance: {
        logoutRedirect: logoutRedirectMock,
      },
    }),
  };
});

describe('Test NoAccessPage', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });
  test('NoAccessPage should have all elements', async () => {
    render(ToRender());

    // screen.debug()
    expect(screen.getByTestId('no-access-page')).toBeDefined();
  });

  test('NoAccessPage handleClick should call instance.logoutRedirect', async () => {
    render(ToRender());

    const returnToLoginButton = screen.getByText('Return to Login');
    await userEvent.click(returnToLoginButton);

    // screen.debug()
    expect(logoutRedirectMock).toHaveBeenCalledTimes(1);
  });
});
