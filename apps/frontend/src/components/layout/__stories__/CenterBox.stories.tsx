import { Meta, StoryObj } from '@storybook/react'

import CenterBox from '../CenterBox'
import { within, expect } from '@storybook/test'

const meta: Meta<typeof CenterBox> = {
  title: 'Components/Layout/CenterBox',
  component: CenterBox,
  tags: ['autodocs'],
  argTypes: {
    maxWidth: {
      control: 'text',
      description: 'The maximum width of the box',
    },
    className: {
      control: 'text',
      description: 'The class name of the box',
    },
    children: {
      control: 'text',
      description: 'The children to render',
    },
  },
} satisfies Meta<typeof CenterBox>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    maxWidth: '100px',
    className: 'border',
  },
  render: ({ ...args }) => {
    return (
      <div
        style={{
          //   background: 'grey',
          height: '200px',
          width: '100%',
          display: 'flex',
        }}
      >
        <CenterBox {...args}>
          <p>some content to put in side the box</p>
        </CenterBox>
      </div>
    )
  },
}

export const LongText: Story = {
  args: {
    maxWidth: '500px',
    className: 'border',
  },
  render: ({ ...args }) => {
    return (
      <div
        style={{
          //   background: 'grey',
          height: '200px',
          width: '100%',
          display: 'flex',
        }}
      >
        <CenterBox {...args}>
          <p>{'some content '.repeat(1000)}</p>
        </CenterBox>
      </div>
    )
  },
}

export const UnitTest: Story = {
  args: {
    maxWidth: '100px',
    className: 'border',
  },
  render: ({ ...args }) => {
    return (
      <div
        style={{
          //   background: 'grey',
          height: '200px',
          width: '100%',
          display: 'flex',
        }}
      >
        <CenterBox {...args}>
          <p>some content to put in side the box</p>
        </CenterBox>
      </div>
    )
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement)

    await step('CenterBox is rendered', async () => {
      const centerBox = canvas.getByTestId('center-box')
      await expect(centerBox).toBeInTheDocument()
    })

    await step('CenterBox has children', async () => {
      const children = canvas.getByText('some content to put in side the box')
      await expect(children).toBeInTheDocument()
    })
  },
}
