import type { Meta, StoryObj } from '@storybook/react'
import { within, expect } from '@storybook/test'
import { InfoText } from '../InfoText'

const meta = {
  title: 'Components/Text/InfoText',
  component: InfoText,
  parameters: {},
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'number',
      description: 'The font size in rem',
    },
    fontWeight: {
      control: 'number',
      description: 'The font weight',
    },
    style: {
      control: 'object',
      description: 'The style object',
    },
    color: {
      control: 'color',
      description: 'The font color',
    },
    className: {
      control: 'text',
      description: 'The class name',
    },
  },
} satisfies Meta<typeof InfoText>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'The Info Text Component',
  },
}

export const UnitTest: Story = {
  args: {
    children: 'The Info Text Component',
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement)

    await step('Components are rendered', async () => {
      await expect(canvas.getByTestId('info-text')).toBeInTheDocument()
      await expect(canvas.getByTestId('info-text')).toHaveTextContent('The Info Text Component')
    })
  },
}
