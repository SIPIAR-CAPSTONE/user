import { View, StyleSheet } from "react-native";
import { useTheme, Text } from "react-native-paper";
import { useMemo, useState } from "react";
import PrimaryButton from "../../ui/PrimaryButton";
import { PasswordFormField, TextFormField } from "../../ui/FormField";
import FormHeader from "../../common/FormHeader";
import useBoundStore from "../../../zustand/useBoundStore";
import { supabase } from "../../../utils/supabase/config";
import { LargeSecureStore } from "../../../utils/SecureLocalStorage";
import useUserMetadata from "../../../hooks/useUserMetadata";

const StepThreeContent = () => {
  const theme = useTheme();
  const styles = useMemo(() => makeStyles(theme), [theme]);
  const signupForm = useBoundStore((state) => state.signupForm);
  const setSignupForm = useBoundStore((state) => state.setSignupForm);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const setSession = useBoundStore((state) => state.setSession);
  const { setState } = useUserMetadata();

  //! State for UI signup error
  const [signUpError, setSignUpError] = useState("");

  /*
   *
   * Form Validation
   *
   */
  const validateForm = () => {
    let errors = {};

    // Validate email field if it is empty
    if (!signupForm.email) {
      errors.email = "Email is required.";
    }

    //check if email has @ and .com
    if (!/\S+@\S+\.\S+/.test(signupForm.email)) {
      errors.email = "Invalid Email.";
    }

    // Validate password field if it is empty
    if (!signupForm.password) {
      errors.password = "Password is required.";
    }

    // Validate confirm password field if it is empty
    if (!signupForm.confirmPassword) {
      errors.confirmPassword = "Confirm Password is required.";
    }

    // Validate if password and confirm password matched
    if (signupForm.password !== signupForm.confirmPassword) {
      errors.confirmPassword = "Password and Confirm Password must be match.";
      errors.password = "Password and Confirm Password must be match.";
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

      //! Signup user using the credentials provided, also added other fields as meta data
      const { data, error } = await supabase.auth
        .signUp({
          email: signupForm.email,
          password: signupForm.password,
          options: {
            data: {
              first_name: signupForm.firstName,
              middle_name: signupForm.middleName,
              last_name: signupForm.lastName,
              suffix: signupForm.suffix,
              birth_date: signupForm.birthday,
              phone_number: signupForm.phone,
              barangay: signupForm.barangay,
              street: signupForm.street,
              house_number: signupForm.houseNumber,
            },
          },
        })
        .finally(() => {
          setLoading(false);
        });

      //! Checking error and handling after successful signup
      if (error) {
        setSignUpError(error.message);
      } else if (!error) {
        //! after successful signup, store the encrypted session locally and as global state
        const largeSecureStore = new LargeSecureStore();
        encryptedSession = await largeSecureStore.setItem(
          "session",
          JSON.stringify(data["session"])
        );
        await setSession(encryptedSession);

        //! set session global state variables
        setState(data["session"]);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <FormHeader
          title="Sign Up"
          titleSize="large"
          desc="Please fill in the information below."
        />
        <TextFormField
          label="Email"
          value={signupForm.email}
          inputMode="email"
          onChangeText={(value) => setSignupForm("email", value)}
          error={errors.email}
          disabled={loading}
        />
        <View style={{ height: 16 }} />
        <PasswordFormField
          label="Password"
          value={signupForm.password}
          onChangeText={(value) => setSignupForm("password", value)}
          error={errors.password}
          disabled={loading}
        />
        <PasswordFormField
          label="Confirm Password"
          value={signupForm.confirmPassword}
          onChangeText={(value) => setSignupForm("confirmPassword", value)}
          error={errors.confirmPassword}
          disabled={loading}
        />

        <Text style={styles.serverErrorMessage}>{signUpError}</Text>

        <PrimaryButton
          label="Next"
          onPress={handleSubmit}
          disabled={loading}
          style={styles.nextButton}
        />
      </View>
    </View>
  );
};

export default StepThreeContent;

const makeStyles = ({ borderRadius, gap, colors }) =>
  StyleSheet.create({
    container: {
      paddingBottom: 70,
    },
    form: {
      rowGap: gap.lg,
    },
    serverErrorMessage: {
      color: colors.primary,
    },
    nextButton: {
      marginTop: 20,
      borderRadius: borderRadius.base,
    },
  });
