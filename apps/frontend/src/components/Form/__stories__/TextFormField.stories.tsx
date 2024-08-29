import type { Meta, StoryObj } from '@storybook/react'
import { within, expect } from '@storybook/test'
import TextFormField from '../TextFormField'

const meta = {
  title: 'Components/Form/TextFormField',
  component: TextFormField,
  parameters: {},
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'The label of the field',
    },
    textarea: {
      control: 'boolean',
      description: 'Set form field to be textarea',
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
    readOnly: {
      control: 'boolean',
      description: 'Specifies if the field is readonly',
    },
  },
} satisfies Meta<typeof TextFormField>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'Name',
  },
}

export const Disabled: Story = {
  args: {
    label: 'Name',
    disabled: true,
  },
}

export const Readonly: Story = {
  args: {
    label: 'Name',
    placeholder: 'This is a readonly example.',
    readOnly: true,
  },
}

export const UnitTest: Story = {
  args: {
    label: 'Name',
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement)

    await step('Form field is rendered', async () => {
      const formField = canvas.getByLabelText('Name')
      await expect(formField).toBeInTheDocument()
    })
  },
}
