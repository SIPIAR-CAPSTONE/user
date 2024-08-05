import { View, TextInput as RNTextInput, Text } from "react-native";
import { useState } from "react";
import { IconButton } from "react-native-paper";
import { useStyles, createStyleSheet } from "../../hooks/useStyles";

const TextInput = ({
  value,
  onChangeText,
  type,
  placeholder,
  label,
  error,
  size,
  variant,
  disabled = false,
  ...props
}) => {
  const { styles, theme } = useStyles(stylesheet);
  const [toggleEye, setToggleEye] = useState(false);
  const handleToggle = () => setToggleEye((prevToggleEye) => !prevToggleEye);

  return (
    <View>
      {label && (
        <Text style={[styles.label, styles.label.variants.variant[variant]]}>
          {label}
        </Text>
      )}
      <RNTextInput
        editable={!disabled}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.typography.secondary}
        inputMode={type || "text"}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={type == "password" && !toggleEye}
        style={[
          styles.input,
          disabled && styles.inputDisabled,
          error && styles.inputError,
          styles.input.variants.variant[variant],
        ]}
        cursorColor={theme.colors.typography.tertiary}
        selectionColor="lightgray"
        {...props}
      />
      {error && (
        <Text variant="bodySmall" style={styles.errorLabel}>
          {error}
        </Text>
      )}
      {type == "password" && (
        <ToggleEyeIcon
          toggleEye={toggleEye}
          onPress={handleToggle}
          size={20}
          theme={theme}
          styles={styles}
        />
      )}
    </View>
  );
};

const ToggleEyeIcon = ({ toggleEye, onPress, size, theme, styles }) => {
  return (
    <View style={styles.toggleContainer}>
      {toggleEye ? (
        <IconButton
          onPress={onPress}
          icon="eye"
          size={size}
          color={theme.colors.typography.tertiary}
        />
      ) : (
        <IconButton
          onPress={onPress}
          icon="eye-off"
          size={size}
          color={theme.colors.typography.tertiary}
        />
      )}
    </View>
  );
};

export default TextInput;

const stylesheet = createStyleSheet((theme) => ({
  input: {
    backgroundColor: theme.colors.secondary,
    color: theme.colors.typography.primary,
    height: 50,
    paddingHorizontal: 14,
    borderRadius: theme.borderRadius.sm,

    variants: {
      variant: {
        outlined: {
          borderWidth: 1,
          borderColor: "#e1e2e3",
          color: theme.colors.typography.primary,
          backgroundColor: theme.colors.background,
        },
      },
    },
  },
  inputDisabled: {
    color: theme.colors.typography.tertiary,
  },
  inputError: {
    borderWidth: 1.5,
    color: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  errorLabel: {
    paddingStart: 14,
    paddingTop: 4,
    marginBottom: 4,
    color: theme.colors.primary,
  },
  toggleContainer: {
    position: "absolute",
    right: 3,
    top: 1,
  },
  label: {
    color: theme.colors.typography.tertiary,
    fontWeight: "500",
    marginBottom: 8,

    variants: {
      variant: {
        outlined: {
          color: theme.colors.typography.primary,
        },
      },
    },
  },
}));
