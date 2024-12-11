import { ToastAndroid, View } from "react-native";
import { Button as NPButton, Text } from "react-native-paper";
import * as FileSystem from "expo-file-system";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";

import FormHeader from "../../components/common/FormHeader";
import Button from "../../components/ui/Button";
import { supabase } from "../../utils/supabase/config";
import useBoundStore from "../../zustand/useBoundStore";
import useUserMetadata from "../../hooks/useUserMetadata";
import { useStyles, createStyleSheet } from "../../hooks/useStyles";
import TextInput from "../../components/ui/TextInput";
import Form from "../../components/common/Form";
import Layout from "../../components/common/Layout";
import { isFormValid } from "../../utils/formValidation";

const fields = [
  { name: "email", rules: [{ type: "required" }] },
  {
    name: "password",
    rules: [{ type: "required" }],
  },
];

const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const setSession = useBoundStore((state) => state.setSession);
  const { setState } = useUserMetadata();
  const { styles } = useStyles(stylesheet);

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
      console.log(`download image error: ${error.message}`);
    }
  };

  const handleSubmit = async () => {
    try {
      if (isFormValid(fields, { email, password }, setErrors)) {
        setLoading(true);

        //* If form valid, sign in account
        const { data, error } = await supabase.auth.signInWithPassword({
          email: email,
          password: password,
        });

        if (error) {
          let errors = {};
          errors.password = error.message;
          setErrors(errors);
        } else if (!error) {
          //* call the setItem in which it encrypt the session and store in secure local storage
          await setSession(data["session"]);

          //* set session global state variables
          setState(data["session"]);

          //* CALL IMAGE DOWNLOADER FUNC
          imageDownload(data["session"]["user"]["user_metadata"]["email"]);
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout removeDefaultPaddingHorizontal addNoInternetBar>
      <Form>
        <FormHeader
          title="Sign In"
          titleSize="large"
          desc="Please login to your account to access all app features."
        />

        <TextInput
          placeholder="Email Address"
          value={email}
          inputMode="email"
          onChangeText={setEmail}
          error={errors.email}
          disabled={loading}
        />
        <TextInput
          placeholder="Password"
          type="password"
          value={password}
          onChangeText={setPassword}
          error={errors.password}
          disabled={loading}
        />

        <NPButton
          compact
          mode="text"
          style={styles.forgotPassButton}
          onPress={() => navigation.navigate("ForgotPassword")}
        >
          Forgot Password
        </NPButton>

        <Button label="Sign In" onPress={handleSubmit} isLoading={loading} />

        <View style={styles.footer}>
          <Text variant="labelLarge">Don't Have an Account?</Text>
          <NPButton
            mode="text"
            compact
            onPress={() => navigation.navigate("Signup")}
            style={styles.signupButton}
            labelStyle={styles.signinButtonLabel}
          >
            Sign Up
          </NPButton>
        </View>
      </Form>
    </Layout>
  );
};

export default LoginScreen;

const stylesheet = createStyleSheet((theme) => ({
  forgotPassButton: {
    maxWidth: 180,
    alignSelf: "flex-end",
    marginBottom: 10,
    borderRadius: theme.borderRadius.md,
  },
  signupButton: {
    borderRadius: theme.borderRadius.base,
  },
  signinButtonLabel: {
    fontSize: theme.fontSize.sm,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 14,
  },
}));
