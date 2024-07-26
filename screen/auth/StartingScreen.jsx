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
import { useMemo } from "react";

const StartingScreen = () => {
  const navigation = useNavigation();
  const theme = useTheme();
  const styles = useMemo(() => makeStyles(theme), [theme]);

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          style={styles.logoImage}
          source={require("../../assets/logo.png")}
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

const makeStyles = ({ colors, padding, gap, borderRadius }) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "space-between",
      paddingTop: RNStatusBar.currentHeight + 50,
      paddingBottom: 80,
      paddingHorizontal: padding.body.horizontal,
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
      color: colors.typography.secondary,
    },
    logoImage: {
      height: 130,
      width: 160,
    },
    buttonsContainer: {
      rowGap: gap.md,
    },
    signupButton: {
      borderRadius: borderRadius.base,
      borderColor: colors.primary,
      borderWidth: 2,
    },
  });
