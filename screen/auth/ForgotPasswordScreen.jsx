import {  StyleSheet } from "react-native";
import { useState } from "react";

import FormHeader from "../../components/common/FormHeader";
import Button from "../../components/ui/Button";
import useSendToken from "../../hooks/useSendToken";
import { supabase } from "../../utils/supabase/config";
import useBoundStore from "../../zustand/useBoundStore";
import { useStyles, createStyleSheet } from "../../hooks/useStyles";
import TextInput from "../../components/ui/TextInput";
import Form from "../../components/common/Form";
import Layout from "../../components/common/Layout";

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
    // Add email as a global prop
    setResetEmail(email);

    const isFormValid = validateForm();

    if (isFormValid) {
      setLoading(true);

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
    <Layout removeDefaultPaddingHorizontal addNoInternetBar>
      <Form style={styles.form}>
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
        <Button label="Send Token" onPress={handleSubmit} isLoading={loading} />
      </Form>
    </Layout>
  );
};

export default ForgotPasswordScreen;

const stylesheet = createStyleSheet((theme) =>
  StyleSheet.create({
    form: {
      paddingHorizontal: theme.spacing.base,
    },
  })
);
