import { StyleSheet, View } from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

import StatusBar from "../../components/common/StatusBar";
import PrimaryButton from "../../components/ui/PrimaryButton";
import FormHeader from "../../components/common/FormHeader";
import { supabase } from "../../utils/supabase/config";
import { useStyles, createStyleSheet } from "../../hooks/useStyles";
import TextInput from "../../components/ui/TextInput";

const ResetPasswordScreen = () => {
  const { styles } = useStyles(stylesheet);
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
    const errors = {};

    if (!newPassword) errors.newPassword = "Password is required.";
    if (!confirmNewPassword) {
      errors.confirmNewPassword = "Confirm Password is required.";
    }
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

      //* update password of user
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
        //* navigate to success confirmation screen
        navigation.navigate("SuccessConfirmation", {
          title: "Reset Password Successfully!",
          desc: "You can now login your new password credentials.",
          nextScreen: "StartingScreen",
        });
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <FormHeader
          title="Reset Password"
          titleSize="large"
          desc="Set your new password for your account"
        />

        <View style={{ height: 16 }} />

        <TextInput
          placeholder="New Password"
          type="password"
          value={newPassword}
          onChangeText={setNewPassword}
          error={errors.newPassword}
          disabled={loading}
        />
        <TextInput
          placeholder="Confirm New Password"
          type="password"
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
          style={styles.button}
        />
      </View>

      <StatusBar />
    </View>
  );
};

export default ResetPasswordScreen;

const stylesheet = createStyleSheet((theme) =>
  StyleSheet.create({
    container: {
      paddingBottom: 70,
      paddingHorizontal: theme.padding.body.horizontal,
    },
    form: {
      rowGap: theme.gap.lg,
    },
    button: {
      marginTop: 20,
      borderRadius: theme.borderRadius.base,
    },
  })
);
