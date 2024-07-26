import { View, StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";
import { useMemo, useState } from "react";
import useBoundStore from "../../../zustand/useBoundStore";

import { TextFormField, SelectFormField } from "../../ui/FormField";
import PrimaryButton from "../../ui/PrimaryButton";
import cdoBarangayData from "../../../utils/cdoBarangayData";
import FormHeader from "../../common/FormHeader";

const StepTwoContent = ({ goNextStep }) => {
  const theme = useTheme();
  const styles = useMemo(() => makeStyles(theme), [theme]);
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
        <SelectFormField
          label="Barangay"
          value={signupForm.barangay}
          items={cdoBarangayData}
          onChange={(item) => setSignupForm("barangay", item.value)}
          error={errors.barangay}
        />
        <TextFormField
          label="Street"
          value={signupForm.street}
          onChangeText={(value) => setSignupForm("street", value)}
          error={errors.street}
        />
        <TextFormField
          label="House Number"
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

const makeStyles = ({ borderRadius, gap }) =>
  StyleSheet.create({
    container: {
      paddingBottom: 70,
      height: 600,
    },
    form: {
      rowGap: gap.lg,
    },
    header: {
      marginVertical: 20,
    },
    nextButton: {
      marginTop: 20,
      borderRadius: borderRadius.base,
    },
  });
