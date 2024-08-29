import { expect, test, describe } from 'vitest';

import { render, screen } from '@testing-library/react';

import AdminPage from '../AdminPage';

const ToRender = () => {
  return <AdminPage />;
};

describe('Test AdminPage', () => {
  test('AdminPage should have all elements', async () => {
    render(ToRender());
    expect(screen.getByTestId('header')).toBeDefined();
    expect(screen.getByTestId('business-unit-tab')).toBeDefined();
    expect(screen.getByTestId('user-tab')).toBeDefined();
  });
});
