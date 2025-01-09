export const createColorPallet = (input) => {
  let pallet = {
    dark: {},
  };
  Object.entries(input).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      pallet[key] = value[0];
      pallet.dark[key] = value[1];
    } else {
      pallet[key] = value;
    }
  });
  return pallet;
};

export const createWithOpacityColor = (color) => {
  let colors = {};
  const opacities = [
    { value: "0D", name: 5 },
    { value: "1A", name: 10 },
    { value: "26", name: 15 },
    { value: "33", name: 20 },
    { value: "40", name: 25 },
    { value: "4D", name: 30 },
    { value: "59", name: 35 },
    { value: "66", name: 40 },
    { value: "73", name: 45 },
    { value: "80", name: 50 },
    { value: "8C", name: 55 },
    { value: "99", name: 60 },
    { value: "A6", name: 65 },
    { value: "B3", name: 70 },
    { value: "BF", name: 75 },
    { value: "CC", name: 80 },
    { value: "D9", name: 85 },
    { value: "E6", name: 90 },
    { value: "F2", name: 95 },
  ];

  opacities.forEach(({ value, name }) => {
    colors[name] = `${color}${value}`;
  });
  return colors;
};

export const getDynamicSpaces = (value) => {
  let spaces = {};
  for (let i = 0; i <= value; i++) {
    spaces[i] = `${i / 16}rem`;
    // spaces[i] = `${i}px`;
  }
  return spaces;
};

export const getCssVarByName = (name) => `var(--project-colors-${name})`;

const mergeGivenColorsWithChildren = (colors, name = "") => {
  let temp = [];
  Object.entries(colors).forEach(([key, value]) => {
    if (typeof value === "object") {
      const newTemp = mergeGivenColorsWithChildren(value, key).map((item) =>
        typeof value === "string" ? name + key + "-" + item : key + "-" + item
      );
      temp = [...temp, ...newTemp];
    } else {
      temp.push(key);
    }
  });
  return temp;
};

export const createThemeColorMode = (name, props, mode) => {
  let tempLight = props.theme.colors;
  let tempDark = props.theme.colors.dark;
  const key = `--project-colors-${name}`;
  const nameLayers = name.split("-");

  nameLayers.forEach((item) => {
    if (tempLight[item]) {
      tempLight = tempLight[item];
    }
    if (tempDark[item]) {
      tempDark = tempDark[item];
    }
  });

  return {
    [key]: mode(tempLight, tempDark)(props),
  };
};

export const createRootObject = (props, mode) => {
  let temp = {};
  mergeGivenColorsWithChildren(props.theme.colors.dark).forEach((item) => {
    temp = { ...temp, ...createThemeColorMode(item, props, mode) };
  });
  return temp;
};

export const getCSSVarFromColorName = (chakraColors, name = "") => {
  const tailwindColors = {};

  Object.entries(chakraColors).forEach(([key, value]) => {
    if (typeof value === "object") {
      tailwindColors[key] = getCSSVarFromColorName(
        value,
        name ? name + "-" + key : key
      );
    } else {
      // let { red, green, blue } = hexToRGBA(value);
      tailwindColors[key] = `var(--project-colors-${
        name ? name + "-" : ""
      }${key})`;
    }
  });

  return tailwindColors;
};
