import { menuAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/styled-system";
import { defaultBaseStyle } from "./defaultBaseStyle";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(menuAnatomy.keys);
const sizes = {
  sm: definePartsStyle({
    button: {
      ...defaultBaseStyle,
      borderRadius: "lg",
      fontSize: "sm",

      h: 8,
      maxH: 8,
      minH: 8,
    },
    item: {
      ...defaultBaseStyle,
      borderRadius: "none",
      borderWidth: "none",
      fontSize: "sm",
    },
    h: 8,
    maxH: 8,
    minH: 8,
  }),
  md: definePartsStyle({
    button: {
      ...defaultBaseStyle,
      fontSize: "md",
      h: 12,
      minH: 12,
      maxH: 12,
    },
    item: {
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
    button: {
      ...defaultBaseStyle,

      fontSize: "base",
      h: 14,
      minH: 14,
      maxH: 14,
    },
    item: {
      ...defaultBaseStyle,
      borderRadius: "none",
      borderWidth: "none",

      fontSize: "sm",
      h: 14,
      minH: 14,
      maxH: 14,
    },
  }),
};
const baseStyle = definePartsStyle({
  // define the part you're going to style
  button: {
    ...defaultBaseStyle,

    // this will style the MenuButton component
    // fontWeight: "medium",
    // bg: "teal.500",
    // color: "gray.200",
    // _hover: {
    //   bg: "teal.600",
    //   color: "white",
    // },
  },
  list: {
    // ...defaultBaseStyle,
    // this will style the MenuList component
    // py: "4",
    // borderRadius: "xl",
    // border: "none",
    // bg: "teal.500",
  },
  item: {
    // this will style the MenuItem and MenuItemOption components
    // color: "gray.200",
    // _hover: {
    //   bg: "teal.600",
    // },
    // _focus: {
    //   bg: "teal.600",
    // },
  },
  groupTitle: {
    // this will style the text defined by the title prop
    // in the MenuGroup and MenuOptionGroup components
    // textTransform: "uppercase",
    // color: "white",
    // textAlign: "center",
    // letterSpacing: "wider",
    // opacity: "0.7",
  },
  command: {
    // this will style the text defined by the command
    // prop in the MenuItem and MenuItemOption components
    // opacity: "0.8",
    // fontFamily: "mono",
    // fontSize: "sm",
    // letterSpacing: "tighter",
    // pl: "4",
  },
  divider: {
    // this will style the MenuDivider component
    // my: "4",
    // borderColor: "white",
    // borderBottom: "2px dotted",
  },
});
// export the base styles in the component theme
export const menuTheme = defineMultiStyleConfig({
  baseStyle,
  sizes,
  defaultProps: {
    size: "md",
    focusBorderColor: "alpha.text20",
  },
});
