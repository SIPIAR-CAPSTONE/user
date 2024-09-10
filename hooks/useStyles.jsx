import { useMemo } from "react";
import { useTheme } from "react-native-paper";

const useStyles = (styles) => {
  const theme = useTheme();

  return useMemo(
    () => ({ styles: styles(theme), theme: theme }),
    [theme, styles]
  );
};

const createStyleSheet = (styles) => {
  return (theme) => styles(theme);
};

export { useStyles, createStyleSheet };
