import * as defaultTheme from "./theme.config";
let internalQuery = [
  { name: "Sm", value: themeConfig.breakpoints["sm"] },
  { value: themeConfig.breakpoints["md"], name: "Md" },
  { value: themeConfig.breakpoints["lg"], name: "Lg" },
  { value: themeConfig.breakpoints["xl"], name: "Xl" },
  { name: "Xxl", value: themeConfig.breakpoints["2xl"] },
  { value: themeConfig.breakpoints["container"], name: "Container" },
];

let smallerEnume = [
  "isSmallerThanSm",
  "isSmallerThanMd",
  "isSmallerThanLg",
  "isSmallerThanXl",
  "isSmallerThanXxl",
  "isSmallerThanTablet",
];

let largerEnume = [
  "isLargerThanSm",
  "isLargerThanMd",
  "isLargerThanLg",
  "isLargerThanXl",
  "isLargerThanXxl",
  "isLargerThanTablet",
];

const windowResizeUpdater = () => {
  let ourQuery = {};
  var i = 0;
  for (i; i < internalQuery.length; i++) {
    {
      (ourQuery[largerEnume[i]] = !!(
        Number(Number(internalQuery[i]?.value?.split("em")[0]) * 16) <=
        Number(window?.innerWidth)
      )),
        (ourQuery[smallerEnume[i]] = !!(
          Number(Number(internalQuery[i]?.value?.split("em")[0]) * 16) >=
          Number(window?.innerWidth)
        ));
    }
  }
  return ourQuery;
};
module.exports = {
  internalQuery,
  smallerEnume,
  largerEnume,
  windowResizeUpdater,
};
