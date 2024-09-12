import { Text } from "react-native-paper";
import {
  View,
  Image,
  StatusBar as RNStatusBar,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import StatusBar from "../../components/common/StatusBar";
import Button from "../../components/ui/Button";
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
        <Button label="Sign In" onPress={() => navigation.navigate("Login")} />
        <Button
          label="Sign Up"
          variant="outlined"
          onPress={() => navigation.navigate("Signup")}
        />
      </View>

      <StatusBar />
    </View>
  );
};

export default StartingScreen;

const stylesheet = createStyleSheet((theme) =>
  StyleSheet.create({
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
  })
);
