import { Text } from "react-native-paper";
import { View, Image, StatusBar as RNStatusBar } from "react-native";
import { useNavigation } from "@react-navigation/native";

import StatusBar from "../../components/common/StatusBar";
import PrimaryButton from "../../components/ui/PrimaryButton";
import { createStyleSheet, useStyles } from "../../hooks/useStyles";

const StartingScreen = () => {
  const navigation = useNavigation();
  const { styles } = useStyles(stylesheet);

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          style={styles.logoImage}
          source={require("../../assets/logo.png")}
          resizeMode="contain"
          resizeMethod="resize"
        />
        <Text variant="headlineMedium" style={styles.appName}>
          SIPIAR
        </Text>
        <Text variant="bodyMedium" style={styles.tagLine}>
          Learn life saving CPR anytime, anywhere
        </Text>
      </View>

      <View style={styles.buttonsContainer}>
        <PrimaryButton
          label="Sign In"
          onPress={() => navigation.navigate("Login")}
        />
        <PrimaryButton
          label="Sign Up"
          mode="outlined"
          onPress={() => navigation.navigate("Signup")}
          style={styles.signupButton}
        />
      </View>

      <StatusBar />
    </View>
  );
};

export default StartingScreen;

const stylesheet = createStyleSheet((theme) => ({
  container: {
    flex: 1,
    justifyContent: "space-between",
    paddingTop: RNStatusBar.currentHeight + 50,
    paddingBottom: 80,
    paddingHorizontal: theme.padding.body.horizontal,
  },
  logoContainer: {
    alignItems: "center",
  },
  appName: {
    fontWeight: "bold",
    letterSpacing: 1,
    marginBottom: 8,
  },
  tagLine: {
    color: theme.colors.typography.secondary,
  },
  logoImage: {
    height: 160,
    width: 160,
  },
  buttonsContainer: {
    rowGap: theme.gap.md,
  },
  signupButton: {
    borderRadius: theme.borderRadius.base,
    borderColor: theme.colors.primary,
    borderWidth: 2,
  },
}));
