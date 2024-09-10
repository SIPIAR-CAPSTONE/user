import { StyleSheet, View } from "react-native";
import { useState } from "react";
import useBoundStore from "../../../zustand/useBoundStore";

import PrimaryButton from "../../ui/PrimaryButton";
import cdoBarangayData from "../../../utils/cdoBarangayData";
import FormHeader from "../../common/FormHeader";
import { useStyles, createStyleSheet } from "../../../hooks/useStyles";
import TextInput from "../../ui/TextInput";
import SelectItem from "../../ui/SelectItem";

const StepTwoContent = ({ goNextStep }) => {
  const { styles } = useStyles(stylesheet);
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

    // Validate barangay field if it is empty
    if (!signupForm.barangay) {
      errors.barangay = "Barangay is required.";
    }

    // Validate street field if it is empty
    if (!signupForm.street) {
      errors.street = "Street is required.";
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
      <View style={styles.form}>
        <FormHeader
          title="Please provide your current address"
          desc="Only provide information that is true and correct."
        />
        <SelectItem
          placeholder="Barangay"
          data={cdoBarangayData}
          value={signupForm.barangay}
          onChange={(value) => setSignupForm("barangay", value)}
          error={errors.barangay}
        />
        <TextInput
          placeholder="Street"
          value={signupForm.street}
          onChangeText={(value) => setSignupForm("street", value)}
          error={errors.street}
        />
        <TextInput
          placeholder="House Number"
          value={signupForm.houseNumber}
          onChangeText={(value) => setSignupForm("houseNumber", value)}
          error={errors.houseNumber}
        />

        <PrimaryButton
          label="Next"
          onPress={handleSubmit}
          style={styles.nextButton}
        />
      </View>
    </View>
  );
};

export default StepTwoContent;

const stylesheet = createStyleSheet((theme) =>
  StyleSheet.create({
    container: {
      paddingBottom: 70,
      height: 600,
    },
    form: {
      rowGap: theme.gap.lg,
    },
    header: {
      marginVertical: 20,
    },
    nextButton: {
      marginTop: 20,
      borderRadius: theme.borderRadius.base,
    },
  })
);
