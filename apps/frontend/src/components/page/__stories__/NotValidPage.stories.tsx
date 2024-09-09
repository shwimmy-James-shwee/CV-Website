import { Meta, StoryObj } from '@storybook/react';

import NotValidPage from '../NotValidPage';
import { within, expect } from '@storybook/test';
import GradienFullPage from '../../layout/GradienFullPage';

const meta: Meta<typeof NotValidPage> = {
  title: 'Components/Page/NotValidPage',
  component: NotValidPage,
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'The title of the page',
    },
    body: {
      control: 'text',
      description: 'The body of the page',
    },
    children: {
      control: 'text',
      description: 'The children to render',
    },
  },
} satisfies Meta<typeof NotValidPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Title of the page',
    body: 'Body of the page',
  },
  render: ({ ...args }) => {
    return (
      <NotValidPage {...args}>
        <button>children elements</button>
      </NotValidPage>
    );
  },
};

export const LongText: Story = {
  args: {
    title: 'Title of the page',
    body: 'Body of the page',
  },
  render: ({ ...args }) => {
    return (
      <NotValidPage {...args}>
        <p>{'some content '.repeat(1000)}</p>
      </NotValidPage>
    );
  },
};

export const InBackground: Story = {
  args: {
    title: 'Title of the page',
    body: 'Body of the page',
  },
  render: ({ ...args }) => {
    return (
      <GradienFullPage>
        <NotValidPage {...args}>
          <p>{'some child content'}</p>
        </NotValidPage>
      </GradienFullPage>
    );
  },
};

export const UnitTest: Story = {
  args: {
    title: 'Title of the page',
    body: 'Body of the page',
  },
  render: ({ ...args }) => {
    return (
      <NotValidPage {...args}>
        <p>some content to put in side the page</p>
      </NotValidPage>
    );
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('NotValidPage is rendered', async () => {
      const centerBox = canvas.getByTestId('not-valid-page');
      await expect(centerBox).toBeInTheDocument();
    });

    await step('NotValidPage has children', async () => {
      await expect(canvas.getByText('Title of the page')).toBeInTheDocument();
      await expect(canvas.getByText('Body of the page')).toBeInTheDocument();
      await expect(canvas.getByText('some content to put in side the page')).toBeInTheDocument();
    });
  },
};
