import { View } from "react-native";
import { Text } from "react-native-paper";
import { useRef, useState } from "react";
import StatusBar from "../../../components/common/StatusBar";
import FormHeader from "../../../components/common/FormHeader";
import { createStyleSheet, useStyles } from "../../../hooks/useStyles";
import TextInput from "../../../components/ui/TextInput";
import PrimaryButton from "../../../components/ui/PrimaryButton";
import ConfirmationDialog from "../../../components/ui/ConfirmationDialog";

const DeleteAccountScreen = ({ navigation }) => {
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
    <View style={styles.container}>
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
        <PrimaryButton
          label="Delete Account"
          onPress={showConfirmationDialog}
        />
        <PrimaryButton
          label="Cancel"
          mode="ghost"
          onPress={() => navigation.goBack()}
          style={styles.cancelButton}
        />
      </View>

      <ConfirmationDialog
        title="Are you sure you want to delete your account?"
        isVisible={isConfirmationDialogVisible}
        onPressConfirmation={handleDeleteAccount}
        onPressCancel={hideConfirmationDialog}
      />
      <StatusBar />
    </View>
  );
};

export default DeleteAccountScreen;

const stylesheet = createStyleSheet((theme) => ({
  container: {
    paddingHorizontal: theme.padding.body.horizontal,
    paddingVertical: theme.padding.body.vertical,
  },
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
}));
