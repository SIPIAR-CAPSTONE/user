import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { useState } from "react";
import FormHeader from "../../../components/common/FormHeader";
import { createStyleSheet, useStyles } from "../../../hooks/useStyles";
import TextInput from "../../../components/ui/TextInput";
import Button from "../../../components/ui/Button";
import ConfirmationDialog from "../../../components/ui/ConfirmationDialog";
import Layout from "../../../components/common/Layout";

const DeleteAccountScreen = () => {
  const { theme, styles } = useStyles(stylesheet);
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isConfirmationDialogVisible, setIsConfirmationDialogVisible] =
    useState(false);

  /*
   *
   * Form Validation
   *
   */
  const validateForm = () => {
    const errors = {};

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

  const showConfirmationDialog = () => {
    const isFormValid = validateForm();

    if (isFormValid) {
      setIsConfirmationDialogVisible(true);
    }
    return;
  };
  const hideConfirmationDialog = () => setIsConfirmationDialogVisible(false);

  const handleDeleteAccount = () => {
    console.log("account deleted");
  };

  return (
    <Layout>
      <FormHeader
        title="WARNING:"
        titleStyle={{ color: theme.colors.primary }}
        titleSize="large"
        desc="By deleting your account it will permanently remove in our system including all your related information."
      />

      <Text style={styles.instruction} variant="bodyMedium">
        To continue, please provide your password
      </Text>
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        type="password"
        error={errors.password}
      />

      <View style={styles.buttonContainer}>
        <Button label="Delete Account" onPress={showConfirmationDialog} />
      </View>

      <ConfirmationDialog
        title="Are you sure you want to delete your account?"
        isVisible={isConfirmationDialogVisible}
        onPressConfirmation={handleDeleteAccount}
        onPressCancel={hideConfirmationDialog}
      />
    </Layout>
  );
};

export default DeleteAccountScreen;

const stylesheet = createStyleSheet((theme) =>
  StyleSheet.create({    
    instruction: {
      marginHorizontal: "auto",
      marginTop: 40,
      marginBottom: 20,
      color: theme.colors.typography.primary,
    },
    buttonContainer: {
      marginTop: 60,
      rowGap: theme.gap.sm,
    },
    cancelButton: {
      borderRadius: theme.borderRadius.sm,
    },
  })
);
