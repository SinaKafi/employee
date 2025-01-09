import { defineStyle, defineStyleConfig } from "@chakra-ui/styled-system";
import { defaultBaseStyle } from "./defaultBaseStyle";

export const Button = defineStyleConfig({
  baseStyle: { ...defaultBaseStyle },
  variants: {
    secondary: {
      bg: "error.500",
      color: "white",
    },
    solid: defineStyle((props) => {
      const { colorScheme: c } = props;
      if (
        c === "primary" ||
        c === "success" ||
        c === "error" ||
        c === "warning"
      ) {
        return {
          color: "alpha.textMain",
        };
      }
    }),
    outline: {
      color: "primary.500",
      bg: "alpha.white",
      borderColor: "primary.500",
    },
    success: {
      bg: "secondary.500",
      color: "alpha.white",
    },
    primary: {
      bg: "primary.500",
      color: "alpha.white",
    },
  },
  sizes: {
    xs: {
      h: "auto",
      fontSize: "caption",
      borderRadius: "xs",
      px: "2",
      py: "1",
    },
    sm: {
      h: "auto",
      fontSize: "sm",
      px: "3",
      py: "1",
    },
    md: {
      h: "auto",
      fontSize: "sm",
      px: "16px",
      h: "auto",
      py: "8px",
    },
    base: {
      h: "auto",
      fontSize: "sm",
      px: "4",
      minH: 12,
      py: "2",
    },
    lg: {
      h: "auto",
      fontSize: "md",
      px: "4",
      py: "3",
    },
    xl: {
      h: "auto",
      fontSize: "md",
      px: "6",
      py: "4",
    },
  },
  defaultProps: {
    variant: "primary",
    _hover: {
      bg: "primary.300",
    },
  },
});
