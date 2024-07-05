import { StyleSheet, ScrollView, View, Alert } from "react-native";
import { useTheme, Text } from "react-native-paper";
import { useState } from "react";
import FormHeader from "../../components/common/FormHeader";
import { TextFormField } from "../../components/ui/FormField";
import PrimaryButton from "../../components/ui/PrimaryButton";
import StatusBar from "../../components/common/StatusBar";
import useSendToken from "../../hooks/useSendToken";
import { supabase } from "../../utils/supabase/config";
import useBoundStore from "../../zustand/useBoundStore";

const ForgotPasswordScreen = () => {
  const theme = useTheme();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { errors, setErrors, process } = useSendToken(email, true);
  const setResetEmail = useBoundStore((state) => state.setPasswordResetEmail);

  /*
   *
   * Form Validation
   *
   */
  const validateForm = () => {
    let errors = {};

    // Validate email field if it is empty
    if (!email) {
      errors.email = "Email is required.";
    }

    //check if email has @ and .com
    if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Invalid Email";
    }

    // Set the errors and update form validity if it is empty
    setErrors(errors);

    // return true if there is no error
    // false if error length is greater than zero
    return Object.keys(errors).length === 0;
  };

  /*
   *
   *  Handle submission for forgot password
   *
   */
  const handleSubmit = async () => {
    setLoading(true);

    // add email as a global prop
    setResetEmail(email);

    //validateForm will return true if there is no error
    const isFormValid = validateForm();

    if (isFormValid) {
      try {
        //! check in the bystander table if the provided email is registered
        const { data } = await supabase
          .from("bystander")
          .select()
          .eq("email", email);

        //! check if data is an array and has at least one element
        if (Array.isArray(data) && data.length > 0) {
          process(); //! call the process form the useSendToken hook for sending token to the provided email
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
