import { Text } from "react-native-paper";
import { createStyleSheet, useStyles } from "../../hooks/useStyles";

export default function ServerErrorMessage({ className, children, ...props }) {
  const { styles } = useStyles(stylesheet);
  return (
    <Text className={[styles.serverErrorMessage, className]} {...props}>
      {children}
    </Text>
  );
}

const stylesheet = createStyleSheet((theme) => ({
  serverErrorMessage: {
    color: theme.colors.primary,
  },
}));
