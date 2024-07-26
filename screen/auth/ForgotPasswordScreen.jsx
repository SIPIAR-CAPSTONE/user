import { StyleSheet, ScrollView, View } from "react-native";
import { useTheme } from "react-native-paper";
import { useMemo, useState } from "react";

import FormHeader from "../../components/common/FormHeader";
import { TextFormField } from "../../components/ui/FormField";
import PrimaryButton from "../../components/ui/PrimaryButton";
import StatusBar from "../../components/common/StatusBar";
import useSendToken from "../../hooks/useSendToken";
import { supabase } from "../../utils/supabase/config";
import useBoundStore from "../../zustand/useBoundStore";

/**
 * ForgotPasswordScreen component
 *
 * where the user can enter their email and request a password reset token.
 * It also handles the form validation and submission.
 */
const ForgotPasswordScreen = () => {
  const theme = useTheme();
  const styles = useMemo(() => makeStyles(theme), [theme]);

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const { errors, setErrors, process } = useSendToken(email, true); // Hook for sending password reset token
  const setResetEmail = useBoundStore((state) => state.setPasswordResetEmail);

  /**
   * Form Validation
   *
   * This function validates the email field and sets error messages if necessary.
   * It returns true if the form is valid, false otherwise.
   *
   * @return {boolean} - True if the form is valid, false otherwise.
   */
  const validateForm = () => {
    const errors = {};

    if (!email) errors.email = "Email is required.";
    if (!/\S+@\S+\.\S+/.test(email)) errors.email = "Invalid Email";

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async () => {
    setLoading(true);

    // Add email as a global prop
    setResetEmail(email);

    const isFormValid = validateForm();

    if (isFormValid) {
      try {
        const { data } = await supabase
          .from("bystander")
          .select()
          .eq("email", email);

        // Check if data is an array and has at least one element
        if (Array.isArray(data) && data.length > 0) {
          process(); // Call the process function from the useSendToken hook for sending token to the provided email
        } else {
          let errors = {};
          errors.email = "Account not found.";
          setErrors(errors);
        }
      } catch (error) {
        const errorMessage = { email: `Server Error: ${error.message}` };
        setErrors(errorMessage);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.form}>
        <FormHeader
          title="Forgot Password"
          titleSize="large"
          desc="Please provide your registered email."
        />
        <TextFormField
          label="Email Address"
          value={email}
          inputMode="email"
          onChangeText={setEmail}
          error={errors.email}
          disabled={loading}
        />
        <PrimaryButton
          label="Send Token"
          onPress={handleSubmit}
          disabled={loading}
          style={styles.button}
        />
      </View>

      <StatusBar />
    </ScrollView>
  );
};

export default ForgotPasswordScreen;

const makeStyles = ({ borderRadius, padding, gap }) =>
  StyleSheet.create({
    container: {
      paddingBottom: 70,
      paddingHorizontal: padding.body.horizontal,
    },
    form: {
      rowGap: gap.lg,
    },
    button: {
      marginTop: 20,
      borderRadius: borderRadius.base,
    },
  });
