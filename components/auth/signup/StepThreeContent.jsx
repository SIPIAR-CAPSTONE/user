import { View, StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";
import { useState } from "react";

import PrimaryButton from "../../ui/PrimaryButton";
import { PasswordFormField, TextFormField } from "../../ui/FormField";
import FormHeader from "../../common/FormHeader";
import { useNavigation } from "@react-navigation/native";
import useStore from "../../../zustand/useStore";

const StepThreeContent = () => {
  const theme = useTheme();
  const navigation = useNavigation();

  const formThree = useStore((state) => state.signupFormThree);
  const setFormThree = useStore((state) => state.setSignupFormThree);
  const [errors, setErrors] = useState({});

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
  const handleSubmit = () => {
    //validateForm will return true if there is no error
    const isFormValid = validateForm();

    if (isFormValid) {
      //if form is valid go to completion confirmation screen
      navigation.navigate("RegisterConfirmation");
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
        />
        <View style={{ height: 16 }} />
        <PasswordFormField
          label="Password"
          value={formThree.password}
          onChangeText={(value) => setFormThree("password", value)}
          error={errors.password}
        />
        <PasswordFormField
          label="Confirm Password"
          value={formThree.confirmPassword}
          onChangeText={(value) => setFormThree("confirmPassword", value)}
          error={errors.confirmPassword}
        />

        {/* next button */}
        <PrimaryButton
          label="Next"
          onPress={handleSubmit}
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
