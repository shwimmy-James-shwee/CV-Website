import { Meta, StoryObj } from '@storybook/react';

import TopBottomBoard from '../TopBottomBoard';
import { within, expect } from '@storybook/test';

const meta: Meta<typeof TopBottomBoard> = {
  title: 'Components/Layout/TopBottomBoard',
  component: TopBottomBoard,
  tags: ['autodocs'],
  argTypes: {
    topContent: {
      control: 'text',
      description: 'The content for the top row'
    },
    bottomContent: {
      control: 'text',
      description: 'The content for the bottom row'
    },
    maxTopHeightPercentage: {
      control: 'number',
      description: 'The max height of the top row as a percentage of the total height'
    }
  }
} satisfies Meta<typeof TopBottomBoard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    topContent: (
      <div style={{ background: 'grey' }} className='w-100 h-100'>
        The Top Bottom Board
      </div>
    ),
    bottomContent: (
      <div style={{ background: 'grey' }} className='w-100 h-100'>
        The Bottom Content
      </div>
    )
  },
  render: ({ ...args }) => {
    return (
      <div
        style={{
          background: 'white',
          height: '500px'
          //   width: '100%',
        }}
      >
        <TopBottomBoard {...args} />
      </div>
    );
  }
};

export const LongText: Story = {
  args: {
    topContent: (
      <div style={{ background: 'grey' }} className='w-100 h-100'>
        {'The Top Bottom Board'.repeat(100)}
      </div>
    ),
    bottomContent: (
      <div style={{ background: 'grey' }} className='w-100 h-100'>
        {'The Bottom Content'.repeat(100)}
      </div>
    )
  },
  render: ({ ...args }) => {
    return (
      <div
        style={{
          background: 'white',
          height: '500px'
          //   width: '100%',
        }}
      >
        <TopBottomBoard {...args} />
      </div>
    );
  }
};
export const UnitTest: Story = {
  args: {
    topContent: 'The Top Bottom Board\n',
    bottomContent: 'The Bottom Content\n'
  },
  play: async ({ canvasElement }) => {
    const topBottomBoard = within(canvasElement).getByTestId('top-bottom-board-top-row');
    expect(topBottomBoard).toHaveTextContent('The Top Bottom Board');
    const bottomContent = within(canvasElement).getByTestId('top-bottom-board-bottom-row');
    expect(bottomContent).toHaveTextContent('The Bottom Content');
  }
};
