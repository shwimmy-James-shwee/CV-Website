import type { Meta, StoryObj } from "@storybook/react";
import { within, expect } from "@storybook/test";
import { BodyText } from "../BodyText";

const meta = {
  title: "Components/Text/BodyText",
  component: BodyText,
  parameters: {},
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "number",
      description: "The font size in rem"
    },
    fontWeight: {
      control: "number",
      description: "The font weight"
    },
    style: {
      control: "object",
      description: "The style object"
    },
    color: {
      control: "color",
      description: "The font color"
    },
    className: {
      control: "text",
      description: "The class name"
    }
  }
} satisfies Meta<typeof BodyText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "The Body Text Component"
  }
};

export const UnitTest: Story = {
  args: {
    children: "The Body Text Component"
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("Components are rendered", async () => {
      await expect(canvas.getByTestId("body-text")).toBeInTheDocument();
      await expect(canvas.getByTestId("body-text")).toHaveTextContent("The Body Text Component");
    });
  }
};
