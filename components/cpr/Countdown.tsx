import { StyleSheet, Text, View } from "react-native";

type CountdownProps = {
  time: number;
  visible: boolean;
};

export default function Countdown({ time, visible = true }: CountdownProps) {
  if (!visible) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.time}>{time}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    height: "100%",
    width: "100%",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "black",
    opacity: 0.8,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 99,
  },
  time: {
    color: "white",
    fontSize: 100,
    fontWeight: "bold",
  },
});
