import type { Meta, StoryObj } from '@storybook/react';
import { within, expect } from '@storybook/test';

import { Tip } from '../Tip';

const meta = {
  title: 'Components/Toolkit/Tip',
  component: Tip,
  parameters: {},
  tags: ['autodocs']
} satisfies Meta<typeof Tip>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    show: true,
    icon: 'lightbulb',
    title: 'Tip',
    text: 'Tooltip example',
    closeButton: true
  }
};

export const Warning: Story = {
  args: {
    show: true,
    icon: 'error',
    title: 'Error',
    text: 'Warning example',
    backgroundColor: 'none',
    color: 'var(--warning-color)'
  }
};

export const UnitTest: Story = {
  args: {
    show: true,
    icon: 'lightbulb',
    title: 'Tip',
    text: 'Tooltip example',
    closeButton: true,
    'data-testid': 'tip-row'
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Tip row is rendered', async () => {
      const tip = canvas.getByTestId('tip-row');
      await expect(tip).toBeDefined();
    });
  }
};
