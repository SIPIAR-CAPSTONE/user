import { StyleSheet, View } from "react-native";
import { useState, useEffect } from "react";

import PrimaryButton from "../../ui/PrimaryButton";
import cdoBarangayData from "../../../utils/cdoBarangayData";
import FormHeader from "../../common/FormHeader";
import useBoundStore from "../../../zustand/useBoundStore";
import { useStyles, createStyleSheet } from "../../../hooks/useStyles";
import SelectItem from "../../ui/SelectItem";
import TextInput from "../../ui/TextInput";

const StepTwoContent = ({ goNextStep }) => {
  const { styles } = useStyles(stylesheet);
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
        <SelectItem
          placeholder="Barangay"
          value={verificationForm.barangay}
          data={cdoBarangayData}
          onChange={(value) => setVerificationForm("barangay", value)}
          error={errors.barangay}
        />
        <TextInput
          placeholder="Street"
          value={verificationForm.street}
          onChangeText={(value) => setVerificationForm("street", value)}
          error={errors.street}
        />
        <TextInput
          placeholder="House Number"
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

const stylesheet = createStyleSheet((theme) =>
  StyleSheet.create({
    container: {
      paddingBottom: 70,
    },
    form: {
      rowGap: theme.gap.lg,
    },
    nextButton: {
      marginVertical: 20,
      borderRadius: theme.borderRadius.base,
    },
  })
);
