import type { Meta, StoryObj } from '@storybook/react';
import { within, expect } from '@storybook/test';
import FullFrameSpinner from '../FullFrameSpinner';

const meta = {
  title: 'Components/Toolkit/FullFrameSpinner',
  component: FullFrameSpinner,
  parameters: {},
  tags: ['autodocs'],
  argTypes: {}
} satisfies Meta<typeof FullFrameSpinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: 'dark'
  }
};

export const Glow: Story = {
  args: {
    variant: 'dark',
    animation: 'grow',
    scale: 2
  }
};

export const UnitTest: Story = {
  args: {
    scale: 2.5,
    variant: 'dark'
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Spinner is rendered', async () => {
      const spinner = canvas.getByTestId('full-frame-spinner');
      await expect(spinner).toBeInTheDocument();
    });

    await step('Spinner has the correct variant', async () => {
      const spinner = canvas.getByTestId('spinner');
      await expect(spinner).toHaveStyle({ color: 'rgb(33, 37, 41)' });
    });
  }
};
