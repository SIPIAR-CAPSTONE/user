import { View } from "react-native";
import { Text, Button } from "react-native-paper";
import { useState } from "react";

import PrimaryButton from "../../ui/PrimaryButton";
import FormHeader from "../../common/FormHeader";
import { useNavigation } from "@react-navigation/native";
import useBoundStore from "../../../zustand/useBoundStore";
import { useStyles, createStyleSheet } from "../../../hooks/useStyles";
import BirthdatePicker from "../../ui/BirthdayPicker";
import TextInput from "../../ui/TextInput";

const StepOneContent = ({ goNextStep }) => {
  const { styles } = useStyles(stylesheet);
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

    if (!signupForm.firstName) errors.firstName = "First Name is required.";
    if (!signupForm.middleName) errors.middleName = "Middle Name is required.";
    if (!signupForm.lastName) errors.lastName = "Last Name is required.";
    if (!signupForm.birthday) errors.birthday = "Birthday is required.";
    if (!signupForm.phone) errors.phone = "Phone is required.";
    if (signupForm.phone.length != 11) {
      errors.phone = "Phone should have 11 numbers.";
    }

    // Set the errors and update form validity if it is empty
    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

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
          title="Tell us something about yourself"
          desc="Only provide information that is true and correct."
        />
        <TextInput
          placeholder="First Name"
          value={signupForm.firstName}
          onChangeText={(value) => setSignupForm("firstName", value)}
          error={errors.firstName}
        />
        <TextInput
          placeholder="Middle Name"
          value={signupForm.middleName}
          onChangeText={(value) => setSignupForm("middleName", value)}
          error={errors.middleName}
        />
        <TextInput
          placeholder="Last Name"
          value={signupForm.lastName}
          onChangeText={(value) => setSignupForm("lastName", value)}
          error={errors.lastName}
        />
        <TextInput
          placeholder="Suffix"
          value={signupForm.suffix}
          onChangeText={(value) => setSignupForm("suffix", value)}
          error={errors.suffix}
        />
        <BirthdatePicker
          date={signupForm.birthday}
          setDate={setSignupForm}
          error={errors.birthday}
        />
        <TextInput
          placeholder="Phone Number"
          inputMode="tel"
          value={signupForm.phone}
          onChangeText={(value) => setSignupForm("phone", value)}
          error={errors.phone}
        />

        {/* Submit or Next Button */}
        <PrimaryButton
          label="Next"
          onPress={handleSubmit}
          style={styles.nextButton}
        />
      </View>

      <View style={styles.footer}>
        <Text variant="labelLarge">Already have an Account?</Text>
        <Button
          mode="text"
          compact
          onPress={() => navigation.navigate("Login")}
          style={styles.signinButton}
          labelStyle={styles.signinButtonLabel}
        >
          Sign In
        </Button>
      </View>
    </View>
  );
};

export default StepOneContent;

const stylesheet = createStyleSheet((theme) => ({
  container: {
    paddingBottom: 70,
  },
  form: {
    rowGap: theme.gap.lg,
  },
  header: {
    marginVertical: 20,
  },
  nextButton: {
    marginVertical: 20,
    borderRadius: theme.borderRadius.base,
  },
  signinButton: {
    borderRadius: theme.borderRadius.base,
  },
  signinButtonLabel: {
    fontSize: theme.fontSize.sm,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
}));
