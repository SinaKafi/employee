import { alertAnatomy } from "@chakra-ui/anatomy";
import {
  createMultiStyleConfigHelpers,
  defineStyle,
} from "@chakra-ui/styled-system";
import { defaultBaseStyle } from "./defaultBaseStyle";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(alertAnatomy.keys);
const xl = defineStyle({
  fontSize: "lg",
  px: "4",
  h: "12",
});

const sizes = {
  xl: definePartsStyle({ title: xl, description: xl }),
};
const customVariant = definePartsStyle({
  container: {
    border: "1px solid",
    borderColor: "gray.200",
    background: "gray.50",
    color: "alpha.textMain",

    // Let's also provide dark mode alternatives
    _dark: {
      borderColor: "gray.600",
      background: "gray.800",
    },
  },
  title: {
    color: "alpha.textMain",

    _dark: {
      color: "alpha.textMain",
    },
  },
});

export const alertTheme = defineMultiStyleConfig({ sizes });
