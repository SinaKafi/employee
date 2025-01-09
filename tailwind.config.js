/** @type {import('tailwindcss').Config} */
import themeConfig from "./src/configs/theme/theme.config";
import { getCSSVarFromColorName } from "./src/configs/theme/util.module";
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/**/**/*.{js,ts}",
    "./src/**/**/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    spacing: themeConfig.spacing.space,
    boxShadow: themeConfig.shadows,
    fontSize: themeConfig.fontSizes,
    fontFamily: themeConfig.fonts,
    //    screens: { ...themeConfig.breakpoints, responsive: { min: "767px" } },
    //    borderWidth: themeConfig.borders,
    borderRadius: themeConfig.radii,
    //    zIndex: themeConfig.zIndices,
    //    letterSpacing: themeConfig.letterSpacings,
    //    lineHeight: themeConfig.lineHeights,
    //    fontWeight: themeConfig.fontWeights,
    colors: {
      ...getCSSVarFromColorName(themeConfig.colors),
      //      cardGradient:
      //        "linear-gradient(108.74deg, rgba(255, 255, 255, 0.24) 0%, rgba(255, 255, 255, 0.06) 100%)",
    },
    //    minHeight: (theme: any) => ({
    //      ...theme("height"),
    //      full: "100%",
    //    }),
    //    minWidth: (theme: any) => ({
    //      ...theme("width"),
    //      full: "100%",
    //    }),
    //    maxHeight: (theme: any) => ({
    //    ...theme("height"),
    //      "4/5": "80%",
    //      full: "100%",
    //    }),
    //   // maxWidth: (theme: any) => ({
    //      ...theme("width"),
    //      full: "100%",
    //    }),
    //   extend: {
    //     color: {
    //       shet: "#f4e4f4",
    //       ...getCSSVarFromColorName(themeConfig.colors),
    //       cardGradient:
    //         "linear-gradient(108.74deg, rgba(255, 255, 255, 0.24) 0%, rgba(255, 255, 255, 0.06) 100%)",
    //     },
    //     animation: {
    //       flipY: "bottomToTop 5s linear infinite",
    //     },
    //     keyframes: {
    //       bottomToTop: {
    //         from: {
    //           transform: "translateY(100%)",
    //         },
    //         to: {
    //           transform: "translateY(-100%)",
    //         },
    //       },
    //     },
    //   },
  },

  plugins: [],
};
