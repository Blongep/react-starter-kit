import { extendTheme } from "@mui/joy/styles";
import { experimental_extendTheme as materialExtendTheme } from "@mui/material/styles";

export const themeJoy = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        background: {
          backdrop: "#2c0405",
          body: "#2c0405",
        },
        primary: {
          50: "#C0CCD9",
          100: "#A5B8CF",
          200: "#6A96CA",
          300: "#4886D0",
          400: "#2178DD",
          500: "#096BDE",
          600: "#1B62B5",
          700: "#265995",
          800: "#2F4968",
          900: "#2F3C4C",
        },
      },
    },
  },
});
export const themeMui = materialExtendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: "#ffe473",
        },
        secondary: {
          main: "#ffaf1c",
        },
        background: {
          paper: "#2c0405",
          default: "#2c0405",
        },
      },
    },
  },
});
