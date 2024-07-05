import { ScrollView, View, StyleSheet } from "react-native";
import { Button, useTheme, Text } from "react-native-paper";
import { useState } from "react";
import StatusBar from "../../components/common/StatusBar";
import FormHeader from "../../components/common/FormHeader";
import PrimaryButton from "../../components/ui/PrimaryButton";
import {
  TextFormField,
  PasswordFormField,
} from "../../components/ui/FormField";
import { useNavigation } from "@react-navigation/native";
import { supabase } from "../../utils/supabase/config";
import { LargeSecureStore } from "../../utils/SecureLocalStorage";
import useBoundStore from "../../zustand/useBoundStore";

const LoginScreen = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const setSession = useBoundStore((state) => state.setSession);
  const largeSecureStore = new LargeSecureStore();

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

    // Validate password field if it is empty
    if (!password) {
      errors.password = "Password is required.";
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
  const handleSubmit = async () => {
    //validateForm will return true if there is no error
    const isFormValid = validateForm();

    if (isFormValid) {
      //! If form valid, sign in account
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });
      if (error) {
        let errors = {};
        errors.password = error.message;
        setErrors(errors);
      } else if (!error) {
        //! call the setItem in which it encrypt the session and store in secure local storage
        encryptedSession = await largeSecureStore.setItem(
          "session",
          JSON.stringify(data["session"])
        );

        //! set encrypted session as global state
        setSession(encryptedSession);
      }
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
      contentContainerStyle={styles.containerContent}
    >
      {/* Form */}
      <View style={{ rowGap: theme.gap.lg }}>
        <FormHeader
          title="Sign In"
          titleSize="large"
          desc="Please login to your account to access all app features."
        />

        <TextFormField
          label="Email Address"
          value={email}
          inputMode="email"
          onChangeText={setEmail}
          error={errors.email}
        />
        <PasswordFormField
          label="Password"
          value={password}
          onChangeText={setPassword}
          error={errors.password}
        />

        <Button
          compact
          mode="text"
          style={[
            styles.forgotPassButton,
            { borderRadius: theme.borderRadius.md },
          ]}
          onPress={() => navigation.navigate("ForgotPassword")}
        >
          Forgot Password
        </Button>

        <PrimaryButton
          label="Sign In"
          onPress={handleSubmit}
          style={{ borderRadius: theme.borderRadius.base }}
        />
      </View>

      <View style={styles.footer}>
        <Text variant="labelMedium">Don't Have an Account?</Text>
        <Button
          mode="text"
          compact
          onPress={() => navigation.navigate("Signup")}
          style={{ borderRadius: theme.borderRadius.base }}
          labelStyle={{ fontSize: theme.fontSize.xs }}
        >
          Sign Up
        </Button>
      </View>

      <StatusBar />
    </ScrollView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    paddingBottom: 70,
  },
  containerContent: {
    flex: 1,
    justifyContent: "space-between",
  },
  header: {
    marginVertical: 20,
  },
  forgotPassButton: {
    maxWidth: 180,
    alignSelf: "flex-end",
    marginBottom: 20,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
