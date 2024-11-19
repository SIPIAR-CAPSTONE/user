import { View } from "react-native";
import { useTheme } from "react-native-paper";
import { useState } from "react";

import FormHeader from "../../common/FormHeader";
import useBoundStore from "../../../zustand/useBoundStore";
import { supabase } from "../../../utils/supabase/config";
import { LargeSecureStore } from "../../../utils/SecureLocalStorage";
import useUserMetadata from "../../../hooks/useUserMetadata";
import TextInput from "../../ui/TextInput";
import Button from "../../ui/Button";
import Form from "../../common/Form";
import { isFormValid } from "../../../utils/formValidation";
import ServerErrorMessage from "../../ui/ServerErrorMessage";
import PasswordStrength from "./PasswordStrength";

const fields = [
  { name: "email", rules: [{ type: "required" }, { type: "email" }] },
  {
    name: "password",
    rules: [
      { type: "includeSpecialCharacter" },
      { type: "includeUpperAndLowerCase" },
      { type: "includeNumber" },
      { type: "minLength", length: 8 },
      { type: "required", message: "Password is required." },
    ],
  },
  {
    name: "confirmPassword",
    rules: [
      { type: "required", message: "Confirm Password is required." },
      {
        type: "match",
        matchField: "password",
        message: "The Confirmation Password does not match.",
      },
    ],
  },
];

const StepThreeContent = () => {
  const theme = useTheme();
  const signupForm = useBoundStore((state) => state.signupForm);
  const setSignupForm = useBoundStore((state) => state.setSignupForm);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);
  const setSession = useBoundStore((state) => state.setSession);
  const { setState } = useUserMetadata();

  const handleSubmit = async () => {
    if (isFormValid(fields, signupForm, setErrors)) {
      setLoading(true);

      //* Signup user using the credentials provided, also added other fields as meta data
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

      //* Checking error and handling after successful signup
      if (error) {
        setServerError(error.message);
      } else if (!error) {
        //* after successful signup, store the encrypted session locally and as global state
        const largeSecureStore = new LargeSecureStore();
        encryptedSession = await largeSecureStore.setItem(
          "session",
          JSON.stringify(data["session"])
        );
        setSession(encryptedSession);

        //* set session global state variables
        setState(data["session"]);
      }
    }
  };

  return (
    <Form>
      <FormHeader
        title="Sign Up"
        titleSize="large"
        desc="Please fill in the information below."
      />
      <TextInput
        placeholder="Email"
        value={signupForm.email}
        inputMode="email"
        onChangeText={(value) => setSignupForm("email", value)}
        error={errors.email}
        disabled={loading}
      />
      <View style={{ height: 14 }} />
      <TextInput
        placeholder="Password"
        type="password"
        value={signupForm.password}
        onChangeText={(value) => setSignupForm("password", value)}
        error={errors.password}
        disabled={loading}
      />
      <PasswordStrength password={signupForm.password} />
      <TextInput
        placeholder="Confirm Password"
        type="password"
        value={signupForm.confirmPassword}
        onChangeText={(value) => setSignupForm("confirmPassword", value)}
        error={errors.confirmPassword}
        disabled={loading}
      />
      <ServerErrorMessage>{serverError}</ServerErrorMessage>
      <Button
        label="Next"
        onPress={handleSubmit}
        isLoading={loading}
        marginVertical={theme.spacing.xxl}
      />
    </Form>
  );
};

export default StepThreeContent;
