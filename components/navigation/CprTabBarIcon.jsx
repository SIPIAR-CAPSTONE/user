import { View, StyleSheet, Image } from "react-native";
import { useTheme } from "react-native-paper";

export default function CprTabBarIcon() {
  const theme = useTheme();

  return (
    <View style={[styles.cprIcon, { backgroundColor: theme.colors.primary }]}>
      <Image
        style={styles.logo}
        source={require("../../assets/images/hand-white.png")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  cprIcon: {
    top: -8,
    width: 56,
    height: 56,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "crimson",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    objectFit: "contain",
    height: 42,
    width: 42,
    borderRadius: 50
  },
});
