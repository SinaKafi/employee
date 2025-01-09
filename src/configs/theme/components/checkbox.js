import { checkboxAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/styled-system";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(checkboxAnatomy.keys);

const sizes = {
  sm: definePartsStyle({
    control: {
      color: "alpha.textMain",
      p: 1,
    },
    label: {
      color: "alpha.textMain",
      fontSize: "sm",
    },
    icon: {
      color: "alpha.textMain",
      fontSize: "3xs",
    },
  }),
  md: definePartsStyle({
    control: {
      color: "alpha.textMain",
      p: 2,
    },
    label: {
      color: "alpha.textMain",
      fontSize: "md",
    },
    icon: {
      color: "alpha.textMain",
      fontSize: "2xs",
    },
  }),
  lg: definePartsStyle({
    control: {
      color: "alpha.textMain",
      p: 3,
    },
    label: {
      color: "alpha.textMain",
      fontSize: "lg",
    },
    icon: {
      color: "alpha.textMain",
      fontSize: "2xs",
    },
  }),
};

const baseStyle = definePartsStyle({
  control: {
    borderRadius: "xs",
    _checked: {
      _hover: {
        boxShadow: "checkboxesChecked",
      },
    },
    _hover: {
      boxShadow: "checkboxes ",
    },
  },
});
export const checkboxTheme = defineMultiStyleConfig({
  baseStyle,
  sizes,
  defaultProps: {
    size: "md",
  },
});
