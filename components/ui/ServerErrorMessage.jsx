import { Text } from "react-native-paper";
import { createStyleSheet, useStyles } from "../../hooks/useStyles";

export default function ServerErrorMessage({ style, children, ...props }) {
  const { styles } = useStyles(stylesheet);
  return (
    <Text style={[styles.serverErrorMessage, style]} {...props}>
      {children}
    </Text>
  );
}

const stylesheet = createStyleSheet((theme) => ({
  serverErrorMessage: {
    color: theme.colors.primary,
  },
}));
