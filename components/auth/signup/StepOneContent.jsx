import { useNavigation } from "@react-navigation/native";
import { View, StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";
import { useState } from "react";

import { TextFormField, BirthdayFormField } from "../../ui/FormField";
import PrimaryButton from "../../ui/PrimaryButton";
import FormHeader from "../../common/FormHeader";

const StepOneContent = ({ goNextStep }) => {
  const theme = useTheme();
  const navigation = useNavigation();

  const [form, setForm] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    suffix: "",
    birthday: new Date(),
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
    <View style={styles.container}>
      <FormHeader
        title="Tell us something about yourself"
        desc="Only provide information that is true and correct."
      />
      {/* Form */}
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
          date={form.birthday}
          setDate={handleOnChangeValue}
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

      {/* Submit or Next Button */}
      <PrimaryButton
        label="Next"
        onPress={handleSubmit}
        style={{ flex: 1, borderRadius: theme.borderRadius.base }}
      />
    </View>
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
});
