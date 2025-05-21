export type ThemeMode = "light" | "dark";

export const themeConfig = {
  light: {
    colors: {
      primary: {
        50: "239 246 255", // Lighter blue
        100: "219 234 254",
        200: "191 219 254",
        300: "147 197 253",
        400: "96 165 250",
        500: "59 130 246", // Main blue
        600: "37 99 235",
        700: "29 78 216",
        800: "30 64 175",
        900: "30 58 138", // Darker blue
      },
      background: {
        primary: "56 189 248", // Sky-500
        secondary: "249 250 251", // Very light gray
        light: "255 255 255", // White
        dark: "17 24 39", // Dark text
        muted: "107 114 128", // Gray-500
        lightMuted: "229 231 235", // Light gray
      },
      text: {
        primary: "3 105 161", // Sky-700
        secondary: "56 189 248", // Sky-500
        muted: "107 114 128", // Gray-500
        lightMuted: "229 231 235", // Light gray
      },
    },
  },
  dark: {
    colors: {
      primary: {
        50: "30 58 138", // Reversed order for dark mode
        100: "30 64 175",
        200: "29 78 216",
        300: "37 99 235",
        400: "59 130 246",
        500: "96 165 250",
        600: "147 197 253",
        700: "191 219 254",
        800: "219 234 254",
        900: "239 246 255",
      },
      background: {
        primary: "17 24 39", // Dark background
        secondary: "31 41 55", // Slightly lighter dark
      },
      text: {
        primary: "249 250 251", // Almost white
        secondary: "156 163 175", // Light gray
      },
    },
  },
} as const;
