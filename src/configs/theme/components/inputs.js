import { inputAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/styled-system";
import { defaultBaseStyle } from "./defaultBaseStyle";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(inputAnatomy.keys);
const sizes = {
  sm: definePartsStyle({
    field: {
      ...defaultBaseStyle,
      fontSize: "sm",
      h: 8,
      maxH: 8,
      minH: 8,
    },
    element: {
      ...defaultBaseStyle,
      borderRadius: "none",
      borderWidth: "none",
      fontSize: "sm",
    },
    h: 8,
    maxH: 8,
    minH: 8,
  }),
  base: definePartsStyle({
    field: {
      ...defaultBaseStyle,
      fontSize: "md",
      h: 10,
      minH: 10,
      maxH: 10,
    },
    element: {
      ...defaultBaseStyle,
      borderRadius: "none",
      borderWidth: "none",
      h: 12,
      minH: 12,
      maxH: 12,
      fontSize: "sm",
    },
  }),
  md: definePartsStyle({
    field: {
      ...defaultBaseStyle,
      fontSize: "md",
      h: 12,
      minH: 12,
      maxH: 12,
    },
    element: {
      ...defaultBaseStyle,
      borderRadius: "none",
      borderWidth: "none",
      h: 12,
      minH: 12,
      maxH: 12,
      fontSize: "sm",
    },
  }),
  lg: definePartsStyle({
    field: {
      ...defaultBaseStyle,

      fontSize: "base",
      h: 14,
      minH: 14,
      maxH: 14,
    },
    element: {
      ...defaultBaseStyle,
      borderRadius: "none",
      borderWidth: "none",
      fontWeight: "normal",
      fontSize: "sm",
      h: 14,
      minH: 14,
      maxH: 14,
    },
  }),
};

const baseStyle = definePartsStyle({
  group: {
    gap: "8",
  },
  field: {
    ...defaultBaseStyle,
    fontSize: "lg",
    // px: "25rem",
  },
  element: {
    ...defaultBaseStyle,
    mx: 2,
    px: 2,
    borderRadius: "none",
    borderWidth: "none",
  },
});
const variants = {
  success: definePartsStyle({
    field: {
      borderColor: "success.500",
    },
  }),

  forSelectBox: definePartsStyle({
    field: {
      border: "none",

      py: "2xl",
      // borderColor: "success.500",
      bg: "gray.100",
      borderRadius: "0 0 8px 8px  ",
    },
  }),
  productSearch: definePartsStyle({
    field: {
      border: "none",
      backgroundColor: "alpha.white",
      py: "2xl",
      bg: "gray.100",
      borderRadius: "8px 8px 8px 8px",
    },
  }),
};
export const InputComponent = defineMultiStyleConfig({
  baseStyle,
  sizes,
  variants,
  defaultProps: {
    sizes: "md",
    errorBorderColor: "error.500",
    focusBorderColor: "alpha.text20",
  },
});

export const InputSelectComponent = {
  baseStyle: {
    field: {
      ...defaultBaseStyle,
      fontSize: "lg",
      // px: "25rem",
    },
    element: {
      ...defaultBaseStyle,
      mx: 1,

      borderRadius: "none",
      borderWidth: "none",
    },
  },
  sizes: {
    sm: {
      field: {
        ...defaultBaseStyle,
        fontSize: "sm",
        h: 8,
        maxH: 8,
        minH: 8,
      },
      element: {
        ...defaultBaseStyle,
        borderRadius: "none",
        borderWidth: "none",
      },
      h: 8,
      maxH: 8,
      minH: 8,
    },
    md: {
      field: {
        ...defaultBaseStyle,
        fontSize: "md",
        h: 3,
        minH: 3,
        maxH: 3,
      },
      element: {
        ...defaultBaseStyle,
        borderRadius: "none",
        borderWidth: "none",
        h: 3,
        minH: 3,
        maxH: 3,
        fontSize: "sm",
      },
    },
    lg: {
      field: {
        ...defaultBaseStyle,

        fontSize: "base",
        h: 14,
        minH: 14,
        maxH: 14,
      },
      element: {
        ...defaultBaseStyle,
        borderRadius: "none",
        borderWidth: "none",
        fontSize: "sm",
        h: 14,
        minH: 14,
        maxH: 14,
      },
    },
  },
  variants: {
    success: {
      field: {
        borderColor: "success.500",
      },
    },
  },
  defaultProps: {
    sizes: "md",
    errorBorderColor: "error.500",
    focusBorderColor: "primary.500",
  },
};
