import { StyleSheet, View } from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

import Button from "../../components/ui/Button";
import FormHeader from "../../components/common/FormHeader";
import { supabase } from "../../utils/supabase/config";
import { useStyles, createStyleSheet } from "../../hooks/useStyles";
import TextInput from "../../components/ui/TextInput";
import Form from "../../components/common/Form";
import Layout from "../../components/common/Layout";
import SuccessConfirmation from "../../components/common/SuccessConfirmation";
import { isFormValid } from "../../utils/formValidation";

const fields = [
  {
    name: "newPassword",
    rules: [{ type: "required" }],
  },
  {
    name: "confirmNewPassword",
    rules: [
      { type: "required" },
      {
        type: "match",
        matchField: "newPassword",
        message: "The Confirmation Password does not match.",
      },
    ],
  },
];

const ResetPasswordScreen = () => {
  const { styles } = useStyles(stylesheet);
  const navigation = useNavigation();
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const handleSubmit = async () => {
    if (isFormValid(fields, { newPassword, confirmNewPassword }, setErrors)) {
      setLoading(true);

      //* update password of user
      const { error } = await supabase.auth
        .updateUser({
          password: newPassword,
        })
        .finally(() => {
          setLoading(false);
        });

      if (error) {
        let errors = {};
        errors.confirmNewPassword = error.message;
        setErrors(errors);
      } else if (!error) {
        setShowSuccessAlert(true);
      }
    }
  };

  return (
    <Layout removeDefaultPaddingHorizontal addNoInternetBar>
      <Form style={styles.form}>
        <FormHeader
          title="Reset Password"
          titleSize="large"
          desc="Set your new password for your account"
        />

        <View style={{ height: 16 }} />

        <TextInput
          placeholder="New Password"
          type="password"
          value={newPassword}
          onChangeText={setNewPassword}
          error={errors.newPassword}
          disabled={loading}
        />
        <TextInput
          placeholder="Confirm New Password"
          type="password"
          value={confirmNewPassword}
          onChangeText={setConfirmNewPassword}
          error={errors.confirmNewPassword}
          disabled={loading}
        />

        <Button label="Next" onPress={handleSubmit} isLoading={loading} />
      </Form>

      <SuccessConfirmation
        open={showSuccessAlert}
        setOpen={setShowSuccessAlert}
        title="Reset Password Successfully!"
        desc="You can now login your new password credentials."
        onDelayEnd={() => navigation.navigate("StartingScreen")}
      />
    </Layout>
  );
};

export default ResetPasswordScreen;

const stylesheet = createStyleSheet((theme) =>
  StyleSheet.create({
    form: {
      paddingHorizontal: theme.spacing.base,
    },
  })
);
