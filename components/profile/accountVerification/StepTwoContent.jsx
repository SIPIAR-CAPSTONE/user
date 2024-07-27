import { View, StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";
import { useState, useEffect, useMemo } from "react";

import { TextFormField, SelectFormField } from "../../ui/FormField";
import PrimaryButton from "../../ui/PrimaryButton";
import cdoBarangayData from "../../../utils/cdoBarangayData";
import FormHeader from "../../common/FormHeader";
import useBoundStore from "../../../zustand/useBoundStore";

const StepTwoContent = ({ goNextStep }) => {
  const theme = useTheme();
  const styles = useMemo(() => makeStyles(theme), [theme]);
  const verificationForm = useBoundStore((state) => state.verificationForm);
  const setVerificationForm = useBoundStore(
    (state) => state.setVerificationForm
  );
  const [errors, setErrors] = useState({});

  //TODO: diri
  useEffect(() => {
    const fetchverificationFormData = () => {
      //TODO: e set dayon
      setVerificationForm();
    };

    fetchverificationFormData();
  }, []);

  /**
   * Function to validate the form
   *
   * @return {boolean} true if there are no errors, false otherwise
   *
   */
  const validateForm = () => {
    const errors = {};

    if (!verificationForm.barangay) errors.barangay = "Barangay is required.";
    if (!verificationForm.street) errors.street = "Street is required.";

    setErrors(errors);

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
          value={verificationForm.barangay}
          items={cdoBarangayData}
          onChange={(item) => setVerificationForm("barangay", item.value)}
          error={errors.barangay}
        />
        <TextFormField
          label="Street"
          value={verificationForm.street}
          onChangeText={(value) => setVerificationForm("street", value)}
          error={errors.street}
        />
        <TextFormField
          label="House Number"
          value={verificationForm.houseNumber}
          onChangeText={(value) => setVerificationForm("houseNumber", value)}
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

const makeStyles = ({ gap, borderRadius }) =>
  StyleSheet.create({
    container: {
      paddingBottom: 70,
    },
    form: {
      rowGap: gap.lg,
    },
    nextButton: {
      marginVertical: 20,
      borderRadius: borderRadius.base,
    },
  });
