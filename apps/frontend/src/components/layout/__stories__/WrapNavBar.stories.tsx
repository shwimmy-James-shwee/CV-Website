import { Meta, StoryObj } from '@storybook/react'

import NavBar from '../WrapNavBar'
import { userEvent, within, expect, fn, waitFor } from '@storybook/test'

const meta: Meta<typeof NavBar> = {
  title: 'Components/Layout/WrapNavBar',
  component: NavBar,
  tags: ['autodocs'],
  args: {
    handleLogin: fn(),
    handleLogout: fn(),
  },
} satisfies Meta<typeof NavBar>

export default meta
type Story = StoryObj<typeof meta>
const navLinkItems = [
  { label: 'Home', url: '/home', icon: 'home' },
  { label: 'FAQ', url: '/faq', icon: 'quiz' },
  { label: 'Contact', url: '/contact', icon: 'contact_page' },
]
export const TabsUnitTest: Story = {
  args: {
    userLoggedIn: true,
    navLinkItems: navLinkItems,
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement)

    await step('Clicking on the links', async () => {
      await userEvent.click(canvas.getByText('Contact'))

      await expect(canvas.getByText('Contact').parentElement).toHaveClass('active')

      await userEvent.click(canvas.getByText('FAQ'))

      await expect(canvas.getByText('FAQ').parentElement).toHaveClass('active')

      await userEvent.click(canvas.getByText('Home'))

      await expect(canvas.getByText('Home').parentElement).toHaveClass('active')
    })
  },
}

export const LogoutUnitTest: Story = {
  args: { userLoggedIn: true, navLinkItems: navLinkItems },
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement)

    await step('Clicking on the logout button', async () => {
      await userEvent.click(canvas.getByText('Logout'))
    })
    await waitFor(() => expect(args.handleLogout).toHaveBeenCalled())
  },
}

export const LoginUnitTest: Story = {
  args: { userLoggedIn: false, navLinkItems: navLinkItems },
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement)

    await step('Clicking on the login button', async () => {
      await userEvent.click(canvas.getByText('Login'))
    })
    await waitFor(() => expect(args.handleLogin).toHaveBeenCalled())
  },
}
