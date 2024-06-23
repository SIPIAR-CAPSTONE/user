import { View, StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";
import { useState } from "react";

import PrimaryButton from "../../components/ui/PrimaryButton";
import { PasswordFormField } from "../../components/ui/FormField";
import FormHeader from "../../components/common/FormHeader";
import { useNavigation } from "@react-navigation/native";

const ResetPassword = () => {
  const theme = useTheme();
  const navigation = useNavigation();

  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [errors, setErrors] = useState({});

  /*
   *
   * Form Validation
   *
   */
  const validateForm = () => {
    let errors = {};

    // Validate password field if it is empty
    if (!newPassword) {
      errors.newPassword = "Password is required.";
    }

    // Validate confirm password field if it is empty
    if (!confirmNewPassword) {
      errors.confirmNewPassword = "Confirm Password is required.";
    }

    // Validate if password and confirm password matched
    if (newPassword !== confirmNewPassword) {
      errors.confirmNewPassword =
        "Password and Confirm Password must be match.";
      errors.newPassword = "Password and Confirm Password must be match.";
    }

    // Set the errors and update form validity if it is empty
    setErrors(errors);

    // return true if there is no error
    // false if error length is greater than zero
    return Object.keys(errors).length === 0;
  };

  /*
   *
   *  Handle submission for signup
   *
   */
  const handleSubmit = () => {
    //validateForm will return true if there is no error
    const isFormValid = validateForm();

    if (isFormValid) {
      //TODO: diri pag fetch

      const resetPasswordSuccess = true; //TODO: mao ning result sa fetch
      if (resetPasswordSuccess) {
        //navigate to success confirmation screen
        navigation.navigate("SuccessConfirmation", {
          title: "Reset Password Successfully!",
          desc: "You can now login your new password credentials.",
          nextScreen: "StartingScreen",
        });
      }
    }
  };

  return (
    <View
      style={[
        styles.container,
        { paddingHorizontal: theme.padding.body.horizontal },
      ]}
    >
      {/* Form */}
      <View style={{ rowGap: theme.gap.lg }}>
        <FormHeader
          title="Reset Password"
          titleSize="large"
          desc="Set your new password for your account"
        />
        <View style={{ height: 16 }} />
        <PasswordFormField
          label="New Password"
          value={newPassword}
          onChangeText={setNewPassword}
          error={errors.newPassword}
        />
        <PasswordFormField
          label="Confirm New Password"
          value={confirmNewPassword}
          onChangeText={setConfirmNewPassword}
          error={errors.confirmNewPassword}
        />

        {/* next button */}
        <PrimaryButton
          label="Next"
          onPress={handleSubmit}
          style={[styles.button, { borderRadius: theme.borderRadius.base }]}
        />
      </View>
    </View>
  );
};

export default ResetPassword;

const styles = StyleSheet.create({
  container: {
    paddingBottom: 70,
  },
  button: {
    marginTop: 20,
  },
});
