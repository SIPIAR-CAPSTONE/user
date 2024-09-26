import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { useState } from "react";
import FormHeader from "../../../components/common/FormHeader";
import { createStyleSheet, useStyles } from "../../../hooks/useStyles";
import TextInput from "../../../components/ui/TextInput";
import Button from "../../../components/ui/Button";
import ConfirmationDialog from "../../../components/ui/ConfirmationDialog";
import Layout from "../../../components/common/Layout";
import { isFormValid } from "../../../utils/formValidation";
import AppBar from "../../../components/ui/AppBar";
import CircularIcon from "../../../components/ui/CircularIcon";
import { useNavigation } from "@react-navigation/native";

const fields = [{ name: "password", rules: [{ type: "required" }] }];

const DeleteAccountScreen = () => {
  const navigation = useNavigation();
  const { theme, styles } = useStyles(stylesheet);
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isConfirmationDialogVisible, setIsConfirmationDialogVisible] =
    useState(false);

  const showConfirmationDialog = () => {
    if (isFormValid(fields, { password }, setErrors)) {
      setIsConfirmationDialogVisible(true);
    }
    return;
  };
  const hideConfirmationDialog = () => setIsConfirmationDialogVisible(false);

  const handleDeleteAccount = () => {
    console.log("account deleted");
  };

  const CustomAppBar = () => (
    <AppBar>
      <CircularIcon
        name="arrow-back"
        pressable
        onPress={() => navigation.goBack()}
      />
    </AppBar>
  );

  return (
    <Layout AppbarComponent={CustomAppBar}>
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
      color: theme.colors.text,
    },
    buttonContainer: {
      marginTop: 60,
      rowGap: theme.spacing.xxs,
    },
    cancelButton: {
      borderRadius: theme.borderRadius.sm,
    },
  })
);
