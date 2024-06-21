import { View, StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";
import { useState } from "react";
import useStore from "../../../zustand/useStore";

import { TextFormField, SelectFormField } from "../../ui/FormField";
import PrimaryButton from "../../ui/PrimaryButton";
import cdoBarangayData from "../../../utils/cdoBarangayData";
import FormHeader from "../../common/FormHeader";

const StepTwoContent = ({ goNextStep, backPrevStep }) => {
  const theme = useTheme();

  const formTwo = useStore((state) => state.signupFormTwo);
  const setFormTwo = useStore((state) => state.setSignupFormTwo);
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  /*
   *
   * Form Validation
   *
   */
  const validateForm = () => {
    let errors = {};

    // Validate barangay field if it is empty
    if (!formTwo.barangay) {
      errors.barangay = "Barangay is required.";
    }

    // Validate street field if it is empty
    if (!formTwo.street) {
      errors.street = "Street is required.";
    }

    // Set the errors and update form validity if it is empty
    setErrors(errors);
    setIsFormValid(Object.keys(errors).length === 0);
  };

  /*
   *
   *  Handle submission to proceed next step
   *
   */
  const handleSubmit = () => {
    validateForm();

    if (isFormValid) {
      //if form is valid go to next step screen
      goNextStep();
    }
  };

  return (
    <View style={styles.container}>
      <FormHeader
        title="Please provide your current address"
        desc="Only provide information that is true and correct."
      />
      {/* Form */}
      <View style={[styles.formContainer, { rowGap: theme.gap.lg }]}>
        <SelectFormField
          label="Barangay"
          items={cdoBarangayData}
          onChange={(item) => setFormTwo("barangay", item.value)}
          error={errors.barangay}
        />
        <TextFormField
          label="Street"
          value={formTwo.street}
          onChangeText={(value) => setFormTwo("street", value)}
          error={errors.street}
        />
        <TextFormField
          label="House Number"
          value={formTwo.houseNumber}
          onChangeText={(value) => setFormTwo("houseNumber", value)}
          error={errors.houseNumber}
        />
      </View>

      {/* Container for back and next button */}
      <View style={[styles.buttonsContainer, { columnGap: theme.gap.sm }]}>
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
          style={{ flex: 3, borderRadius: theme.borderRadius.base }}
        />
      </View>
    </View>
  );
};

export default StepTwoContent;

const styles = StyleSheet.create({
  container: {
    paddingBottom: 70,
    height: 600,
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
  buttonsContainer: {
    flexDirection: "row",
    alignSelf: "flex-end",
    alignItems: "center",
  },
});
