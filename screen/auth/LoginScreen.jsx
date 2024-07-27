import { ScrollView, View, StyleSheet } from "react-native";
import { Button, useTheme, Text } from "react-native-paper";
import * as FileSystem from "expo-file-system";
import { useNavigation } from "@react-navigation/native";
import { useMemo, useState } from "react";

import StatusBar from "../../components/common/StatusBar";
import FormHeader from "../../components/common/FormHeader";
import PrimaryButton from "../../components/ui/PrimaryButton";
import {
  TextFormField,
  PasswordFormField,
} from "../../components/ui/FormField";
import { supabase } from "../../utils/supabase/config";
import { LargeSecureStore } from "../../utils/SecureLocalStorage";
import useBoundStore from "../../zustand/useBoundStore";
import useUserMetadata from "../../hooks/useUserMetadata";

const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const setSession = useBoundStore((state) => state.setSession);
  const largeSecureStore = new LargeSecureStore();
  const { setState } = useUserMetadata();
  const theme = useTheme();
  const styles = useMemo(() => makeStyles(theme), [theme]);

  //* PROFILE PICTURE SETTER
  const setProfilePicturePath = useBoundStore(
    (state) => state.setProfilePicturePath
  );

  //* DOWNLOAD PROFILE PICTURE OF AUTHENTICATED USER
  const imageDownload = async (email) => {
    const { data, error } = await supabase.storage
      .from("bystander")
      .download(`profile_picture/${email}`);

    if (!error) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64data = reader.result.split(",")[1];
        const uri = FileSystem.documentDirectory + `${email}`;

        await FileSystem.writeAsStringAsync(uri, base64data, {
          encoding: FileSystem.EncodingType.Base64,
        });
        setProfilePicturePath(uri);
      };
      reader.readAsDataURL(data);
    } else if (error) {
      //todo proper handling sooon
      console.log("download image error:", error.message);
    }
  };

  /*
   *
   * Form Validation
   *
   */
  const validateForm = () => {
    const errors = {};

    if (!email) errors.email = "Email is required.";
    if (!password) errors.password = "Password is required.";

    setErrors(errors);

    // if error is no more than 0 means the form is valid
    return Object.keys(errors).length === 0;
  };

  /*
   *
   *  Handle submission for signup
   *
   */
  const handleSubmit = async () => {
    setLoading(true);

    //validateForm will return true if there is no error
    const isFormValid = validateForm();

    if (isFormValid) {
      //* If form valid, sign in account
      const { data, error } = await supabase.auth
        .signInWithPassword({
          email: email,
          password: password,
        })
        .finally(() => setLoading(false));

      if (error) {
        let errors = {};
        errors.password = error.message;
        setErrors(errors);
      } else if (!error) {
        //* call the setItem in which it encrypt the session and store in secure local storage
        encryptedSession = await largeSecureStore.setItem(
          "session",
          JSON.stringify(data["session"])
        );

        setSession(encryptedSession);

        //! set session global state variables
        setState(data["session"]);

        //! CALL IMAGE DOWNLOADER FUNC
        imageDownload(data["session"]["user"]["user_metadata"]["email"]);
      }
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.containerContent}
    >
      <View style={styles.form}>
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
          disabled={loading}
        />
        <PasswordFormField
          label="Password"
          value={password}
          onChangeText={setPassword}
          error={errors.password}
          disabled={loading}
        />

        <Button
          compact
          mode="text"
          style={styles.forgotPassButton}
          onPress={() => navigation.navigate("ForgotPassword")}
        >
          Forgot Password
        </Button>

        <PrimaryButton
          label="Sign In"
          onPress={handleSubmit}
          style={styles.signinButton}
          disabled={loading}
        />
      </View>

      <View style={styles.footer}>
        <Text variant="labelMedium">Don't Have an Account?</Text>
        <Button
          mode="text"
          compact
          onPress={() => navigation.navigate("Signup")}
          style={styles.signupButton}
          labelStyle={styles.signinButtonLabel}
        >
          Sign Up
        </Button>
      </View>

      <StatusBar />
    </ScrollView>
  );
};

export default LoginScreen;

const makeStyles = ({ padding, gap, borderRadius, fontSize }) =>
  StyleSheet.create({
    container: {
      paddingBottom: 70,
      paddingHorizontal: padding.body.horizontal,
    },
    containerContent: {
      flex: 1,
      justifyContent: "space-between",
    },
    header: {
      marginVertical: 20,
    },
    form: {
      rowGap: gap.lg,
    },
    forgotPassButton: {
      maxWidth: 180,
      alignSelf: "flex-end",
      marginBottom: 20,
      borderRadius: borderRadius.md,
    },
    signinButton: {
      borderRadius: borderRadius.base,
    },
    signupButton: {
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
