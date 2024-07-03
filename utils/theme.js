const lightTheme = {
  colors: {
    typography: {
      primary: "#000000",
      onPrimary: "#ffffff",
      secondary: "#6b6b6b",
      tertiary: "#aeaeae",
    },
    dialogBackground: "#ee4048",
    primary: "#ee4048",
    onPrimary: "#ffffff",
    primaryContainer: "#ffd8d8",
    onPrimaryContainer: "#410006",
    secondary: "#f6f6f6",
    onSecondary: "#ffffff",
    secondaryContainer: "#ffd8d8",
    onSecondaryContainer: "#2c1514",
    tertiary: "#735a2e",
    onTertiary: "#ffffff",
    tertiaryContainer: "#ffdead",
    onTertiaryContainer: "#271900",
    green: "#68cb4f",
    black: "#151515",
    onBlack: "#ffffff",
    error: "#ba1a1a",
    onError: "#ffffff",
    errorContainer: "#ffdada",
    onErrorContainer: "#410002",
    background: "#ffffff",
    onBackground: "#201a1a",
    surface: "#ffffff",
    onSurface: "#201a1a",
    surfaceVariant: "#f4dddc",
    onSurfaceVariant: "#534342",
    outline: "#857372",
    outlineVariant: "#d7c1c0",
    shadow: "#000000",
    scrim: "#000000",
    inverseSurface: "#362f2e",
    inverseOnSurface: "#fbeeed",
    inversePrimary: "#ffb3b0",
    elevation: {
      level0: "transparent",
      level1: "#fcf0f4",
      level2: "#fae9ee",
      level3: "#ffffff",
      level4: "#f7e0e5",
      level5: "#f6dbe1",
    },
    surfaceDisabled: "rgba(32, 26, 26, 0.12)",
    onSurfaceDisabled: "rgba(32, 26, 26, 0.38)",
    backdrop: "rgba(59, 45, 44, 0.4)",
  },
  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    md: 18,
    lg: 20,
    xl: 22,
    xxl: 24,
    xxxl: 28,
  },
  borderRadius: {
    xs: 4,
    sm: 6,
    base: 8,
    md: 10,
    lg: 12,
    xl: 14,
    full: 100,
  },
  padding: {
    body: {
      horizontal: 16,
      vertical: 18,
    },
    button: {
      xs: 1,
      sm: 2,
      base: 4,
      md: 6,
      lg: 8,
      xl: 10,
    },
  },
  margin: {
    heading: {
      vertical: 14,
    },
    body: {
      horizontal: 16,
      vertical: 18,
    },
  },
  gap: {
    xs: 4,
    sm: 6,
    base: 8,
    md: 10,
    lg: 12,
    xl: 14,
  },
};
const darkTheme = {
  colors: {
    typography: {
      primary: "#ffffff",
      onPrimary: "#000000",
      secondary: "#c8c8c8",
      tertiary: "#969696",
    },
    primary: "#ee4048",
    onPrimary: "#ffffff",
    primaryContainer: "#782024",
    onPrimaryContainer: "#ffdada",
    secondary: "#202020",
    onSecondary: "#ffffff",
    secondaryContainer: "#5a2d2d",
    onSecondaryContainer: "#ffdada",
    tertiary: "#967850",
    onTertiary: "#ffffff",
    tertiaryContainer: "#503c28",
    onTertiaryContainer: "#ffdead",
    green: "#68cb4f",
    black: "#ffffff",
    onBlack: "#151515",
    error: "#ff6464",
    onError: "#ffffff",
    errorContainer: "#781e1e",
    onErrorContainer: "#ffd6d6",
    background: "#121212",
    onBackground: "#e6e6e6",
    surface: "#1c1c1c",
    onSurface: "#dcdcdc",
    surfaceVariant: "#262626",
    onSurfaceVariant: "#c8c8c8",
    outline: "#646464",
    outlineVariant: "#3c3c3c",
    shadow: "#000000",
    scrim: "#000000",
    inverseSurface: "#e6e6e6",
    inverseOnSurface: "#1c1c1c",
    inversePrimary: "#ff4048",
    elevation: {
      level0: "transparent",
      level1: "#232323",
      level2: "#2d2d2d",
      level3: "#373737",
      level4: "#3c3c3c",
      level5: "#414141",
    },
    surfaceDisabled: "rgba(230, 230, 230, 0.12)",
    onSurfaceDisabled: "rgba(230, 230, 230, 0.38)",
    backdrop: "rgba(0, 0, 0, 0.5)",
  },
  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    md: 18,
    lg: 20,
    xl: 22,
    xxl: 24,
    xxxl: 28,
  },
  borderRadius: {
    xs: 4,
    sm: 6,
    base: 8,
    md: 10,
    lg: 12,
    xl: 14,
    full: 100,
  },
  padding: {
    body: {
      horizontal: 16,
      vertical: 18,
    },
    button: {
      xs: 1,
      sm: 2,
      base: 4,
      md: 6,
      lg: 8,
      xl: 10,
    },
  },
  margin: {
    heading: {
      vertical: 14,
    },
    body: {
      horizontal: 16,
      vertical: 18,
    },
  },
  gap: {
    xs: 4,
    sm: 6,
    base: 8,
    md: 10,
    lg: 12,
    xl: 14,
  },
};

const themeStatus = {
  dark: "dark",
  light: "light",
};

export { lightTheme, darkTheme, themeStatus };
