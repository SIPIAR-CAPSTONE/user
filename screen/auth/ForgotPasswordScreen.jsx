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
import { isFormValid } from "../../utils/formValidation";

const fields = [
  { name: "email", rules: [{ type: "required" }, { type: "email" }] },
];

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

  const handleSubmit = async () => {
    // Add email as a global prop
    setResetEmail(email);

    if (isFormValid(fields, { email }, setErrors)) {
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

const stylesheet = createStyleSheet((theme) => ({
  form: {
    paddingHorizontal: theme.spacing.base,
  },
}));
