import type { Meta, StoryObj } from '@storybook/react';
import { within, expect } from '@storybook/test';
import { Header } from '../Header';

const meta = {
  title: 'Components/Banner/Header',
  component: Header,
  parameters: {},
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'The title of the banner',
    },
    description: {
      control: 'text',
      description: 'The body text of the banner',
    },
  },
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const HeaderStory: Story = {
  args: {
    title: 'Hi User001,',
    description: 'Welcome to the webapp template',
  },
};

export const UnitTest: Story = {
  args: {
    title: 'The Title',
    description: 'The Description',
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Components are rendered', async () => {
      await expect(canvas.getByTestId('header')).toBeInTheDocument();
      await expect(canvas.getByTestId('header-title')).toHaveTextContent('The Title');
      await expect(canvas.getByTestId('header-description')).toHaveTextContent('The Description');
    });
  },
};
