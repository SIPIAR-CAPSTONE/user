import { StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { useTheme } from "react-native-paper";

const PrimaryButton = (props) => {
  const theme = useTheme();

  const { label, onPress, ...buttonProps } = props;

  return (
    <Button
      mode="contained"
      onPress={onPress}
      contentStyle={{ padding: theme.padding.button.base }}
      labelStyle={{ fontSize: theme.fontSize.base }}
      style={{ borderRadius: theme.borderRadius.base }}
      {...buttonProps}
    >
      {label}
    </Button>
  );
};

export default PrimaryButton;
