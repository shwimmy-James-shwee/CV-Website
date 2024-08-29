import type { Meta, StoryObj } from '@storybook/react';
import { within, expect, userEvent, waitFor } from '@storybook/test';
import { useContext } from 'react';
import AlertComponent from '../Alert';
import AlertProvider, { AlertContext } from '../AlertContext';
import { Button } from 'react-bootstrap';
import { Variant } from 'react-bootstrap/esm/types';

type AlertCustomArgs = {
  header?: string;
  alertContent?: string;
  timeout?: number;
  variant?: Variant;
};
type AlertComponentAndCustomArgs = React.ComponentProps<typeof AlertComponent> & AlertCustomArgs;

const meta: Meta<AlertComponentAndCustomArgs> = {
  title: 'Components/Toolkit/Alert',
  component: AlertComponent,
  parameters: {
    docs: {
      description: {
        component:
          'To use the Alert component, wrap your application in the AlertProvider. Then use the addAlert function to add alerts.'
      },
      source: {
        type: 'code'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    header: {
      control: 'text',
      description: 'The title of the alert'
    },
    alertContent: {
      control: 'text',
      description: 'The content of the alert'
    },
    timeout: {
      control: 'number',
      description: 'The time in milliseconds before the alert is removed'
    },
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark'],
      description: 'The variant of the alert'
    }
  }
} satisfies Meta<AlertComponentAndCustomArgs>;

export default meta;

type Story = StoryObj<typeof meta>;

const Template = ({ header, alertContent, timeout, variant }: AlertCustomArgs) => {
  const { addAlert } = useContext(AlertContext);

  return (
    <>
      <AlertComponent />
      <Button
        onClick={() => {
          addAlert({
            id: new Date().getTime().toString(),
            timeout: timeout,
            header: header,
            alertContent: alertContent,
            variant: variant
          });
        }}
      >
        Add Alert
      </Button>
    </>
  );
};

export const Default: Story = {
  args: {
    header: 'New Alert Storybook Title',
    alertContent: 'New Alert body storybook',
    timeout: 1000,
    variant: 'primary'
  },

  render: ({ ...args }) => {
    return (
      <AlertProvider>
        <AlertContext.Consumer>
          {(ctx) => {
            return (
              <>
                <AlertComponent />
                <Button
                  onClick={() => {
                    ctx.addAlert({
                      id: new Date().getTime().toString(),
                      timeout: args.timeout,
                      header: args.header,
                      alertContent: args.alertContent,
                      variant: args.variant
                    });
                  }}
                >
                  Add Alert
                </Button>
              </>
            );
          }}
        </AlertContext.Consumer>
      </AlertProvider>
    );
  }
};

export const UnitTest: Story = {
  args: {
    header: 'New Alert Storybook Title',
    alertContent: 'New Alert body storybook',
    timeout: 500
  },
  render: ({ ...args }) => {
    return (
      <AlertProvider>
        <Template {...args} />
      </AlertProvider>
    );
  },

  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Add Alerts and wait for timeout', async () => {
      const button = canvas.getByText('Add Alert');
      await userEvent.click(button);

      const newAlertTitle = canvas.getByText('New Alert Storybook Title');
      await expect(newAlertTitle).toBeInTheDocument();

      const newAlertBody = canvas.getByText('New Alert body storybook');
      await expect(newAlertBody).toBeInTheDocument();

      // auto timeout
      const alertBodyRemoved = canvas.queryByText('New Alert body storybook');
      await waitFor(() => expect(alertBodyRemoved).not.toBeInTheDocument());
    });

    await step('Add Alerts and activly remove', async () => {
      const button = canvas.getByText('Add Alert');
      await userEvent.click(button);

      const newAlertTitle = canvas.getByText('New Alert Storybook Title');
      await expect(newAlertTitle).toBeInTheDocument();

      const newAlertBody = canvas.getByText('New Alert body storybook');
      await expect(newAlertBody).toBeInTheDocument();

      // active remove
      await userEvent.click(canvas.getAllByRole('button')[0]);
      const alertBodyRemoved = canvas.queryByText('Alert body storybook');
      await waitFor(() => expect(alertBodyRemoved).not.toBeInTheDocument());
    });
  }
};
