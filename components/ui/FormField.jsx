import { StyleSheet, TextInput, View, Button } from "react-native";
import { Text, useTheme } from "react-native-paper";

const BirthdayFormField = (props) => {
  const { label, error, ...inputProps } = props;
  const theme = useTheme();

  return (
    <View>
      <Button title="birthday" />
      {error && (
        <Text
          variant="bodySmall"
          style={[styles.errorLabel, { color: theme.colors.primary }]}
        >
          {error}
        </Text>
      )}
    </View>
  );
};

const TextFormField = (props) => {
  const theme = useTheme();

  const { label, error, ...inputProps } = props;

  return (
    <View>
      <TextInput
        placeholder={label}
        style={[
          error && styles.textInputError,
          styles.textInput,
          {
            backgroundColor: theme.colors.secondary,
            borderRadius: theme.borderRadius.base,
          },
        ]}
        {...inputProps}
      />
      {error && (
        <Text
          variant="bodySmall"
          style={[styles.errorLabel, { color: theme.colors.primary }]}
        >
          {error}
        </Text>
      )}
    </View>
  );
};

export { TextFormField, BirthdayFormField };

const styles = StyleSheet.create({
  textInput: {
    height: 60,
    padding: 14,
  },
  textInputError: {
    borderWidth: 1.5,
    borderColor: "red",
  },
  errorLabel: {
    paddingStart: 14,
    paddingTop: 4,
    marginBottom: 4,
  },
});
