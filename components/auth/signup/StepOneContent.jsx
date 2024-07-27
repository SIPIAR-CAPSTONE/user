import { View, StyleSheet } from "react-native";
import { useTheme, Text, Button } from "react-native-paper";
import { useMemo, useState } from "react";

import { TextFormField, BirthdayFormField } from "../../ui/FormField";
import PrimaryButton from "../../ui/PrimaryButton";
import FormHeader from "../../common/FormHeader";
import { useNavigation } from "@react-navigation/native";
import useBoundStore from "../../../zustand/useBoundStore";

const StepOneContent = ({ goNextStep }) => {
  const theme = useTheme();
  const styles = useMemo(() => makeStyles(theme), [theme]);
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
        <TextFormField
          label="First Name"
          value={signupForm.firstName}
          onChangeText={(value) => setSignupForm("firstName", value)}
          error={errors.firstName}
        />
        <TextFormField
          label="Middle Name"
          value={signupForm.middleName}
          onChangeText={(value) => setSignupForm("middleName", value)}
          error={errors.middleName}
        />
        <TextFormField
          label="Last Name"
          value={signupForm.lastName}
          onChangeText={(value) => setSignupForm("lastName", value)}
          error={errors.lastName}
        />
        <TextFormField
          label="Suffix"
          value={signupForm.suffix}
          onChangeText={(value) => setSignupForm("suffix", value)}
          error={errors.suffix}
        />
        <BirthdayFormField
          label="Birthday"
          date={signupForm.birthday}
          setDate={setSignupForm}
          error={errors.birthday}
        />
        <TextFormField
          label="Phone Number"
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
        <Text variant="labelMedium">Already have an Account?</Text>
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

const makeStyles = ({ gap, fontSize, borderRadius }) =>
  StyleSheet.create({
    container: {
      paddingBottom: 70,
    },
    form: {
      rowGap: gap.lg,
    },
    header: {
      marginVertical: 20,
    },
    nextButton: {
      marginVertical: 20,
      borderRadius: borderRadius.base,
    },
    signinButton: {
      borderRadius: borderRadius.base,
    },
    signinButtonLabel: {
      fontSize: fontSize.xs,
    },
    footer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },
  });
