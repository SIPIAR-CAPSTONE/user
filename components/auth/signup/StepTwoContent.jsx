import { View, StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";
import { useState } from "react";

import { TextFormField, SelectFormField } from "../../ui/FormField";
import PrimaryButton from "../../ui/PrimaryButton";
import cdoBarangayData from "../../../utils/cdoBarangayData";
import FormHeader from "../../common/FormHeader";

const StepTwoContent = ({ goNextStep, backPrevStep }) => {
  const theme = useTheme();
  const [form, setForm] = useState({
    barangay: "",
    street: "",
    houseNumber: "",
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

    // Validate barangay field if it is empty
    if (!form.barangay) {
      errors.barangay = "Barangay is required.";
    }

    // Validate street field if it is empty
    if (!form.street) {
      errors.street = "Street is required.";
    }

    // Set the errors and update form validity if it is empty
    setErrors(errors);
    setIsFormValid(Object.keys(errors).length === 0);
  };

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
          onChange={(item) => handleOnChangeValue("barangay", item.value)}
          error={errors.barangay}
        />
        <TextFormField
          label="Street"
          value={form.street}
          onChangeText={(value) => handleOnChangeValue("street", value)}
          error={errors.street}
        />
        <TextFormField
          label="House Number"
          value={form.houseNumber}
          onChangeText={(value) => handleOnChangeValue("houseNumber", value)}
          error={errors.houseNumber}
        />
      </View>

      {/* Submit or Next Buttons */}
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
          style={{ flex: 2, borderRadius: theme.borderRadius.base }}
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
    justifyContent: "space-between",
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
    alignItems: "center"
  },
});
