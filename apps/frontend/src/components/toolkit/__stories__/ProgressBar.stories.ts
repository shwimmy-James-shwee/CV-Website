import type { Meta, StoryObj } from "@storybook/react";
import { within, expect } from "@storybook/test";
import { ProgressBar } from "../ProgressBar";

const meta = {
  title: "Components/Toolkit/ProgressBar",
  component: ProgressBar,
  parameters: {},
  tags: ["autodocs"],
  argTypes: {
    style: {
      control: "object",
      description: "The style object"
    },
    className: {
      control: "text",
      description: "The class name"
    }
  }
} satisfies Meta<typeof ProgressBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const UnitTest: Story = {
  args: {
    percentage: 50
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("Components are rendered", async () => {
      await expect(canvas.getByTestId("progress-bar")).toBeInTheDocument();
      await expect(canvas.getByTestId("progress-bar-progress")).toBeInTheDocument();
    });
  }
};
