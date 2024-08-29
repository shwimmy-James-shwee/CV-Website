import type { Meta, StoryObj } from '@storybook/react';
import { within, expect, userEvent } from '@storybook/test';
import AccordionComponent from '../Accordion';
import { Col } from 'react-bootstrap';

const meta = {
  title: 'Components/Toolkit/Accordion',
  component: AccordionComponent,
  parameters: {},
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'The title of the accordion'
    }
  }
} satisfies Meta<typeof AccordionComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: <Col>Click the arrow to toggle the accordion</Col>,
    children: <>Child Node</>
  }
};

export const UnitTest: Story = {
  args: {
    title: <Col>Title</Col>,
    children: <>Child Node</>,
    'data-testid': 'accordion'
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Accordion is rendered and child node is rendered on click', async () => {
      const accordion = canvas.getByTestId('accordion');
      await expect(accordion).toBeInTheDocument();

      const expandButton = canvas.getByTestId('accordion-expand-icon');
      userEvent.click(expandButton);
      await expect(canvas.getByText('Child Node')).toBeInTheDocument();
    });
  }
};
