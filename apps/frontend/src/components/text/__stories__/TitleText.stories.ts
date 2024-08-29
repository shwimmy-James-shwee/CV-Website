import type { Meta, StoryObj } from "@storybook/react";
import { within, expect } from "@storybook/test";
import { TitleText } from "../TitleText";

const meta = {
  title: "Components/Text/TitleText",
  component: TitleText,
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
} satisfies Meta<typeof TitleText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "The Title Text Component"
  }
};

export const UnitTest: Story = {
  args: {
    children: "The Title Text Component"
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("Components are rendered", async () => {
      await expect(canvas.getByTestId("title-text")).toBeInTheDocument();
      await expect(canvas.getByTestId("title-text")).toHaveTextContent("The Title Text Component");
    });
  }
};
