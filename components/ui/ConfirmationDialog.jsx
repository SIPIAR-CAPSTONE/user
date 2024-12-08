import { ActivityIndicator, Dialog, Portal } from "react-native-paper";
import React, { memo } from "react";

import Button from "./Button";
import { createStyleSheet, useStyles } from "../../hooks/useStyles";

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
  removePortal = false,
  loading = false,
}) => {
  if (!isVisible) return;

  const { styles } = useStyles(stylesheet);

  const handleOnPressConfirmation = () => {
    onPressConfirmation();
  };

  const DialogComponent = () => (
    <Dialog
      visible={isVisible}
      onDismiss={onPressCancel}
      style={[styles.dialog, containerStyle]}
      dismissable={dismissable}
    >
      <Dialog.Title style={styles.title}>{title}</Dialog.Title>
      {loading ? (
        <Dialog.Content style={styles.dialogLoadingContent}>
          <ActivityIndicator size="large" />
        </Dialog.Content>
      ) : (
        <>
          {content && (
            <Dialog.Content style={styles.desc}>{content}</Dialog.Content>
          )}
          <Dialog.Actions style={styles.buttonsContainer}>
            <Button
              label={confirmationLabel}
              onPress={handleOnPressConfirmation}
            />
            <Button
              label={cancelLabel}
              onPress={onPressCancel}
              variant="text"
            />
          </Dialog.Actions>
        </>
      )}
    </Dialog>
  );

  if (removePortal) {
    return <DialogComponent />;
  }

  return (
    <Portal>
      <DialogComponent />
    </Portal>
  );
};

export default memo(ConfirmationDialog);

const stylesheet = createStyleSheet((theme) => ({
  dialog: {
    paddingTop: 15,
  },
  title: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: theme.fontSize.xl,
  },
  buttonsContainer: {
    marginTop: 18,
    flexDirection: "column",
    alignItems: "baseline",
    rowGap: theme.spacing.xxs,
  },
  dialogLoadingContent: {
    height: 148,
    justifyContent: "center",
  },
}));
