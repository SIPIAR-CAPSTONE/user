import { View, StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";
import { useState } from "react";

import PrimaryButton from "../../ui/PrimaryButton";
import { PasswordFormField, TextFormField } from "../../ui/FormField";
import FormHeader from "../../common/FormHeader";
import { useNavigation } from "@react-navigation/native";

const StepThreeContent = ({ backPrevStep }) => {
  const theme = useTheme();
  const navigation = useNavigation();

  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  // handlers for form fields changes
  const handleOnChangeValue = (key, newValue) => {
    setForm((prevForm) => {
      return { ...prevForm, [key]: newValue };
    });
  };

  /*
   *
   * Form Validation
   *
   */
  const validateForm = () => {
    let errors = {};

    //check if email has @ and .com
    if (!/\S+@\S+\.\S+/.test(form.email)) {
      errors.email = "Invalid Email.";
    }

    // Validate email field if it is empty
    if (!form.email) {
    }

    // Validate if password and confirm password matched
    if (form.password !== form.confirmPassword) {
      errors.confirmPassword = "Password and Confirm Password must be match.";
    }

    // Validate confirm password field if it is empty
    if (!form.confirmPassword) {
      errors.confirmPassword = "Confirm Password is required.";
    }

    // Validate password field if it is empty
    if (!form.password) {
      errors.password = "Password is required.";
    }

    // Set the errors and update form validity if it is empty
    setErrors(errors);
    setIsFormValid(Object.keys(errors).length === 0);
  };

  const handleSubmit = () => {
    validateForm();

    if (isFormValid) {
      //if form is valid go to next step screen
      navigation.navigate("RegisterConfirmation");
    }
  };

  return (
    <View>
      <FormHeader
        title="Sign Up"
        titleSize="large"
        desc="Please fill in the information below."
      />
      {/* Form */}
      <View style={[styles.formContainer, { rowGap: theme.gap.lg }]}>
        <TextFormField
          label="Email"
          value={form.email}
          inputMode="email"
          onChangeText={(value) => handleOnChangeValue("email", value)}
          error={errors.email}
        />
        <View style={{ height: 16 }} />
        <PasswordFormField
          label="Password"
          value={form.password}
          onChangeText={(value) => handleOnChangeValue("password", value)}
          error={errors.password}
        />
        <PasswordFormField
          label="Confirm Password"
          value={form.confirmPassword}
          onChangeText={(value) =>
            handleOnChangeValue("confirmPassword", value)
          }
          error={errors.confirmPassword}
        />
      </View>

      {/* Submit or Next Buttons */}
      <View style={{ flexDirection: "row", columnGap: theme.gap.sm }}>
        <PrimaryButton
          label="Back"
          mode="text"
          onPress={backPrevStep}
          style={{
            flex: 1,
            borderRadius: theme.borderRadius.base,
            borderColor: theme.colors.primary,
            borderWidth: 2,
          }}
        />
        <PrimaryButton
          label="Next"
          onPress={handleSubmit}
          style={{ flex: 2, borderRadius: theme.borderRadius.base }}
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
  header: {
    marginVertical: 20,
  },
  title: {
    fontWeight: "bold",
    textAlign: "center",
  },
  desc: {
    textAlign: "center",
  },
  formContainer: {
    marginBottom: 20,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
  },
});
