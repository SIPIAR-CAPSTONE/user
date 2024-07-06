import { View, StyleSheet } from "react-native";
import { useTheme, Text, Button } from "react-native-paper";
import { useState } from "react";

import { TextFormField, BirthdayFormField } from "../../ui/FormField";
import PrimaryButton from "../../ui/PrimaryButton";
import FormHeader from "../../common/FormHeader";
import { useNavigation } from "@react-navigation/native";
import useBoundStore from "../../../zustand/useBoundStore";

const StepOneContent = ({ goNextStep }) => {
  const theme = useTheme();
  const navigation = useNavigation();

  const signupForm = useBoundStore((state) => state.signupForm);
  const setSignupForm = useBoundStore((state) => state.setSignupForm);
  const [errors, setErrors] = useState({});

  /*
   *
   * Form Validation
   *
   */
  const validateForm = () => {
    let errors = {};

    // Validate first name field if it is empty
    if (!signupForm.firstName) {
      errors.firstName = "First Name is required.";
    }

    // Validate middle name field if it is empty
    if (!signupForm.middleName) {
      errors.middleName = "Middle Name is required.";
    }

    // Validate last name field if it is empty
    if (!signupForm.lastName) {
      errors.lastName = "Last Name is required.";
    }

    // Validate birthday if it is empty
    if (!signupForm.birthday) {
      errors.birthday = "Birthday is required.";
    }

    // Validate phone field if it is empty
    if (!signupForm.phone) {
      errors.phone = "Phone is required.";
    }

    // check if the phone number size is 11
    if (signupForm.phone.length != 11) {
      errors.phone = "Phone should have 11 numbers.";
    }

    // Set the errors and update form validity if it is empty
    setErrors(errors);

    // return true if there is no error
    // false if error length is greater than zero
    return Object.keys(errors).length === 0;
  };

  /*
   *
   *  Handle submission to proceed next step
   *
   */
  const handleSubmit = () => {
    //validateForm will return true if there is no error
    const isFormValid = validateForm();

    if (isFormValid) {
      //if form is valid go to next step screen
      goNextStep();
    }
  };

  return (
    <View style={styles.container}>
      {/* Form */}
      <View style={{ rowGap: theme.gap.lg }}>
        <FormHeader
          title="Tell us something about yourself"
          desc="Only provide information that is true and correct."
        />
        <TextFormField
          label="First Name"
          value={signupForm.firstName}
          onChangeText={(value) => setSignupForm("firstName", value)}
          error={errors.firstName}
        />
        <TextFormField
          label="Middle Name"
          value={signupForm.middleName}
          onChangeText={(value) => setSignupForm("middleName", value)}
          error={errors.middleName}
        />
        <TextFormField
          label="Last Name"
          value={signupForm.lastName}
          onChangeText={(value) => setSignupForm("lastName", value)}
          error={errors.lastName}
        />
        <TextFormField
          label="Suffix"
          value={signupForm.suffix}
          onChangeText={(value) => setSignupForm("suffix", value)}
          error={errors.suffix}
        />
        <BirthdayFormField
          label="Birthday"
          date={signupForm.birthday}
          setDate={setSignupForm}
          error={errors.birthday}
        />
        <TextFormField
          label="Phone Number"
          inputMode="tel"
          value={signupForm.phone}
          onChangeText={(value) => setSignupForm("phone", value)}
          error={errors.phone}
        />

        {/* Submit or Next Button */}
        <PrimaryButton
          label="Next"
          onPress={handleSubmit}
          style={[styles.button, { borderRadius: theme.borderRadius.base }]}
        />
      </View>

      <View style={styles.footer}>
        <Text variant="labelMedium">Already have an Account?</Text>
        <Button
          mode="text"
          compact
          onPress={() => navigation.navigate("Login")}
          style={{ borderRadius: theme.borderRadius.base }}
          labelStyle={{ fontSize: theme.fontSize.xs }}
        >
          Sign In
        </Button>
      </View>
    </View>
  );
};

export default StepOneContent;

const styles = StyleSheet.create({
  container: {
    paddingBottom: 70,
  },
  header: {
    marginVertical: 20,
  },
  button: {
    marginVertical: 20,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
