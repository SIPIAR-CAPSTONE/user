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

const SelectFormField = (props) => {
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
        placeholderStyle={{
          fontSize: theme.fontSize.sm,
          color: "darkgray",
        }}
        selectedTextStyle={{
          fontSize: theme.fontSize.sm,
        }}
        itemTextStyle={{ fontSize: theme.fontSize.sm }}
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

const BirthdayFormField = (props) => {
  const { label, error, setDate, date, ...inputProps } = props;
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const formattedDate = date.toISOString().split("T")[0];

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

const TextFormField = (props) => {
  const theme = useTheme();

  const { label, error, disabled, ...inputProps } = props;

  return (
    <View>
      <TextInput
        editable={!disabled}
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
          editable={!disabled}
          secureTextEntry={!toggleEye}
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
  birthdayTextFieldContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
