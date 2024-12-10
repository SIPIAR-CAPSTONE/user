import { memo } from "react";
import { StyleSheet, View, Text } from "react-native";

function CprGuideTimer({ timer }) {
  return (
    <View style={styles.container}>
      <Text style={styles.timer}>{timer}</Text>
    </View>
  );
}

export default memo(CprGuideTimer);

const styles = StyleSheet.create({
  container: {
    paddingVertical: 2,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 2,
    backgroundColor: "#bab8b8",
    borderColor: "#a6a6a6",
  },
  timer: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
});
