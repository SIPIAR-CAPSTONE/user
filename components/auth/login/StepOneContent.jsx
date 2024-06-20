import { useNavigation } from "@react-navigation/native";
import { View, ScrollView, StyleSheet } from "react-native";
import { Button, useTheme, Text } from "react-native-paper";
import { useState } from "react";

import { TextFormField, BirthdayFormField } from "../../ui/FormField";
import PrimaryButton from "../../ui/PrimaryButton";

const StepOneContent = ({ goNextStep }) => {
  const theme = useTheme();
  const navigation = useNavigation();

  const [form, setForm] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    suffix: "",
    birthday: "",
    phone: 0,
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

    // Validate first name field if it is empty
    if (!form.firstName) {
      errors.firstName = "First Name is required.";
    }

    // Validate middle name field if it is empty
    if (!form.middleName) {
      errors.middleName = "Middle Name is required.";
    }

    // Validate last name field if it is empty
    if (!form.lastName) {
      errors.lastName = "Last Name is required.";
    }

    // Validate birthday if it is empty
    if (!form.birthday) {
      errors.birthday = "Birthday is required.";
    }

    // Validate phone field if it is empty
    if (!form.phone) {
      errors.phone = "Phone is required.";
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
    <ScrollView style={styles.container}>
      <View style={[styles.header, { rowGap: theme.gap.xs }]}>
        <Text style={[styles.title, { fontSize: theme.fontSize.md }]}>
          Tell us something about yourself
        </Text>
        <Text
          style={[
            styles.desc,
            {
              color: theme.colors.typography.secondary,
              fontSize: theme.fontSize.sm,
            },
          ]}
        >
          Only provide information that is true and correct.
        </Text>
      </View>

      {/*
       *
       * Form
       *
       */}
      <View style={[styles.formContainer, { rowGap: theme.gap.lg }]}>
        <TextFormField
          label="First Name"
          value={form.firstName}
          onChangeText={(value) => handleOnChangeValue("firstName", value)}
          error={errors.firstName}
        />
        <TextFormField
          label="Middle Name"
          value={form.middleName}
          onChangeText={(value) => handleOnChangeValue("middleName", value)}
          error={errors.middleName}
        />
        <TextFormField
          label="Last Name"
          value={form.lastName}
          onChangeText={(value) => handleOnChangeValue("lastName", value)}
          error={errors.lastName}
        />
        <TextFormField
          label="Suffix"
          value={form.suffix}
          onChangeText={(value) => handleOnChangeValue("suffix", value)}
          error={errors.suffix}
        />
        <BirthdayFormField
          label="Birthday"
          value={form.birthday}
          onChangeText={(value) => handleOnChangeValue("birthday", value)}
          error={errors.birthday}
        />
        <TextFormField
          label="Phone Number"
          inputMode="tel"
          value={form.phone}
          onChangeText={(value) => handleOnChangeValue("phone", value)}
          error={errors.phone}
        />
      </View>

      {/*
       *
       * Submit or Next Button
       *
       */}
      <PrimaryButton
        label="Next"
        onPress={handleSubmit}
        style={{ flex: 1, borderRadius: theme.borderRadius.base }}
      />
      {/*
       *
       * Footer:
       * Navigation for Sign In
       *
       */}
      <View style={styles.footer}>
        <Text variant="labelMedium">Already Have An Account?</Text>
        <Button
          compact
          onPress={() => navigation.navigate("Login")}
          labelStyle={{
            color: theme.colors.primary,
            fontSize: theme.fontSize.xs,
          }}
          style={{ borderRadius: theme.borderRadius.base }}
        >
          Sign In
        </Button>
      </View>
    </ScrollView>
  );
};

export default StepOneContent;

const styles = StyleSheet.create({
  container: {
    paddingBottom: 70,
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
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
  },
});
