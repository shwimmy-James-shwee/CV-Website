import { Meta, StoryObj } from '@storybook/react'

import GradienFullPage from '../GradienFullPage'
import { within, expect } from '@storybook/test'

const meta: Meta<typeof GradienFullPage> = {
  title: 'Components/Layout/GradienFullPage',
  component: GradienFullPage,
  tags: ['autodocs'],
  argTypes: {
    className: {
      control: 'text',
      description: 'The class name of the box',
    },
    children: {
      control: 'text',
      description: 'The children to render',
    },
  },
} satisfies Meta<typeof GradienFullPage>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: ({ ...args }) => {
    return (
      <GradienFullPage {...args}>
        <p>some content to put in side the page</p>
      </GradienFullPage>
    )
  },
}

export const LongText: Story = {
  args: {},
  render: ({ ...args }) => {
    return (
      <GradienFullPage {...args}>
        <p>{'some content '.repeat(1000)}</p>
      </GradienFullPage>
    )
  },
}

export const UnitTest: Story = {
  args: {},
  render: ({ ...args }) => {
    return (
      <GradienFullPage {...args}>
        <p>some content to put in side the page</p>
      </GradienFullPage>
    )
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement)

    await step('GradienFullPage is rendered', async () => {
      const centerBox = canvas.getByTestId('gradient-full-page')
      await expect(centerBox).toBeInTheDocument()
    })

    await step('GradienFullPage has children', async () => {
      const children = canvas.getByText('some content to put in side the page')
      await expect(children).toBeInTheDocument()
    })
  },
}
