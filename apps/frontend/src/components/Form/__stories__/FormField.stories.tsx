import type { Meta, StoryObj } from '@storybook/react';
import { within, expect } from '@storybook/test';
import FormField from '../FormField';

const meta = {
  title: 'Components/Form/FormField',
  component: FormField,
  parameters: {},
  tags: ['autodocs'],
  argTypes: {
    fieldLabel: {
      control: 'text',
      description: 'The label of the field',
    },
    type: {
      control: 'text',
      description: 'The type of the bootstrap input',
    },
    placeholder: {
      control: 'text',
      description: 'The placeholder text for the field',
    },
    required: {
      control: 'boolean',
      description: 'Specifies if the field is required',
    },
    disabled: {
      control: 'boolean',
      description: 'Specifies if the field is disabled',
    },
    readonly: {
      control: 'boolean',
      description: 'Specifies if the field is readonly',
    },
  },
} satisfies Meta<typeof FormField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    fieldLabel: 'Name',
    type: 'text',
    onChange: () => {},
  },
};

export const Disabled: Story = {
  args: {
    fieldLabel: 'Name',
    type: 'text',
    disabled: true,
    onChange: () => {},
  },
};

export const Readonly: Story = {
  args: {
    fieldLabel: 'Name',
    type: 'text',
    placeholder: 'This is a readonly example.',
    readonly: true,
    onChange: () => {},
  },
};

export const Select: Story = {
  args: {
    fieldLabel: 'Select an option',
    type: 'select',
    onChange: () => {},
    children: (
      <>
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
      </>
    ),
  },
};

export const MultiSelect: Story = {
  args: {
    fieldLabel: 'Hold and drag to select multiple options',
    type: 'multiselect',
    onChange: () => {},
    children: (
      <>
        <option value='1'>1</option>
        <option value='2'>2</option>
        <option value='3'>3</option>
        <option value='4'>4</option>
      </>
    ),
  },
};

export const Checkbox: Story = {
  args: {
    type: 'checkbox',
    itemLabel: 'Click me',
    onChange: () => {},
  },
};

export const Radio: Story = {
  args: {
    type: 'radio',
    itemLabel: 'Click me',
    onChange: () => {},
  },
};

export const Switch: Story = {
  args: {
    type: 'switch',
    itemLabel: 'Click me',
    onChange: () => {},
  },
};

export const UnitTest: Story = {
  args: {
    fieldLabel: 'Name',
    type: 'text',
    onChange: () => {},
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Form field is rendered', async () => {
      const formField = canvas.getByLabelText('Name');
      await expect(formField).toBeInTheDocument();
    });
  },
};
