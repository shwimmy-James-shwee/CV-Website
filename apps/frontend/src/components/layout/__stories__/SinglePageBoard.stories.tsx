import { Meta, StoryObj } from '@storybook/react';

import SinglePageBoard from '../SinglePageBoard';
import { within, expect } from '@storybook/test';

const meta: Meta<typeof SinglePageBoard> = {
  title: 'Components/Layout/SinglePageBoard',
  component: SinglePageBoard,
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: 'text',
      description: 'The children to render'
    },

    header: {
      control: 'text',
      description: 'The header of the board'
    },

    contentHeader: {
      control: 'text',
      description: 'The content header of the board'
    },

    'data-testid': {
      control: 'text',
      description: 'The data-testid attribute'
    }
  }
} satisfies Meta<typeof SinglePageBoard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    header: 'The Single Page Board Header',
    contentHeader: 'The Content Header',

    children: <p>Content Body</p>
  },
  render: ({ ...args }) => {
    return (
      <div
        style={{
          background: 'grey',
          height: '700px'
        }}
      >
        <SinglePageBoard {...args} />
      </div>
    );
  }
};

export const UnitTest: Story = {
  args: {
    header: 'The Single Page Board Header',
    contentHeader: 'The Content Header',

    children: <p>Content Body</p>
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Components are rendered', async () => {
      await expect(canvas.getByTestId('single-page-board')).toBeInTheDocument();
      await expect(canvas.getByTestId('single-page-board')).toHaveTextContent('The Single Page Board');
      await expect(canvas.getByTestId('single-page-board-content-header')).toHaveTextContent('The Content Header');
    });
  }
};
