import { popoverAnatomy as parts } from "@chakra-ui/anatomy";
import { mode } from "@chakra-ui/theme-tools";
import { theme as origTheme, extendTheme } from "@chakra-ui/react";
// Custom component themes and utilities
import { createRootObject } from "./util.module";
import { checkboxTheme } from "./components/checkbox";
import { RadioTheme } from "./components/radio";
import { Button } from "./components/button";
import { InputSelectComponent, InputComponent } from "./components/inputs";
import { textThemes } from "./components/texts";
import { menuTheme } from "./components/menu";
import { _disabled } from "./components/defaultBaseStyle";

// Default theme configuration
import defaultTheme from "./theme.config";
import { switchTheme } from "./components/Switch";

// Create and extend Chakra UI theme
const chakraTheme = extendTheme(
  {
    fonts: {
      heading: `yekanBold`,
      body: `yekanMedium`,
    },
    ...defaultTheme,
    styles: {
      global: (props) => ({
        ":root": createRootObject(props, mode),
        input: {
          _disabled,
        },
        select: {
          _disabled,
        },
      }),
    },
    direction: "rtl",
    config: {
      initialColorMode: "red",
      useSystemColorMode: false,
      cssVarPrefix: "project",
    },
    components: {
      Button,
      Checkbox: checkboxTheme,
      Radio: RadioTheme,
      Input: InputComponent,
      PinInput: InputComponent,
      PinInputField: InputComponent,
      Select: InputComponent,
      Menu: menuTheme,
      Heading: textThemes.heading,
      Text: textThemes.text,
      Switch: switchTheme,
    },
    variants: {
      fill: ["hover", "focus"], // Example custom variant
    },
  },
  // Apply default props to components
  {
    components: {
      Button: {
        defaultProps: {
          size: "lg",
        },
      },
      Input: {
        defaultProps: {
          size: "lg",
        },
      },
    },
  },
  // Apply default color schemes
  {
    withDefaultColorScheme: {
      colorScheme: "primary",
      components: [
        "Slider",
        "Progress",
        "Checkbox",
        "Accordion",
        "Switch",
        "Radio",
        "Textarea",
        "Button",
        "Input",
        "Select",
        "Tag",
        "Tabs",
        "Modal",
      ],
    },
  }
);

export default chakraTheme;
