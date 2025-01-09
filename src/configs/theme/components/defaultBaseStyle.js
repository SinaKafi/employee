export const _disabled = {
  // bg: 'alpha.200',
  color: "alpha.500",
};

export const defaultBaseStyle = {
  bg: "transparent",
  fontSize: "sm",
  h: "auto",
  fontWeight: "medium",
  fontStyle: "normal",
  borderRadius: "lg",
  borderWidth: 1,
  maxH: "12",
  minH: "4",
  color: "alpha.text50",
  _invalid: {
    borderWidth: 1,
    borderColor: "error.500",
  },
  _placeholder: {
    color: _disabled.color,
  },
};
