import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Text, TouchableRipple } from "react-native-paper";
import DatePicker from "react-native-date-picker";
import { Ionicons } from "@expo/vector-icons";
import { useStyles, createStyleSheet } from "../../hooks/useStyles";
import useBoundStore from "../../zustand/useBoundStore";

const BirthdatePicker = ({
  placeholder = "Birthday",
  label,
  error,
  date = "2024-07-27T06:42:51.927Z",
  setDate,
  disabled,
  variant,
}) => {
  const { styles, theme } = useStyles(stylesheet);
  const [open, setOpen] = useState(false);
  const currentThemeStatus = useBoundStore((state) => state.currentThemeStatus);

  const dateValue = new Date(date) || new Date();
  const formattedDate = dateValue.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const handleOnCancel = () => setOpen(false);
  const handleOnPress = () => setOpen(true);
  const handleOnConfirm = (date) => {
    setOpen(false);
    setDate("birthday", date);
  };

  return (
    <View>
      {label && <Text style={styles.label}>{label}</Text>}
      <DatePicker
        modal
        mode="date"
        theme={currentThemeStatus}
        open={open}
        date={dateValue}
        buttonColor={theme.colors.text}
        dividerColor={theme.colors.text}
        title={" "}
        onConfirm={handleOnConfirm}
        onCancel={handleOnCancel}
      />
      <TouchableRipple
        borderless
        style={[
          styles.input,
          disabled && styles.inputDisabled,
          error && styles.inputError,
          styles.input.variants.variant[variant],
        ]}
        onPress={handleOnPress}
      >
        <View style={styles.birthdayFieldContent}>
          <Text style={styles.birthdayPlaceholder}>{placeholder}</Text>
          <View style={styles.dateValueContainer}>
            <Text style={styles.birthdayDate}>{formattedDate}</Text>
            <Ionicons
              name="calendar-clear"
              size={18}
              color={theme.colors.text}
            />
          </View>
        </View>
      </TouchableRipple>
      {error && (
        <Text variant="bodySmall" style={styles.errorLabel}>
          {error}
        </Text>
      )}
    </View>
  );
};

export default BirthdatePicker;

const stylesheet = createStyleSheet((theme) =>
  StyleSheet.create({
    input: {
      backgroundColor: theme.colors.secondary,
      color: theme.colors.text,
      height: 50,
      paddingHorizontal: 14,
      borderRadius: theme.borderRadius.sm,

      variants: {
        variant: {
          outlined: {
            borderWidth: 1,
            borderColor: "#e1e2e3",
            color: theme.colors.text,
            backgroundColor: theme.colors.background,
          },
        },
      },
    },
    inputDisabled: {
      color: theme.colors.text3,
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
    birthdayFieldContent: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    dateValueContainer: {
      flexDirection: "row",
      alignItems: "center",
      columnGap: theme.spacing.md,
    },
    birthdayDate: {
      color: theme.colors.text2,
    },
    birthdayPlaceholder: {
      color: theme.colors.text2,
    },
    label: {
      color: theme.colors.text,
      fontWeight: "600",
      marginBottom: 8,
    },
  })
);
