import { StyleSheet, ScrollView, View } from "react-native";
import { useTheme } from "react-native-paper";
import { useState } from "react";

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
    // Check if email is valid
    if (!/\S+@\S+\.\S+/.test(email)) errors.email = "Invalid Email";

    setErrors(errors);

    // Return true if there are no errors, false otherwise
    return Object.keys(errors).length === 0;
  };

  /**
   * This function handles the form submission for forgot password.
   */
  const handleSubmit = async () => {
    setLoading(true);

    // Add email as a global prop
    setResetEmail(email);

    const isFormValid = validateForm();

    if (isFormValid) {
      try {
        const { data } = await supabase.from("bystander").select().eq("email", email);

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
    <ScrollView
      style={[
        styles.container,
        {
          paddingHorizontal: theme.padding.body.horizontal,
        },
      ]}
    >
      <View style={{ rowGap: theme.gap.lg }}>
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
          style={[styles.button, { borderRadius: theme.borderRadius.base }]}
        />
      </View>

      <StatusBar />
    </ScrollView>
  );
};

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
  container: {
    paddingBottom: 70,
  },
  button: {
    marginTop: 20,
  },
});
