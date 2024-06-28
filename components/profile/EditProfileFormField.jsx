import { StyleSheet, View, TextInput } from "react-native";
import DatePicker from "react-native-date-picker";
import { Text, useTheme, TouchableRipple } from "react-native-paper";
import { useState } from "react";

const TextFormField = (props) => {
  const theme = useTheme();

  const { label, error, ...inputProps } = props;

  return (
    <View>
      <Text variant="bodyMedium" style={styles.label}>
        {label}
      </Text>
      <TextInput
        style={[
          styles.textInput,
          {
            borderRadius: theme.borderRadius.xs,
            borderColor: theme.colors.secondary,
          },
          error && styles.textInputError,
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

const BirthdayFormField = (props) => {
  const theme = useTheme();

  const { label, error, setDate, givenDate, ...inputProps } = props;
  const [open, setOpen] = useState(false);
  const formattedDate = date;
  // const date = Date.parse(givenDate)

  return (
    <View>
      <DatePicker
        modal
        mode="date"
        theme="light" // TODO: change this based on currentTheme global state
        open={open}
        date={date}
        onConfirm={(date) => {
          setOpen(false);
          setDate("birthday", date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
      <TouchableRipple
        style={[
          error && styles.textInputError,
          styles.textInput,
          {
            justifyContent: "center",
            backgroundColor: theme.colors.secondary,
            borderRadius: theme.borderRadius.base,
          },
        ]}
        onPress={() => setOpen(true)}
      >
        <View style={styles.birthdayTextFieldContent}>
          <Text style={{ color: "darkgray" }}>Birthday</Text>
          <Text style={{ color: "darkgray" }} variant="bodySmall">
            {formattedDate}
          </Text>
        </View>
      </TouchableRipple>
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
  label: {
    fontWeight: "bold",
    marginBottom: 4,
    marginTop: 12,
  },
  textInput: {
    height: 46,
    paddingHorizontal: 14,
    borderWidth: 1,
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
