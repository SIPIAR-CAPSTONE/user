import { StyleSheet, View } from "react-native";
import { useTheme } from "react-native-paper";
import { useState } from "react";

import PrimaryButton from "../../ui/PrimaryButton";
import FormHeader from "../../common/FormHeader";
import useBoundStore from "../../../zustand/useBoundStore";
import { useStyles, createStyleSheet } from "../../../hooks/useStyles";
import TextInput from "../../ui/TextInput";
import BirthdatePicker from "../../ui/BirthdayPicker";

const StepOneContent = ({ goNextStep }) => {
  const { styles } = useStyles(stylesheet);
  const verificationForm = useBoundStore((state) => state.verificationForm);
  const setVerificationForm = useBoundStore(
    (state) => state.setVerificationForm
  );
  const [errors, setErrors] = useState({});

  //TODO: diri
  // useEffect(() => {
  //   const fetchData = () => {
  //     //TODO: e set dayon
  //     for (x in userData) {
  //       if (x != "birthday") {
  //         setVerificationForm(`${x}`, userData[`${x}`]);
  //       }
  //     }
  //     // setVerificationForm('birthday', userData['birthday'])
  //   };

  //   fetchData();
  // }, []);

  /**
   * Function to validate the form
   *
   * @return {boolean} true if there are no errors, false otherwise
   *
   */
  const validateForm = () => {
    const errors = {};

    if (!verificationForm.firstName)
      errors.firstName = "First Name is required.";
    if (!verificationForm.middleName)
      errors.middleName = "Middle Name is required.";
    if (!verificationForm.lastName) errors.lastName = "Last Name is required.";
    if (!verificationForm.birthday) errors.birthday = "Birthday is required.";
    if (!verificationForm.phone) errors.phone = "Phone is required.";
    if (verificationForm.phone.length !== 11)
      errors.phone = "Phone should have 11 numbers.";

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
          title="Confirm if your information is correct"
          desc="Only provide information that is true and correct."
        />
        <TextInput
          placeholder="First Name"
          value={verificationForm.firstName}
          onChangeText={(value) => setVerificationForm("firstName", value)}
          error={errors.firstName}
        />
        <TextInput
          placeholder="Middle Name"
          value={verificationForm.middleName}
          onChangeText={(value) => setVerificationForm("middleName", value)}
          error={errors.middleName}
        />
        <TextInput
          placeholder="Last Name"
          value={verificationForm.lastName}
          onChangeText={(value) => setVerificationForm("lastName", value)}
          error={errors.lastName}
        />
        <TextInput
          placeholder="Suffix"
          value={verificationForm.suffix}
          onChangeText={(value) => setVerificationForm("suffix", value)}
          error={errors.suffix}
        />
        <BirthdatePicker
          placeholder="Birthday"
          givenDate={verificationForm.birthday}
          date={verificationForm.birthday}
          setDate={setVerificationForm}
          error={errors.birthday}
        />
        <TextInput
          placeholder="Phone Number"
          inputMode="tel"
          value={verificationForm.phone}
          onChangeText={(value) => setVerificationForm("phone", value)}
          error={errors.phone}
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

export default StepOneContent;

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
