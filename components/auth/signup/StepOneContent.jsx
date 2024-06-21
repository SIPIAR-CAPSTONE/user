import { View, StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";
import { useState } from "react";
import useStore from "../../../zustand/useStore";

import { TextFormField, BirthdayFormField } from "../../ui/FormField";
import PrimaryButton from "../../ui/PrimaryButton";
import FormHeader from "../../common/FormHeader";

const StepOneContent = ({ goNextStep }) => {
  const theme = useTheme();

  const formOne = useStore((state) => state.signupFormOne);
  const setFormOne = useStore((state) => state.setSignupFormOne);
  const [errors, setErrors] = useState({});

  /*
   *
   * Form Validation
   *
   */
  const validateForm = () => {
    let errors = {};

    // Validate first name field if it is empty
    if (!formOne.firstName) {
      errors.firstName = "First Name is required.";
    }

    // Validate middle name field if it is empty
    if (!formOne.middleName) {
      errors.middleName = "Middle Name is required.";
    }

    // Validate last name field if it is empty
    if (!formOne.lastName) {
      errors.lastName = "Last Name is required.";
    }

    // Validate birthday if it is empty
    if (!formOne.birthday) {
      errors.birthday = "Birthday is required.";
    }

    // Validate phone field if it is empty
    if (!formOne.phone) {
      errors.phone = "Phone is required.";
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
      <FormHeader
        title="Tell us something about yourself"
        desc="Only provide information that is true and correct."
      />
      {/* Form */}
      <View style={[styles.formContainer, { rowGap: theme.gap.lg }]}>
        <TextFormField
          label="First Name"
          value={formOne.firstName}
          onChangeText={(value) => setFormOne("firstName", value)}
          error={errors.firstName}
        />
        <TextFormField
          label="Middle Name"
          value={formOne.middleName}
          onChangeText={(value) => setFormOne("middleName", value)}
          error={errors.middleName}
        />
        <TextFormField
          label="Last Name"
          value={formOne.lastName}
          onChangeText={(value) => setFormOne("lastName", value)}
          error={errors.lastName}
        />
        <TextFormField
          label="Suffix"
          value={formOne.suffix}
          onChangeText={(value) => setFormOne("suffix", value)}
          error={errors.suffix}
        />
        <BirthdayFormField
          label="Birthday"
          date={formOne.birthday}
          setDate={setFormOne}
          error={errors.birthday}
        />
        <TextFormField
          label="Phone Number"
          inputMode="tel"
          value={formOne.phone}
          onChangeText={(value) => setFormOne("phone", value)}
          error={errors.phone}
        />
      </View>

      {/* Submit or Next Button */}
      <PrimaryButton
        label="Next"
        onPress={handleSubmit}
        style={{ flex: 1, borderRadius: theme.borderRadius.base }}
      />
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
});
