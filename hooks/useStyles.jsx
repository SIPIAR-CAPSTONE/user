import { useMemo } from "react";
import { StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";

const useStyles = (styles) => {
  const theme = useTheme();

  return useMemo(
    () => ({ styles: styles(theme), theme: theme }),
    [theme, styles]
  );
};

const createStyleSheet = (styles) => {
  return (theme) => StyleSheet.create(styles(theme));
};

export { useStyles, createStyleSheet };
