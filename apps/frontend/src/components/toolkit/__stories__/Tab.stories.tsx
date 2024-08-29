import type { Meta, StoryObj } from '@storybook/react';
import { within, expect, fn } from '@storybook/test';
import { TabComponent } from '../Tab';

const meta = {
  title: 'Components/Toolkit/Tab',
  component: TabComponent,
  parameters: {},
  tags: ['autodocs']
} satisfies Meta<typeof TabComponent>;

export default meta;

const tabData = [
  { eventKey: 'information', title: 'Information' },
  { eventKey: 'questions', title: 'Questions' },
  { eventKey: 'share', title: 'Share' }
];

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    data: tabData,
    selectedKey: 'questions',
    setKey: fn()
  }
};

export const UnitTest: Story = {
  args: {
    data: tabData,
    selectedKey: 'questions',
    setKey: fn()
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Tabs are rendered', async () => {
      const tabs = canvas.getAllByTestId('tab-item');
      await expect(tabs).toHaveLength(3);
    });
  }
};
