import { createColorPallet, createWithOpacityColor } from "./util.module";

const customColors = {
  transparent: "transparent",
  current: "currentColor",
  black: "#000000",
  white: "#FFFFFF",
  greyBlue: "#ECEFF3",
  secondaryGray: "#F5F8FA",
  alert: "#36C1F2",
  primary: [
    {
      50: "#ffa3a3",
      100: "#ff9494",
      200: "#ff8584",
      300: "#ff7675",
      400: "#ff6766",
      500: "#FF5857",
      600: "#e7504f",
      700: "#d04847",
      800: "#b9403f",
      900: "#a23837",
      1000: "#8b302f",
      opacity: createWithOpacityColor("#FF5857"),
    },
    {
      50: "#ffa3a3",
      100: "#ff9494",
      200: "#ff8584",
      300: "#ff7675",
      400: "#ff6766",
      500: "#FF5857",
      600: "#e7504f",
      700: "#d04847",
      800: "#b9403f",
      900: "#a23837",
      1000: "#8b302f",
      opacity: createWithOpacityColor("#FF5857"),
    },
  ],
  secondary: [
    {
      50: "#cdf7ec",
      100: "#acf2df",
      200: "#83ebd0",
      300: "#59e4c0",
      400: "#2fdeb0",
      500: "#06d7a0",
      600: "#05b385",
      700: "#048f6b",
      800: "#036c50",
      900: "#024835",
      1000: "#012b20",
      opacity: createWithOpacityColor("#06d7a0"),
    },
    {
      50: "#cdf7ec",
      100: "#acf2df",
      200: "#83ebd0",
      300: "#59e4c0",
      400: "#2fdeb0",
      500: "#06d7a0",
      600: "#05b385",
      700: "#048f6b",
      800: "#036c50",
      900: "#024835",
      1000: "#012b20",
      opacity: createWithOpacityColor("#06d7a0"),
    },
  ],
  error: [
    {
      50: "#FFEBE9",
      100: "#FED7D7",
      200: "#FEB2B2",
      300: "#FC8181",
      400: "#F56565",
      500: "#B81203",
      600: "#C53030",
      700: "#9B23C2C",
      800: "#822727",
      900: "#63171B",
      opacity: createWithOpacityColor("#B81203"),
    },
    {
      50: "#63171B",
      100: "#822727",
      200: "#9B2C2C",
      300: "#C53030",
      400: "#B81203",
      500: "#F56565",
      600: "#FC8181",
      700: "#FEB2B2",
      800: "#FED7D7",
      900: "#FFEBE9",
      opacity: createWithOpacityColor("#B81203"),
    },
  ],
  success: [
    {
      50: "#E6FFE7",
      100: "#C6F6D5",
      200: "#9AE6B4",
      300: "#68D391",
      400: "#48BB78",
      500: "#0F8213",
      600: "#2F855A",
      700: "#276749",
      800: "#22543D",
      900: "#1C4532",
      opacity: createWithOpacityColor("#0F8213"),
    },
    {
      50: "#1C4532",
      100: "#22543D",
      200: "#276749",
      300: "#2F855A",
      400: "#0F8213",
      500: "#48BB78",
      600: "#68D391",
      700: "#9AE6B4",
      800: "#C6F6D5",
      900: "#E6FFE7",
      opacity: createWithOpacityColor("#1CB8A3"),
    },
  ],
  warning: [
    {
      50: "#FFFAF0",
      100: "#FEEBC8",
      200: "#FBD38D",
      300: "#F6AD55",
      400: "#ED8936",
      500: "#DD6B20",
      600: "#C05621",
      700: "#9C4221",
      800: "#7B341E",
      900: "#652B19",
      opacity: createWithOpacityColor("#DD6B20"),
    },
    {
      50: "#FFFAF0",
      100: "#FEEBC8",
      200: "#FBD38D",
      300: "#F6AD55",
      400: "#ED8936",
      500: "#DD6B20",
      600: "#C05621",
      700: "#9C4221",
      800: "#7B341E",
      900: "#652B19",
      opacity: createWithOpacityColor("#DD6B20"),
    },
  ],
};
const colorPallet = {
  ...customColors,
  shadow: [
    {
      0: `${customColors.black}01`,
      1: `${customColors.black}01`,
      2: `${customColors.black}22`,
      3: `${customColors.black}02`,
      4: `${customColors.black}10`,
      5: `${customColors.black}02`,
      6: `${customColors.black}10`,
      7: `${customColors.black}01`,
      8: `${customColors.black}10`,
      9: `${customColors.black}03`,
      10: `${customColors.black}11`,
      11: `${customColors.black}04`,
      12: `${customColors.black}10`,
      13: `${customColors.black}01`,
      14: `${customColors.black}13`,
      15: `${customColors.black}23`,
    },
    {
      0: `${customColors.white}01`,
      1: `${customColors.white}01`,
      2: `${customColors.white}22`,
      3: `${customColors.white}02`,
      4: `${customColors.white}10`,
      5: `${customColors.white}02`,
      6: `${customColors.white}10`,
      7: `${customColors.white}01`,
      8: `${customColors.white}10`,
      9: `${customColors.white}03`,
      10: `${customColors.white}11`,
      11: `${customColors.white}04`,
      12: `${customColors.white}10`,
      13: `${customColors.white}01`,
      14: `${customColors.white}13`,
      15: `${customColors.white}23`,
    },
  ],
  alpha: [
    {
      border: "#E3E8EE",
      text10: "#C2C4C6",
      text20: "#85898D",
      text30: "#8094a1",
      text40: "#557082",
      text50: "#2a4c62",
      textMain: "#494F55",
      black: "#000000",
      white: "#ffffff",
      halfWhite: "#f5f9ff",
      sidebarMain: "#E8F4FF",
      blueGray: "#F5F6F8",
      secondaryMain: "#348AE1",
      primaryBg: "#FFEFEF",
      opacity: createWithOpacityColor("#494F55"),
    },
    {
      border: "#E3E8EE",
      text10: "#C2C4C6",
      text20: "#85898D",
      text30: "#8094a1",
      text40: "#557082",
      text50: "#2a4c62",
      textMain: "#494F55",
      black: "#000000",
      white: "#ffffff",
      halfWhite: "#f5f9ff",
      sidebarMain: "#E8F4FF",
      blueGray: "#F5F6F8",
      secondaryMain: "#348AE1",
      primaryBg: "#FFEFEF",

      opacity: createWithOpacityColor("#494F55"),
    },
  ],
};

export default {
  ...createColorPallet(colorPallet),
};