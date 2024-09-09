import { Meta, StoryObj } from '@storybook/react';

import NavBar from '../TopNavBar';
import { userEvent, within, expect, fn, waitFor } from '@storybook/test';

const meta: Meta<typeof NavBar> = {
  title: 'Components/Layout/TopNavBar',
  component: NavBar,
  tags: ['autodocs'],
  args: {
    handleLogin: fn(),
    handleLogout: fn(),
  },
} satisfies Meta<typeof NavBar>;

export default meta;
type Story = StoryObj<typeof meta>;
const navLinkItems = [
  { lable: 'Home', url: '/home' },
  { lable: 'FAQ', url: '/faq' },
  { lable: 'Contact', url: '/contact' },
];
export const TabsUnitTest: Story = {
  args: {
    userLoggedIn: true,
    navLinkItems: navLinkItems,
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Clicking on the links', async () => {
      await userEvent.click(canvas.getByText('Contact'));

      await expect(canvas.getByText('Contact')).toHaveClass('active');

      await userEvent.click(canvas.getByText('FAQ'));

      await expect(canvas.getByText('FAQ')).toHaveClass('active');

      await userEvent.click(canvas.getByText('Home'));

      await expect(canvas.getByText('Home')).toHaveClass('active');
    });
  },
};

export const LogoutUnitTest: Story = {
  args: { userLoggedIn: true, navLinkItems: navLinkItems },
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Clicking on the logout button', async () => {
      await userEvent.click(canvas.getByText('Log out'));
    });
    await waitFor(() => expect(args.handleLogout).toHaveBeenCalled());
  },
};

export const LoginUnitTest: Story = {
  args: { userLoggedIn: false, navLinkItems: navLinkItems },
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Clicking on the login button', async () => {
      await userEvent.click(canvas.getByText('Login'));
    });
    await waitFor(() => expect(args.handleLogin).toHaveBeenCalled());
  },
};
