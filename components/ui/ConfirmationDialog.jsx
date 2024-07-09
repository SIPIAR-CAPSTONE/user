import { StyleSheet } from "react-native";
import { Dialog, Portal, useTheme } from "react-native-paper";
import React, { useState, useImperativeHandle, forwardRef } from "react";

import PrimaryButton from "./PrimaryButton";

const ConfirmationDialog = forwardRef(
  ({ title, content, buttons = [] }, ref) => {
    const theme = useTheme();
    const [isDialogVisible, setIsDialogVisible] = useState(false);

    const hideDialog = () => setIsDialogVisible(false);

    const showDialog = () => setIsDialogVisible(true);

    // Expose functions to the parent component
    useImperativeHandle(ref, () => ({
      showDialog,
      hideDialog,
    }));

    return (
      <Portal>
        <Dialog
          visible={isDialogVisible}
          onDismiss={hideDialog}
          style={styles.container}
        >
          <Dialog.Title style={styles.title}>{title}</Dialog.Title>
          {content && <Dialog.Content>{content}</Dialog.Content>}
          <Dialog.Actions style={styles.buttonsContainer}>
            {buttons.map((button, index) => (
              <PrimaryButton
                key={index}
                label={button.label}
                onPress={button.onPress}
                mode={button.mode}
                style={{ borderRadius: theme.borderRadius.base, width: "100%" }}
              />
            ))}
          </Dialog.Actions>
        </Dialog>
      </Portal>
    );
  }
);

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
