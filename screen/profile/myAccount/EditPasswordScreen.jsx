import { View, Text, ScrollView, StyleSheet } from "react-native";
import React, { useRef, useState } from "react";
import { createStyleSheet, useStyles } from "../../../hooks/useStyles";
import FormHeader from "../../../components/common/FormHeader";
import TextInput from "../../../components/ui/TextInput";
import PrimaryButton from "../../../components/ui/PrimaryButton";
import StatusBar from "../../../components/common/StatusBar";
import ConfirmationDialog from "../../../components/ui/ConfirmationDialog";

const EditPasswordScreen = () => {
  const { styles } = useStyles(stylesheet);
  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const [isConfirmationDialogVisible, setIsConfirmationDialogVisible] =
    useState(false);

  /*
   *
   * Form Validation
   *
   */
  const validateForm = () => {
    const errors = {};

    if (!form.oldPassword) errors.oldPassword = "Old Password is required.";
    if (!form.newPassword) errors.newPassword = "New Password is required.";
    if (!form.confirmNewPassword) {
      errors.confirmNewPassword = "Confirm Password is required.";
    }
    if (form.newPassword !== form.confirmNewPassword) {
      errors.confirmNewPassword =
        "Password and Confirm Password must be match.";
      errors.newPassword = "Password and Confirm Password must be match.";
    }

    setErrors(errors);

    // if error is no more than 0 means the form is valid
    return Object.keys(errors).length === 0;
  };

  const showConfirmationDialog = () => {
    //validateForm will return true if there is no error
    const isFormValid = validateForm();

    if (isFormValid) {
      setIsConfirmationDialogVisible(true);
    }
  };

  const hideConfirmationDialog = () => setIsConfirmationDialogVisible(false);

  /*
   *
   *  Handle submission for signup
   *
   */
  const handleSubmit = async () => {
    //TODO: diri and query
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.containerContent}
    >
      <View style={styles.form}>
        <FormHeader
          title="Change Password"
          desc="Please provide your old and new password."
        />

        <TextInput
          type="password"
          placeholder="Old Password"
          value={form.oldPassword}
          onChangeText={(text) => setForm({ ...form, oldPassword: text })}
          error={errors.oldPassword}
          disabled={loading}
        />
        <View style={{ height: 14 }} />
        <TextInput
          type="password"
          placeholder="New Password"
          value={form.newPassword}
          onChangeText={(text) => setForm({ ...form, newPassword: text })}
          error={errors.newPassword}
          disabled={loading}
        />
        <TextInput
          type="password"
          placeholder="Confirm New Password"
          value={form.confirmNewPassword}
          onChangeText={(text) =>
            setForm({ ...form, confirmNewPassword: text })
          }
          error={errors.confirmNewPassword}
          disabled={loading}
        />

        <PrimaryButton
          label="Submit"
          onPress={showConfirmationDialog}
          style={styles.submitButton}
          isLoading={loading}
        />
      </View>

      <ConfirmationDialog
        title="Are you sure you change your password?"
        isVisible={isConfirmationDialogVisible}
        onPressConfirmation={handleSubmit}
        onPressCancel={hideConfirmationDialog}
      />
      <StatusBar />
    </ScrollView>
  );
};

export default EditPasswordScreen;

const stylesheet = createStyleSheet((theme) =>
  StyleSheet.create({
    container: {
      paddingBottom: 70,
      paddingHorizontal: theme.padding.body.horizontal,
    },
    containerContent: {
      flex: 1,
      justifyContent: "space-between",
    },
    form: {
      rowGap: theme.gap.lg,
    },
    submitButton: {
      marginTop: 10,
      borderRadius: theme.borderRadius.base,
    },
  })
);
