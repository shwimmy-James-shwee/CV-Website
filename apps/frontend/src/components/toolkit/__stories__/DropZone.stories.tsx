import type { Meta, StoryObj } from '@storybook/react';
import DropZone from '../DropZone';
import { within, expect } from '@storybook/test';

const meta = {
  title: 'Components/Toolkit/DropZone',
  component: DropZone,
  parameters: {},
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: 'text',
      description: 'The label of the button'
    }
  }
} satisfies Meta<typeof DropZone>;

export default meta;

type Story = StoryObj<typeof meta>;

export const WithText: Story = {
  args: {
    name: 'Question',
    show: true,
    showText: true
  }
};

export const WithoutText: Story = {
  args: {
    name: 'Question',
    show: true
  }
};

export const UnitTest: Story = {
  args: {
    name: 'Question',
    show: true,
    showText: true
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('DropZone is rendered', async () => {
      const dropZone = canvas.getByText('Drop Question Here');
      await expect(dropZone).toBeInTheDocument();
    });
  }
};
