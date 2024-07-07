import { View, StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

import StatusBar from "../../components/common/StatusBar";
import PrimaryButton from "../../components/ui/PrimaryButton";
import { PasswordFormField } from "../../components/ui/FormField";
import FormHeader from "../../components/common/FormHeader";
import { supabase } from "../../utils/supabase/config";

const ResetPasswordScreen = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
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
  const handleSubmit = async () => {
    //validateForm will return true if there is no error
    const isFormValid = validateForm();

    if (isFormValid) {
      setLoading(true);

      //! update password of user
      const { error } = await supabase.auth
        .updateUser({
          password: newPassword,
        })
        .finally(() => {
          setLoading(false);
        });

      if (error) {
        let errors = {};
        errors.confirmNewPassword = error.message;
        setErrors(errors);
      } else if (!error) {
        //! navigate to success confirmation screen
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
          disabled={loading}
        />
        <PasswordFormField
          label="Confirm New Password"
          value={confirmNewPassword}
          onChangeText={setConfirmNewPassword}
          error={errors.confirmNewPassword}
          disabled={loading}
        />

        {/* next button */}
        <PrimaryButton
          label="Next"
          onPress={handleSubmit}
          disabled={loading}
          style={[styles.button, { borderRadius: theme.borderRadius.base }]}
        />
      </View>

      <StatusBar />
    </View>
  );
};

export default ResetPasswordScreen;

const styles = StyleSheet.create({
  container: {
    paddingBottom: 70,
  },
  button: {
    marginTop: 20,
  },
});
