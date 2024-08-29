import type { Meta, StoryObj } from '@storybook/react';
import { within, expect, userEvent } from '@storybook/test';
import SelectFormField from '../SelectFormField';

const meta = {
  title: 'Components/Form/SelectFormField',
  component: SelectFormField,
  parameters: {},
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'The label of the field'
    },
    multiple: {
      control: 'boolean',
      description: 'Option for multiselect'
    },
    required: {
      control: 'boolean',
      description: 'Specifies if the field is required'
    },
    disabled: {
      control: 'boolean',
      description: 'Specifies if the field is disabled'
    }
  }
} satisfies Meta<typeof SelectFormField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Select an option',
    children: (
      <>
        <option>Open this select menu</option>
        <option value='1'>One</option>
        <option value='2'>Two</option>
        <option value='3'>Three</option>
      </>
    )
  }
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: <option>This select menu has been disabled</option>
  }
};

export const Multiselect: Story = {
  args: {
    label: 'Hold and drag to select multiple options',
    multiple: true,
    children: (
      <>
        <option value='1'>One</option>
        <option value='2'>Two</option>
        <option value='3'>Three</option>
      </>
    )
  }
};

export const UnitTest: Story = {
  args: {
    label: 'Select an option',
    children: (
      <>
        <option>Open this select menu</option>
        <option value='1'>One</option>
        <option value='2'>Two</option>
        <option value='3'>Three</option>
      </>
    )
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Form field is rendered and users can select an option', async () => {
      const formField = canvas.getByLabelText('Select an option') as HTMLSelectElement;
      await expect(formField).toBeInTheDocument();

      // Change the option to 'One'
      await userEvent.selectOptions(formField, ['1']);
      await expect(formField.value).toBe('1');

      // Change the option to 'Two'
      await userEvent.selectOptions(formField, ['2']);
      await expect(formField.value).toBe('2');

      // Change the option to 'Three'
      await userEvent.selectOptions(formField, ['3']);
      await expect(formField.value).toBe('3');
    });
  }
};
