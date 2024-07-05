import { View, StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";
import { useEffect, useState } from "react";

import { TextFormField, BirthdayFormField } from "../../ui/FormField";
import PrimaryButton from "../../ui/PrimaryButton";
import FormHeader from "../../common/FormHeader";
import useBoundStore from "../../../zustand/useBoundStore";

const StepOneContent = () => {
  const theme = useTheme();

  const goVerificationNextStep = useBoundStore(
    (state) => state.goVerificationNextStep
  );
  const verificationForm = useBoundStore((state) => state.verificationForm);
  const setVerificationForm = useBoundStore(
    (state) => state.setVerificationForm
  );
  const [errors, setErrors] = useState({});

  //TODO: diri
  useEffect(() => {
    const fetchData = () => {
      //TODO: e set dayon
      setVerificationForm();
    };

    fetchData();
  }, []);

  /*
   *
   * Form Validation
   *
   */
  const validateForm = () => {
    let errors = {};

    // Validate first name field if it is empty
    if (!verificationForm.firstName) {
      errors.firstName = "First Name is required.";
    }

    // Validate middle name field if it is empty
    if (!verificationForm.middleName) {
      errors.middleName = "Middle Name is required.";
    }

    // Validate last name field if it is empty
    if (!verificationForm.lastName) {
      errors.lastName = "Last Name is required.";
    }

    // Validate birthday if it is empty
    if (!verificationForm.birthday) {
      errors.birthday = "Birthday is required.";
    }

    // Validate phone field if it is empty
    if (!verificationForm.phone) {
      errors.phone = "Phone is required.";
    }

    // check if the phone number size is 11
    if (verificationForm.phone.length != 11) {
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
      goVerificationNextStep();
    }
  };

  return (
    <View style={styles.container}>
      {/* Form */}
      <View style={{ rowGap: theme.gap.lg }}>
        <FormHeader
          title="Confirm if your information is correct"
          desc="Only provide information that is true and correct."
        />
        <TextFormField
          label="First Name"
          value={verificationForm.firstName}
          onChangeText={(value) => setVerificationForm("firstName", value)}
          error={errors.firstName}
        />
        <TextFormField
          label="Middle Name"
          value={verificationForm.middleName}
          onChangeText={(value) => setVerificationForm("middleName", value)}
          error={errors.middleName}
        />
        <TextFormField
          label="Last Name"
          value={verificationForm.lastName}
          onChangeText={(value) => setVerificationForm("lastName", value)}
          error={errors.lastName}
        />
        <TextFormField
          label="Suffix"
          value={verificationForm.suffix}
          onChangeText={(value) => setVerificationForm("suffix", value)}
          error={errors.suffix}
        />
        <BirthdayFormField
          label="Birthday"
          date={verificationForm.birthday}
          setDate={setVerificationForm}
          error={errors.birthday}
        />
        <TextFormField
          label="Phone Number"
          inputMode="tel"
          value={verificationForm.phone}
          onChangeText={(value) => setVerificationForm("phone", value)}
          error={errors.phone}
        />

        {/* Submit or Next Button */}
        <PrimaryButton
          label="Next"
          onPress={handleSubmit}
          style={[styles.button, { borderRadius: theme.borderRadius.base }]}
        />
      </View>
    </View>
  );
};

export default StepOneContent;

const styles = StyleSheet.create({
  container: {
    paddingBottom: 70,
  },
  button: {
    marginVertical: 20,
  },
});
