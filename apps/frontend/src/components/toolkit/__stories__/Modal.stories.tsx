import type { Meta, StoryObj } from '@storybook/react';
import { within, expect, fn, userEvent } from '@storybook/test';
import ModalComponent from '../Modal';
import ButtonComponent from '../Button';
import FormField from '../../Form/FormField';
import { useState } from 'react';

type ModalCustomArgs = {
  show: boolean;
  title?: string;
  body?: React.ReactNode;
  footer?: React.ReactNode;
  backdrop?: boolean;
  closeButton?: boolean;
};

type ModalComponentAndCustomArgs = React.ComponentProps<typeof ModalComponent> & ModalCustomArgs;

const meta: Meta<ModalComponentAndCustomArgs> = {
  title: 'Components/Toolkit/Modal',
  component: ModalComponent,
  tags: ['autodocs'],
  argTypes: {
    show: {
      control: 'boolean',
      description: 'Set show for the modal'
    },
    title: {
      control: 'text',
      description: 'The title of the modal'
    },
    body: {
      control: 'text',
      description: 'The body of the modal'
    },
    footer: {
      control: 'text',
      description: 'The footer of the modal'
    },
    backdrop: {
      control: 'boolean',
      description: 'Set backdrop (blur) for the modal'
    },
    closeButton: {
      control: 'boolean',
      description: 'Set close button for the modal'
    },
    size: {
      control: 'select',
      options: ['sm', 'lg', 'xl'],
      description: 'Set size for the modal'
    }
  }
} satisfies Meta<ModalComponentAndCustomArgs>;

export default meta;

type Story = StoryObj<typeof meta>;

// TODO: Fix HMR Invalidate warning
const Template = ({ ...args }: ModalCustomArgs) => {
  const [show, setShow] = useState(args.show);
  return (
    <>
      <ButtonComponent label='Open modal' data-testid='open-modal-button' onClick={() => setShow(true)} />
      <ModalComponent {...args} show={show} onHide={() => setShow(!show)} />
    </>
  );
};

export const Default: Story = {
  args: {
    show: false,
    title: 'Modal Title',
    body: <FormField fieldLabel='Message' placeholder='Enter a message' type='text' onChange={fn()} />,
    footer: <ButtonComponent label='Send' />,
    backdrop: false,
    closeButton: true
  },
  render: ({ ...args }) => <Template {...args} />
};

export const UnitTest: Story = {
  args: {
    show: false,
    title: 'Modal Title',
    body: <FormField fieldLabel='Message' placeholder='Enter a message' type='text' onChange={fn()} />,
    footer: <ButtonComponent label='Send' />,
    backdrop: true,
    closeButton: true
  },
  render: ({ ...args }) => <Template {...args} />,
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Components are rendered', async () => {
      const button = canvas.getByTestId('open-modal-button');
      await userEvent.click(button);
      const modal = document.querySelector('[ data-testid="modal" ]');
      await expect(modal).toBeInTheDocument();
    });
  }
};
