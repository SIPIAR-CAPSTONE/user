import { StyleSheet, View, TextInput } from "react-native";
import DatePicker from "react-native-date-picker";
import { Text, useTheme, TouchableRipple } from "react-native-paper";
import { useMemo, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { Dropdown } from "react-native-element-dropdown";
import useBoundStore from "../../zustand/useBoundStore";

const TextFormField = (props) => {
  const theme = useTheme();
  const styles = useMemo(() => makeStyles(theme), [theme]);

  const { label, error, ...inputProps } = props;

  return (
    <View>
      <Text variant="bodyMedium" style={styles.label}>
        {label}
      </Text>
      <TextInput
        style={[styles.textInput, error && styles.textInputError]}
        {...inputProps}
      />
      {error && (
        <Text variant="bodySmall" style={styles.errorLabel}>
          {error}
        </Text>
      )}
    </View>
  );
};

const SelectFormField = (props) => {
  const { onChange, items, label, value, error, ...inputProps } = props;
  const theme = useTheme();
  const styles = useMemo(() => makeStyles(theme), [theme]);

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
        containerStyle={styles.dropdownContainer}
        placeholderStyle={styles.dropdownPlaceholder}
        selectedTextStyle={styles.dropdownText}
        itemTextStyle={styles.dropdownText}
        style={[
          error && styles.textInputError,
          styles.textInput,
          {
            color: theme.colors.text,
          },
        ]}
        {...inputProps}
      />
      {error && (
        <Text variant="bodySmall" style={styles.errorLabel}>
          {error}
        </Text>
      )}
    </View>
  );
};

const BirthdayFormField = (props) => {
  const theme = useTheme();
  const styles = useMemo(() => makeStyles(theme), [theme]);

  const { label, error, setDate, givenDate } = props;
  const [open, setOpen] = useState(false);

  const currentThemeStatus = useBoundStore((state) => state.currentThemeStatus);
  //change string date to date object to make it work with DatePicker component

  /**
   *
   * The date data from database is in string format
   * To make it work with date picker component,
   * I converted it to date object before using it in date picker
   *
   */
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
          styles.birthdayFormField,
        ]}
        onPress={() => setOpen(true)}
      >
        <Text style={styles.birthdayDate}>{formattedDate}</Text>
      </TouchableRipple>
      {error && (
        <Text variant="bodySmall" style={styles.errorLabel}>
          {error}
        </Text>
      )}
    </View>
  );
};

export { TextFormField, BirthdayFormField, SelectFormField };

const makeStyles = ({ colors, fontSize, borderRadius }) =>
  StyleSheet.create({
    label: {
      fontWeight: "bold",
      marginBottom: 4,
      marginTop: 12,
    },
    textInput: {
      height: 46,
      paddingHorizontal: 14,
      borderWidth: 1,
      borderRadius: borderRadius.xs,
      borderColor: colors.secondary,
      color: colors.typography.primary,
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
    dropdownContainer: {
      backgroundColor: colors.background,
      borderColor: colors.outline,
    },
    dropdownPlaceholder: {
      fontSize: fontSize.sm,
      color: "darkgray",
    },
    dropdownText: {
      fontSize: fontSize.sm,
      color: colors.typography.primary,
    },
    birthdayFormField: {
      justifyContent: "center",
    },
    birthdayLabel: {
      color: colors.typography.secondary,
    },
    birthdayDate: {
      color: colors.typography.primary,
    },
  });
