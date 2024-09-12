import { StyleSheet } from "react-native";
import { Dialog, Portal, useTheme } from "react-native-paper";
import React from "react";

import Button from "./Button";

const ConfirmationDialog = ({
  isVisible,
  title,
  content = "",
  confirmationLabel = "Confirm",
  cancelLabel = "Cancel",
  onPressConfirmation,
  onPressCancel,
  containerStyle = {},
  dismissable = false,
}) => {

  return (
    <Portal>
      <Dialog
        visible={isVisible}
        onDismiss={onPressCancel}
        style={[styles.dialog, containerStyle]}
        dismissable={dismissable}
      >
        <Dialog.Title style={styles.title}>{title}</Dialog.Title>
        {content && <Dialog.Content>{content}</Dialog.Content>}

        <Dialog.Actions style={styles.buttonsContainer}>
          <Button label={confirmationLabel} onPress={onPressConfirmation} />
          <Button label={cancelLabel} onPress={onPressCancel} variant="text" />
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default ConfirmationDialog;

const styles = StyleSheet.create({
  dialog: {
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
