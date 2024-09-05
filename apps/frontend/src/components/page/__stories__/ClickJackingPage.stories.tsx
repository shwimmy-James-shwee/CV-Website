import { Meta, StoryObj } from '@storybook/react';

import ClickJackingPage from '../ClickJackingPage';
import { within, expect } from '@storybook/test';
import React from 'react';

const meta: Meta<typeof ClickJackingPage> = {
  title: 'Components/Page/ClickJackingPage',
  component: ClickJackingPage,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof ClickJackingPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    return <ClickJackingPage />;
  },
};

export const UnitTest: Story = {
  render: () => {
    return <ClickJackingPage />;
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('ClickJackingPage is rendered', async () => {
      const clickJacking = canvas.getByTestId('click-jacking-page');
      await expect(clickJacking).toBeInTheDocument();
    });
  },
};
