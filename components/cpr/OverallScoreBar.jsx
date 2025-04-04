import { useState, useEffect, memo } from "react";
import { View, StyleSheet, Animated, Easing } from "react-native";

import Color from "../../utils/Color";

const OverallScoreBar = ({ score }) => {
  const [progress, setProgress] = useState(new Animated.Value(0));
  const SCORE_PROGRESS_VALUE = {
    gray: 0,
    yellow: 13,
    green: 45,
    red: 78,
  };

  useEffect(() => {
    Animated.timing(progress, {
      toValue: SCORE_PROGRESS_VALUE[score || "gray"],
      duration: 15,
      useNativeDriver: false,
      easing: Easing.ease,
    }).start();
  }, [score]);

  const progressPosition = progress.interpolate({
    inputRange: [0, 100],
    outputRange: ["0%", "100%"],
  });
  return (
    <View style={styles.container}>
      <Animated.View style={[styles.bar, { left: progressPosition }]} />

      <View style={[styles.scoreBox, { backgroundColor: Color.yellow }]} />
      <View style={[styles.scoreBox, { backgroundColor: Color.green }]} />
      <View style={[styles.scoreBox, { backgroundColor: Color.red }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 42,
    borderRadius: 3,
    margin: 8,
    width: 300,
    borderWidth: 2.5,
    flexDirection: "row",
  },
  bar: {
    height: 48,
    width: 28,
    zIndex: 90,
    position: "absolute",
    bottom: -6,
    backgroundColor: "white",
    borderWidth: 3,
  },
  scoreBox: {
    height: "100%",
    zIndex: 0,
    flex: 1,
  },
});

export default memo(OverallScoreBar);
