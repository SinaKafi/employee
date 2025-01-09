import { radioAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/styled-system";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(radioAnatomy.keys);
const sizes = {
  sm: definePartsStyle({
    control: {
      w: 4,
      h: 4,
      //   p: "sm",

      _checked: {
        _before: {
          w: 1,
          h: 1,
        },
      },
    },

    label: { fontSize: "sm" },
    // icon: { fontSize: "3xs" },
  }),
  md: definePartsStyle({
    control: {
      w: 6,
      h: 6,
      p: "sm",
      _checked: {
        _before: {
          w: 3,
          h: 3,
        },
      },
    },
    label: { fontSize: "md" },
    // icon: { fontSize: "2xs" },
  }),
  lg: definePartsStyle({
    control: {
      _checked: {
        _before: {
          w: 4,
          h: 4,
        },
      },
      w: 8,
      h: 8,
      p: "sm",
    },
    label: { fontSize: "lg" },
    // icon: { fontSize: "2xs" },
  }),
};
const baseStyle = definePartsStyle({
  control: {
    borderRadius: "full",
    borderWidth: "lg",
    // color: "#fff",
    // background: "#fff",
    colorScheme: "white",

    border: "2px solid green ",
    borderColor: "gray.200 ",
    _checked: {
      //   colorScheme: "primary",
      //   color: "primary",
      //   bgColor: "primary",
      background: "white",
      _before: {
        color: "primary.500",
        borderColor: "primary.500 !important",
      },

      _hover: {
        appearance: "none",
        bg: "transparent !important",
        boxShadow: "checkboxesChecked",
      },
    },
    _hover: {
      boxShadow: "checkboxes ",
    },
  },
});
export const RadioTheme = defineMultiStyleConfig({
  baseStyle,
  sizes,
  defaultProps: {
    size: "md",
  },
});
