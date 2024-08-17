import { StyleSheet } from "react-native";
import { Dialog, Portal, useTheme } from "react-native-paper";
import React from "react";

import PrimaryButton from "./PrimaryButton";

const ConfirmationDialog = ({
  isVisible,
  title,
  content,
  confirmationLabel = "Confirm",
  cancelLabel = "Cancel",
  onPressConfirmation,
  onPressCancel,
}) => {
  const theme = useTheme();

  return (
    <Portal>
      <Dialog
        visible={isVisible}
        onDismiss={onPressCancel}
        style={styles.container}
      >
        <Dialog.Title style={styles.title}>{title}</Dialog.Title>
        {content && <Dialog.Content>{content}</Dialog.Content>}
        <Dialog.Actions style={styles.buttonsContainer}>
          <PrimaryButton
            label={confirmationLabel}
            onPress={onPressConfirmation}
            mode="contained"
            style={{ borderRadius: theme.borderRadius.base, width: "100%" }}
          />
          <PrimaryButton
            label={cancelLabel}
            onPress={onPressCancel}
            mode="text"
            style={{ borderRadius: theme.borderRadius.base, width: "100%" }}
          />
        </Dialog.Actions>
      </Dialog>
    </Portal>
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
  buttonsContainer: {
    marginTop: 28,
    flexDirection: "column",
    alignItems: "baseline",
    rowGap: 6,
  },
});
