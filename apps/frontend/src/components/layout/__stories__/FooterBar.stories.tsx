import { Meta, StoryObj } from '@storybook/react';

import FooterBar from '../FooterBar';
import { within, expect } from '@storybook/test';

const meta: Meta<typeof FooterBar> = {
  title: 'Components/Layout/FooterBar',
  component: FooterBar,
  tags: ['autodocs'],
  args: {}
} satisfies Meta<typeof FooterBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const UnitTest: Story = {
  args: {
    redirectUrls: [
      { url: 'https://kpmg.com/nz/en/home/misc/privacy.html', label: 'Privacy' },
      { url: 'https://kpmg.com/nz/en/home.html', label: 'KPMG New Zealand' }
    ]
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Check redirect component render', async () => {
      await expect(canvas.getByText('Privacy').innerHTML).toEqual('Privacy');
      await expect(canvas.getByText('Privacy').getAttribute('href')).toEqual(
        'https://kpmg.com/nz/en/home/misc/privacy.html'
      );

      await expect(canvas.getByText('KPMG New Zealand').innerHTML).toEqual('KPMG New Zealand');
      await expect(canvas.getByText('KPMG New Zealand').getAttribute('href')).toEqual(
        'https://kpmg.com/nz/en/home.html'
      );
    });
  }
};
