import type { Meta, StoryObj } from '@storybook/react';
import FilesDropZone from '../FilesDropZone';
import { within, expect, fn, userEvent, waitFor } from '@storybook/test';

const meta = {
  title: 'Components/Toolkit/FilesDropZone',
  component: FilesDropZone,
  parameters: {},
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'The title of the dropzone'
    },
    bodyText: {
      control: 'text',
      description: 'The body text of the dropzone'
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the dropzone is disabled'
    },
    files: {
      control: 'object',
      description: 'The files in the dropzone'
    },

    onDrop: {
      action: 'onDrop',
      description: 'The function to call when files are dropped'
    },

    titleSize: {
      control: 'number',
      description: 'The size of the title'
    }
  }
} satisfies Meta<typeof FilesDropZone>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Drop files here',
    bodyText: 'or click to upload',
    files: [],
    onDrop: fn()
  }
};

export const UnitTest: Story = {
  args: {
    title: 'Drop files here',
    bodyText: 'or click to upload',
    files: [],
    onDrop: fn()
  },
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('FilesDropZone is rendered', async () => {
      const filesDropZone = canvas.getByTestId('files-dropzone-title');
      await expect(filesDropZone).toBeInTheDocument();
    });

    await step('FilesDropZone has title', async () => {
      const title = canvas.getByText('Drop files here');
      await expect(title).toBeInTheDocument();
    });

    await step('FilesDropZone has body text', async () => {
      const bodyText = canvas.getByText('or click to upload');
      await expect(bodyText).toBeInTheDocument();
    });

    await step('FilesDropZone has no files', async () => {
      const files = canvas.queryAllByTestId('files-dropzone-file');
      await expect(files).toHaveLength(0);
    });

    await step('FilesDropZone has onDrop function', async () => {
      const onDrop = canvas.getByTestId('files-dropzone-input');

      await userEvent.upload(onDrop, new File(['(⌐□_□)'], 'chucknorris.png', { type: 'image/png' }));

      await waitFor(() => expect(args.onDrop).toHaveBeenCalledTimes(1));
    });
  }
};
