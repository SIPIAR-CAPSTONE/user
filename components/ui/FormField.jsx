import { StyleSheet, TextInput, View } from "react-native";
import {
  Text,
  useTheme,
  TouchableRipple,
  IconButton,
} from "react-native-paper";
import { Dropdown } from "react-native-element-dropdown";
import { AntDesign } from "@expo/vector-icons";
import DatePicker from "react-native-date-picker";
import { useState } from "react";
import useBoundStore from "../../zustand/useBoundStore";

/**
 * SelectFormField component renders a dropdown form field with a label and error message.
 * It takes in props such as onChange, items, label, value, and error.
 * @param {Object} props - The props object containing onChange, items, label, value, and error.
 */
const SelectFormField = (props) => {
  // Destructure props to get onChange, items, label, value, and error
  const { onChange, items, label, value, error, ...inputProps } = props;
  const theme = useTheme();

  return (
    <View>
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
            backgroundColor: theme.colors.secondary,
            borderRadius: theme.borderRadius.md,
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

/**
 * BirthdayFormField component is a custom form field for entering birthday.
 *
 * @param {Object} props - The props object containing the following properties:
 *   @param {string} label - The label for the form field.
 *   @param {string} error - The error message for the form field.
 *   @param {function} setDate - The function to set the date.
 *   @param {Date} date - The date value of the form field.
 *   @param {Object} inputProps - Additional props to be passed to the DatePicker component.
 */
const BirthdayFormField = (props) => {
  const { label, error, setDate, date, ...inputProps } = props;
  const theme = useTheme();

  const currentThemeStatus = useBoundStore((state) => state.currentThemeStatus);
  const [open, setOpen] = useState(false);
  // Format the date to string in ISO format
  const formattedDate = date.toISOString().split("T")[0];

  return (
    <View>
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
      {/* The Birthday  form field button */}
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
          <Text style={{ color: theme.colors.typography.secondary }}>
            Birthday
          </Text>
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

const TextFormField = (props) => {
  const theme = useTheme();

  const { label, error, disabled, ...inputProps } = props;

  return (
    <View>
      <TextInput
        editable={!disabled}
        placeholder={label}
        placeholderTextColor={theme.colors.typography.secondary}
        style={[
          error && styles.textInputError,
          styles.textInput,
          {
            backgroundColor: theme.colors.secondary,
            borderRadius: theme.borderRadius.base,
            color: theme.colors.typography.primary,
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

const PasswordFormField = (props) => {
  const theme = useTheme();

  const { label, error, disabled, ...inputProps } = props;
  const [toggleEye, setToggleEye] = useState(false);

  const handleToggle = () => {
    setToggleEye((prevToggleEye) => !prevToggleEye);
  };

  const ToggleEyeIcon = () => {
    return (
      <View
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {toggleEye ? (
          <IconButton
            onPress={handleToggle}
            icon="eye"
            size={20}
            iconColor="darkgray"
          />
        ) : (
          <IconButton
            onPress={handleToggle}
            icon="eye-off"
            size={20}
            iconColor="darkgray"
          />
        )}
      </View>
    );
  };

  return (
    <View>
      <View>
        <TextInput
          placeholder={label}
          placeholderTextColor={theme.colors.typography.secondary}
          editable={!disabled}
          secureTextEntry={!toggleEye}
          style={[
            error && styles.textInputError,
            styles.textInput,
            {
              backgroundColor: theme.colors.secondary,
              borderRadius: theme.borderRadius.base,
              color: theme.colors.typography.primary,
            },
          ]}
          {...inputProps}
        />
        <ToggleEyeIcon />
      </View>
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

export { TextFormField, BirthdayFormField, SelectFormField, PasswordFormField };

const styles = StyleSheet.create({
  textInput: {
    height: 54,
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
  birthdayTextFieldContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
