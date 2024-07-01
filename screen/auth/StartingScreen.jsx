import { Text } from "react-native-paper";
import {
  View,
  Image,
  StyleSheet,
  StatusBar as RNStatusBar,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "react-native-paper";

import StatusBar from "../../components/common/StatusBar";
import PrimaryButton from "../../components/ui/PrimaryButton";

const StartingScreen = () => {
  const navigation = useNavigation();
  const theme = useTheme();

  return (
    <View
      style={[
        styles.container,
        { paddingHorizontal: theme.padding.body.horizontal },
      ]}
    >
      {/*
       *
       * Upper Side
       * Logo and tagline Container
       *
       */}
      <View style={styles.logoContainer}>
        <Image
          style={styles.logoImage}
          source={require("../../assets/logo.png")}
        />
        <Text variant="headlineMedium" style={styles.appName}>
          SIPIAR
        </Text>
        <Text
          variant="bodyMedium"
          style={{ color: theme.colors.typography.secondary }}
        >
          Learn life saving CPR anytime, anywhere
        </Text>
      </View>

      {/*
       *
       * Lower Side
       * SignIn and SignUp buttons container
       *
       */}
      <View style={{ rowGap: theme.gap.md }}>
        <PrimaryButton
          label="Sign In"
          onPress={() => navigation.navigate("Login")}
        />
        <PrimaryButton
          label="Sign Up"
          mode="outlined"
          onPress={() => navigation.navigate("Signup")}
          style={{
            borderRadius: theme.borderRadius.base,
            borderColor: theme.colors.primary,
            borderWidth: 2,
          }}
        />
      </View>

      <StatusBar />
    </View>
  );
};

export default StartingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    paddingTop: RNStatusBar.currentHeight + 50,
    paddingBottom: 80,
  },
  logoContainer: {
    alignItems: "center",
  },
  appName: {
    fontWeight: "bold",
    letterSpacing: 1,
    marginBottom: 8,
  },
  logoImage: {
    height: 130,
    width: 160,
  },
});
