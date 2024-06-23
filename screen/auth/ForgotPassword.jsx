import { StyleSheet, ScrollView, View } from "react-native";
import { useTheme } from "react-native-paper";
import FormHeader from "../../components/common/FormHeader";
import { TextFormField } from "../../components/ui/FormField";
import { useState } from "react";
import PrimaryButton from "../../components/ui/PrimaryButton";
import { useNavigation } from "@react-navigation/native";

const ForgotPassword = () => {
  const theme = useTheme();
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});

  /*
   *
   * Form Validation
   *
   */
  const validateForm = () => {
    let errors = {};

    // Validate email field if it is empty
    if (!email) {
      errors.email = "Email is required.";
    }

    //check if email has @ and .com
    if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Invalid Email";
    }

    // Set the errors and update form validity if it is empty
    setErrors(errors);

    // return true if there is no error
    // false if error length is greater than zero
    return Object.keys(errors).length === 0;
  };

  /*
   *
   *  Handle submission for signup
   *
   */
  const handleSubmit = () => {
    //validateForm will return true if there is no error
    const isFormValid = validateForm();

    if (isFormValid) {
      //if form is valid send password recovery code
      // TODO: diri pag perform sa fetching

      //then navigate to otp verification
      navigation.navigate("OtpVerification");
    }
  };

  return (
    <ScrollView
      style={[
        styles.container,
        {
          paddingHorizontal: theme.padding.body.horizontal,
        },
      ]}
    >
      <View style={{ rowGap: theme.gap.lg }}>
        <FormHeader
          title="Forgot Password"
          titleSize="large"
          desc="Please provide your email address."
        />
        <TextFormField
          label="Email Address"
          value={email}
          inputMode="email"
          onChangeText={setEmail}
          error={errors.email}
        />

        <PrimaryButton
          label="Send Code"
          onPress={handleSubmit}
          style={[styles.button, { borderRadius: theme.borderRadius.base }]}
        />
      </View>
    </ScrollView>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  container: {
    paddingBottom: 70,
  },
  button: {
    marginTop: 20,
  },
});
