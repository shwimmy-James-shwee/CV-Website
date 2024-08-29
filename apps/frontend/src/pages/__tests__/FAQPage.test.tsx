import { expect, test, describe, vi, afterEach } from 'vitest';

import { fireEvent, render, screen } from '@testing-library/react';

import FAQPage from '../FAQPage';

const ToRender = () => {
  return <FAQPage />;
};

describe('Test FAQPage', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });
  test('FAQPage should have all elements', async () => {
    render(ToRender());
    expect(screen.getByTestId('header')).toBeDefined();
    expect(screen.getAllByTestId('accordion-expand-icon')).toHaveLength(12);

    expect(screen.getByTestId('back-to-top-button')).toBeDefined();
  });

  test('FAQPage scroll to top button should call window.scrollTo', async () => {
    const scrollToMock = vi.fn();
    window.scrollTo = scrollToMock;
    render(ToRender());

    const scrollBtn = screen.getByTestId('back-to-top-button');
    fireEvent.click(scrollBtn);

    expect(scrollToMock).toHaveBeenCalled();

    vi.resetAllMocks();
  });
});
