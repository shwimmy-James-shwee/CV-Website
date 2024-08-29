import type { Meta, StoryObj } from '@storybook/react'
import ButtonComponent from '../Button'
import { within, expect, fn } from '@storybook/test'

const meta = {
  title: 'Components/Toolkit/Button',
  component: ButtonComponent,
  parameters: {},
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'The label of the button',
    },
  },
  args: { onClick: fn() },
} satisfies Meta<typeof ButtonComponent>

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    label: 'Button',
  },
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    label: 'Button',
  },
}

export const WithIcon: Story = {
  args: {
    variant: 'primary',
    label: 'Filters',
    icon: 'filter_list',
  },
}

export const UnitTest: Story = {
  args: {
    label: 'Click me',
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement)

    await step('Button is rendered', async () => {
      const button = canvas.getByTestId('button-component')
      await expect(button).toBeInTheDocument()
    })
  },
}
