import { StyleSheet, View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

import StatusBar from "../../components/common/StatusBar";

/**
 * SuccessConfirmationScreen component
 * This screen is used to display a success message with an optional navigation to another screen
 * @param {Object} route - The route object containing the params for the screen such as title, desc, and nextScreen
 * @param {string} route.params.title - The title of the success message
 * @param {string} route.params.desc - The description of the success message
 * @param {string} route.params.nextScreen - The name of the screen to navigate to after a short delay
 */
const SuccessConfirmationScreen = ({ route }) => {
  const theme = useTheme();
  const navigation = useNavigation();
  const { title, desc, nextScreen } = route.params;

  /**
   * If nextScreen is provided, after a short time, navigate to nextScreen
   */
  useEffect(() => {
    if (nextScreen) {
      setTimeout(function () {
        navigation.navigate(nextScreen);
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
