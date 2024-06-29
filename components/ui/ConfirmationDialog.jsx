import { StyleSheet, View } from "react-native";
import { Text, Dialog, Portal, useTheme } from "react-native-paper";

import PrimaryButton from "./PrimaryButton";

const ConfirmationDialog = ({
  visible,
  hideDialog,
  renderButton,
  onConfirmed,
  title,
  desc,
  confirmButtonLabel,
}) => {
  const theme = useTheme();

  const handleOnConfirmed = () => {
    onConfirmed();
    hideDialog();
  };

  return (
    <View>
      {renderButton()}
      <Portal>
        <Dialog
          visible={visible}
          onDismiss={hideDialog}
          style={styles.container}
        >
          <Dialog.Title style={styles.title}>{title}</Dialog.Title>
          {desc && (
            <Dialog.Content>
              <Text variant="bodyMedium">{desc}</Text>
            </Dialog.Content>
          )}
          <Dialog.Actions style={styles.actionButtons}>
            <PrimaryButton
              label={confirmButtonLabel}
              onPress={handleOnConfirmed}
              style={{ borderRadius: theme.borderRadius.base, width: "100%" }}
            />
            <PrimaryButton
              label=" Cancel"
              mode="text"
              onPress={hideDialog}
              style={{ borderRadius: theme.borderRadius.base, width: "100%" }}
            />
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

export default ConfirmationDialog;

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
  },
  title: {
    textAlign: "center",
    fontWeight: "bold",
  },
  actionButtons: {
    marginTop: 28,
    flexDirection: "column",
    alignItems: "baseline",
    rowGap: 6,
  },
});
