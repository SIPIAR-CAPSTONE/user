import { StyleSheet, View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

import StatusBar from "../../components/common/StatusBar";
import useStore from "../../zustand/useStore";

const SuccessConfirmationScreen = ({ route }) => {
  const theme = useTheme();
  const navigation = useNavigation();
  const { title, desc, nextScreen, userToken } = route.params;
  const setUserToken = useStore((state) => state.setUserToken);

  /*
   * if nextScreen is provided
   * after a short time, navigate to nextScreen
   */
  useEffect(() => {
    if (nextScreen) {
      setTimeout(function () {
        navigation.navigate(nextScreen);
      }, 1500);
    }
  }, []);

  /*
   *  After login or sign up
   *  show the confirmationScreen and after a short delay proceed to home screen
   *
   */
  useEffect(() => {
    if (userToken) {
      setTimeout(function () {
        setUserToken(userToken);
      }, 1500);
    }
  }, []);

  return (
    <View
      style={[
        styles.container,
        { paddingHorizontal: theme.padding.body.horizontal },
      ]}
    >
      <Ionicons
        name="checkmark-circle"
        size={100}
        color={theme.colors.primary}
      />
      <Text variant="titleLarge" style={styles.title}>
        {title}
      </Text>
      <Text
        variant="bodyMedium"
        style={[styles.desc, { color: theme.colors.typography.secondary }]}
      >
        {desc}
      </Text>

      <StatusBar />
    </View>
  );
};

export default SuccessConfirmationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 50,
    rowGap: 10,
  },
  title: {
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 10,
  },
  desc: {
    textAlign: "center",
  },
});
