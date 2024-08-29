import type { Meta, StoryObj } from '@storybook/react'
import { within, expect, userEvent } from '@storybook/test'
import SwitchFormField from '../SwitchFormField'

const meta = {
  title: 'Components/Form/SwitchFormField',
  component: SwitchFormField,
  parameters: {},
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'The label of the field',
    },
    required: {
      control: 'boolean',
      description: 'Specifies if the field is required',
    },
    disabled: {
      control: 'boolean',
      description: 'Specifies if the field is disabled',
    },
  },
} satisfies Meta<typeof SwitchFormField>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'Click me',
  },
}

export const UnitTest: Story = {
  args: {
    label: 'Click me',
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement)

    await step('Form field is rendered', async () => {
      const formField = canvas.getByLabelText('Click me') as HTMLInputElement
      await expect(formField).toBeInTheDocument()
      await expect(formField.checked).toBe(false)

      await userEvent.click(formField)
      await expect(formField.checked).toBe(true)
    })
  },
}
