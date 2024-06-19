import StatusBar from "../components/common/StatusBar";
import { Button, Text, useTheme } from "react-native-paper";
import {
  View,
  Image,
  StyleSheet,
  StatusBar as NativeStatusBar,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const StartingScreen = () => {
  const theme = useTheme();
  const navigation = useNavigation();

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
          source={require("../assets/logo.png")}
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
        <Button
          mode="contained"
          onPress={() => navigation.navigate("Login")}
          contentStyle={{ padding: theme.padding.button.base }}
          labelStyle={{ fontSize: theme.fontSize.base }}
          style={{ borderRadius: theme.borderRadius.base }}
        >
          Sign In
        </Button>
        <Button
          mode="outlined"
          onPress={() => navigation.navigate("Signup")}
          contentStyle={{ padding: theme.padding.button.base }}
          labelStyle={{ fontSize: theme.fontSize.base }}
          style={{
            borderRadius: theme.borderRadius.base,
            borderColor: theme.colors.primary,
            borderWidth: 2,
          }}
        >
          Sign Up
        </Button>
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
    paddingTop: NativeStatusBar.currentHeight + 50,
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
