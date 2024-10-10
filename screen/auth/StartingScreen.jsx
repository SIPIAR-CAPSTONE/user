import { Text } from "react-native-paper";
import { View, Image, StatusBar as RNStatusBar } from "react-native";
import { useNavigation } from "@react-navigation/native";

import Button from "../../components/ui/Button";
import { createStyleSheet, useStyles } from "../../hooks/useStyles";
import Layout from "../../components/common/Layout";

const StartingScreen = () => {
  const navigation = useNavigation();
  const { styles } = useStyles(stylesheet);

  return (
    <Layout contentContainerStyle={styles.container} scrollable>
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
    </Layout>
  );
};

export default StartingScreen;

const stylesheet = createStyleSheet((theme) => ({
  container: {
    flex: 1,
    justifyContent: "space-between",
    paddingTop: RNStatusBar.currentHeight + 50,
    paddingBottom: 50,
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
    color: theme.colors.text2,
  },
  logoImage: {
    height: 160,
    width: 160,
  },
  buttonsContainer: {
    rowGap: theme.spacing.sm,
  },
}));
