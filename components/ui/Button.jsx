import { Button as NPButton } from "react-native-paper";
import { useStyles, createStyleSheet } from "../../hooks/useStyles";
import { StyleSheet } from "react-native";

const Button = ({
  label = "",
  onPress,
  isLoading,
  variant = "contained",
  style: customStyle,
  marginVertical,
  ...buttonProps
}) => {
  const { styles } = useStyles(stylesheet);

  return (
    <NPButton
      mode={variant}
      onPress={onPress}
      labelStyle={styles.buttonLabel}
      style={[
        styles.button,
        { marginVertical },
        styles.variant[variant],
        customStyle,
      ]}
      contentStyle={styles.buttonContent}
      disabled={isLoading}
      loading={isLoading}
      {...buttonProps}
    >
      {label}
    </NPButton>
  );
};

export default Button;

const stylesheet = createStyleSheet((theme) =>
  StyleSheet.create({
    button: {
      borderRadius: theme.borderRadius.base,
      width: "100%",
    },
    buttonLabel: {
      fontSize: theme.fontSize.base,
    },
    buttonContent: {
      padding: theme.padding.button.base,
    },

    variant: {
      contained: {},
      outlined: {
        borderColor: theme.colors.primary,
        borderWidth: 2,
        backgroundColor: theme.colors.background,
      },
      text: {
        backgroundColor: theme.colors.background,
      },
    },
  })
);
