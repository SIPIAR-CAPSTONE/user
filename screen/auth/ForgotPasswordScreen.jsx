import { ScrollView, StyleSheet, View } from "react-native";
import { useState } from "react";

import FormHeader from "../../components/common/FormHeader";
import PrimaryButton from "../../components/ui/PrimaryButton";
import StatusBar from "../../components/common/StatusBar";
import useSendToken from "../../hooks/useSendToken";
import { supabase } from "../../utils/supabase/config";
import useBoundStore from "../../zustand/useBoundStore";
import { useStyles, createStyleSheet } from "../../hooks/useStyles";
import TextInput from "../../components/ui/TextInput";
import NoInternetBar from "../../components/common/NoInternetBar";

/**
 * ForgotPasswordScreen component
 *
 * where the user can enter their email and request a password reset token.
 * It also handles the form validation and submission.
 */
const ForgotPasswordScreen = () => {
  const { styles } = useStyles(stylesheet);

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
    <>
      <ScrollView style={styles.container}>
        <View style={styles.form}>
          <FormHeader
            title="Forgot Password"
            titleSize="large"
            desc="Please provide your registered email."
          />
          <TextInput
            placeholder="Email Address"
            value={email}
            inputMode="email"
            onChangeText={setEmail}
            error={errors.email}
            disabled={loading}
          />
          <PrimaryButton
            label="Send Token"
            onPress={handleSubmit}
            isLoading={loading}
            style={styles.button}
          />
        </View>
      </ScrollView>

      <NoInternetBar />
      <StatusBar />
    </>
  );
};

export default ForgotPasswordScreen;

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
