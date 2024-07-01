import { StyleSheet, View, TextInput } from "react-native";
import DatePicker from "react-native-date-picker";
import { Text, useTheme, TouchableRipple } from "react-native-paper";
import { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { Dropdown } from "react-native-element-dropdown";
import useStore from "../../zustand/useStore";

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
            color: theme.colors.typography.primary,
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

const SelectFormField = (props) => {
  const { onChange, items, label, value, error, ...inputProps } = props;
  const theme = useTheme();

  return (
    <View>
      <Text variant="bodyMedium" style={styles.label}>
        {label}
      </Text>
      <Dropdown
        value={value}
        labelField="label"
        valueField="value"
        placeholder={label}
        data={items}
        onChange={onChange}
        renderRightIcon={() => (
          <AntDesign name="caretdown" size={10} color="darkgray" />
        )}
        activeColor={theme.colors.secondary}
        containerStyle={{
          backgroundColor: theme.colors.background,
          borderColor: theme.colors.outline,
        }}
        placeholderStyle={{
          fontSize: theme.fontSize.sm,
          color: "darkgray",
        }}
        selectedTextStyle={{
          fontSize: theme.fontSize.sm,
          color: theme.colors.typography.primary,
        }}
        itemTextStyle={{
          fontSize: theme.fontSize.sm,
          color: theme.colors.typography.primary,
        }}
        style={[
          error && styles.textInputError,
          styles.textInput,
          {
            borderRadius: theme.borderRadius.xs,
            borderColor: theme.colors.secondary,
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

const BirthdayFormField = (props) => {
  const theme = useTheme();

  const { label, error, setDate, givenDate } = props;
  const [open, setOpen] = useState(false);

  const currentThemeStatus = useStore((state) => state.currentThemeStatus);
  //change string date to date object to make it work with DatePicker component
  const date = new Date(givenDate);
  const formattedDate = date.toISOString().split("T")[0];

  return (
    <View>
      <Text variant="bodyMedium" style={styles.label}>
        {label}
      </Text>
      <DatePicker
        modal
        mode="date"
        theme={currentThemeStatus}
        open={open}
        date={date}
        buttonColor={theme.colors.typography.primary}
        dividerColor={theme.colors.typography.primary}
        title=" "
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
            borderColor: theme.colors.secondary,
            borderRadius: theme.borderRadius.xs,
          },
        ]}
        onPress={() => setOpen(true)}
      >
        <Text style={{ color: theme.colors.typography.primary }}>
          {formattedDate}
        </Text>
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

export { TextFormField, BirthdayFormField, SelectFormField };

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
