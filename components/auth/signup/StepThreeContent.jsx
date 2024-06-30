import { View, StyleSheet } from "react-native";
import { useTheme, Text } from "react-native-paper";
import { useState } from "react";

import PrimaryButton from "../../ui/PrimaryButton";
import { PasswordFormField, TextFormField } from "../../ui/FormField";
import FormHeader from "../../common/FormHeader";
import { useNavigation } from "@react-navigation/native";
import useStore from "../../../zustand/useStore";
import { supabase } from "../../../utils/supabase/config";
import { setItem } from "../../../utils/LocalStorage";

const StepThreeContent = () => {
  const theme = useTheme();
  const navigation = useNavigation();

  //! Access global forms to pass as meta data for user
  const formOne = useStore((state) => state.signupFormOne);
  const formTwo = useStore((state) => state.signupFormTwo);
  const formThree = useStore((state) => state.signupFormThree);

  const setFormThree = useStore((state) => state.setSignupFormThree);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

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
    if (!formThree.email) {
      errors.email = "Email is required.";
    }

    //check if email has @ and .com
    if (!/\S+@\S+\.\S+/.test(formThree.email)) {
      errors.email = "Invalid Email.";
    }

    // Validate password field if it is empty
    if (!formThree.password) {
      errors.password = "Password is required.";
    }

    // Validate confirm password field if it is empty
    if (!formThree.confirmPassword) {
      errors.confirmPassword = "Confirm Password is required.";
    }

    // Validate if password and confirm password matched
    if (formThree.password !== formThree.confirmPassword) {
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
          email: formThree.email,
          password: formThree.password,
          options: {
            data: {
              first_name: formOne.firstName,
              middle_name: formOne.middleName,
              last_name: formOne.lastName,
              suffix: formOne.suffix,
              birth_date: formOne.birthday,
              phone_number: formOne.phone,
              barangay: formTwo.barangay,
              street: formTwo.street,
              house_number: formTwo.houseNumber,
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
        //if form is valid go to completion confirmation screen
        navigation.navigate("SuccessConfirmation", {
          title: "Registered Successfully!",
          desc: "The submitted details should be complete and spelled correctly.",
          userToken: data["session"]["access_token"],
        });
      }
    }
  };

  return (
    <View style={styles.container}>
      {/* Form */}
      <View style={{ rowGap: theme.gap.lg }}>
        <FormHeader
          title="Sign Up"
          titleSize="large"
          desc="Please fill in the information below."
        />
        <TextFormField
          label="Email"
          value={formThree.email}
          inputMode="email"
          onChangeText={(value) => setFormThree("email", value)}
          error={errors.email}
          disabled={loading}
        />
        <View style={{ height: 16 }} />
        <PasswordFormField
          label="Password"
          value={formThree.password}
          onChangeText={(value) => setFormThree("password", value)}
          error={errors.password}
          disabled={loading}
        />
        <PasswordFormField
          label="Confirm Password"
          value={formThree.confirmPassword}
          onChangeText={(value) => setFormThree("confirmPassword", value)}
          error={errors.confirmPassword}
          disabled={loading}
        />

        {/* Server Error */}
        <Text style={{ color: theme.colors.primary }}>{signUpError}</Text>

        {/* next button */}
        <PrimaryButton
          label="Next"
          onPress={handleSubmit}
          disabled={loading}
          style={[styles.button, { borderRadius: theme.borderRadius.base }]}
        />
      </View>
    </View>
  );
};

export default StepThreeContent;

const styles = StyleSheet.create({
  container: {
    paddingBottom: 70,
  },
  button: {
    marginTop: 20,
  },
});
