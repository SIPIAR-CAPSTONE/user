import { Button } from "react-native-paper";
import { useTheme } from "react-native-paper";

const PrimaryButton = ({ label, onPress, isLoading, ...buttonProps }) => {
  const theme = useTheme();

  return (
    <Button
      mode="contained"
      onPress={onPress}
      contentStyle={{ padding: theme.padding.button.base }}
      labelStyle={{ fontSize: theme.fontSize.base }}
      style={{ borderRadius: theme.borderRadius.base }}
      disabled={isLoading}
      loading={isLoading}
      {...buttonProps}
    >
      {label}
    </Button>
  );
};

export default PrimaryButton;
