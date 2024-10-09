import { StyleSheet, View } from "react-native";
import { Text, Button as NPButton } from "react-native-paper";
import { useState } from "react";

import Button from "../../ui/Button";
import FormHeader from "../../common/FormHeader";
import { useNavigation } from "@react-navigation/native";
import useBoundStore from "../../../zustand/useBoundStore";
import { useStyles, createStyleSheet } from "../../../hooks/useStyles";
import BirthdatePicker from "../../ui/BirthdayPicker";
import TextInput from "../../ui/TextInput";
import Form from "../../common/Form";
import { isFormValid } from "../../../utils/formValidation";

const fields = [
  { name: "firstName", rules: [{ type: "required" }] },
  { name: "middleName", rules: [{ type: "required" }] },
  { name: "lastName", rules: [{ type: "required" }] },
  { name: "birthday", rules: [{ type: "required" }] },
  {
    name: "phone",
    rules: [
      { type: "required" },
      { type: "validPhNumber" },
      {
        type: "exactLength",
        length: 11,
        message: "Phone number should be exactly 11 digits long.",
      },
    ],
  },
];

const StepOneContent = ({ goNextStep }) => {
  const { styles, theme } = useStyles(stylesheet);
  const navigation = useNavigation();

  const signupForm = useBoundStore((state) => state.signupForm);
  const setSignupForm = useBoundStore((state) => state.setSignupForm);
  const [errors, setErrors] = useState({});

  const handleSubmit = () => {
    if (isFormValid(fields, signupForm, setErrors)) {
      //if form is valid go to next step screen
      goNextStep();
    }
  };

  return (
    <Form>
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

      <Button
        label="Next"
        marginVertical={theme.spacing.xxl}
        onPress={handleSubmit}
      />

      <View style={styles.footer}>
        <Text variant="labelLarge">Already have an Account?</Text>
        <NPButton
          mode="text"
          compact
          onPress={() => navigation.navigate("Login")}
          labelStyle={styles.signinButtonLabel}
          style={styles.signinButton}
        >
          Sign In
        </NPButton>
      </View>
    </Form>
  );
};

export default StepOneContent;

const stylesheet = createStyleSheet((theme) =>
  StyleSheet.create({
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
  })
);
