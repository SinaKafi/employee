import { Heading, Text } from "@chakra-ui/react";
import React from "react";

interface IToman {
  price: number | string;
  offPrice?: number | string;
  variant?: "md" | "sm" | "lg" | "xl" | "xs";
  component?: "Text" | "Heading";
  color?: string;
}

const Toman: React.FC<IToman> = ({
  price,
  variant = "md",
  component = "Text",
  color = "",
}) => {
  const Component = {
    Text: {
      price: (
        <Text
          className="!truncate text-md !font-medium"
          color={color}
          variant={variant}
        >
          {price.toLocaleString()}
        </Text>
      ),
      toman: (
        <Text
          className="!truncate text-caption !font-normal "
          color={color}
          variant={variant}
        >
          تومان
        </Text>
      ),
    },
    Heading: {
      price: (
        <Heading
          className="!truncate text-sm !font-medium"
          color={color}
          variant={variant}
        >
          {price.toLocaleString()}
        </Heading>
      ),
      toman: (
        <Heading
          className="!truncate text-sm !font-normal !text-alpha-text40"
          color={color}
          variant={variant}
        >
          تومان
        </Heading>
      ),
    },
  };
  return (
    <div className="flex gap-xs">
      {Component[component].price}
      {Component[component].toman}
    </div>
  );
};

export default Toman;
