import { StyleSheet } from "react-native";
import { Dialog, Portal, Text, useTheme } from "react-native-paper";
import React from "react";

import useInternet from "../../hooks/useInternet";

const NotInternetAlert = () => {
  const theme = useTheme();
  const { hasInternet } = useInternet();

  return (
    <Portal>
      <Dialog
        visible={!hasInternet}
        dismissable={false}
        style={styles.container}
      >
        <Dialog.Icon icon="wifi-off" color={theme.colors.primary} size={74} />
        <Dialog.Title style={styles.title}>
          No Internet Connection!
        </Dialog.Title>
        <Dialog.Content>
          <Text style={styles.desc}>
            This Feature requires an internet connection. Please turn on mobile
            data or connect to a Wi-Fi.
          </Text>
        </Dialog.Content>
      </Dialog>
    </Portal>
  );
};

export default NotInternetAlert;

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingBottom: 20,
  },
  title: {
    textAlign: "center",
    fontWeight: "bold",
  },
  desc: {
    textAlign: "center",
  },
});
