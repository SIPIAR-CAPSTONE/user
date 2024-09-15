import { AnimatedCircularProgress } from "react-native-circular-progress";
import { useStyles, createStyleSheet } from "../../hooks/useStyles";
import { Text } from "react-native-paper";
import { StyleSheet, View } from "react-native";

export default function ScorePoints({
  progress,
  points,
  pointsFontSize,
  pointsColor,
  label,
  progressColor = "#22C55E",
  backgroundColor = "#D9D9D9",
  size = "md",
  pointsSuffix,
}) {
  const { styles, theme } = useStyles(stylesheet);

  const content = () => {
    if (label) {
      return (
        <View style={styles.contentContainer}>
          <View style={styles.pointsContainer}>
            <Text
              style={[
                styles.points,
                {
                  color: pointsColor || theme.colors.text,
                  fontSize: pointsFontSize || theme.fontSize.lg,
                },
              ]}
            >
              {points}
            </Text>
            <Text style={styles.pointsSuffix}>
              {pointsSuffix ? pointsSuffix : " "}
            </Text>
          </View>
          <Text style={styles.label}>{label}</Text>
        </View>
      );
    }

    return (
      <View style={styles.pointsContainer}>
        <Text
          style={[
            styles.points,
            {
              color: pointsColor || theme.colors.text,
              fontSize: pointsFontSize || theme.fontSize.lg,
            },
          ]}
        >
          {points}
        </Text>
        <Text style={styles.pointsSuffix}>
          {pointsSuffix ? pointsSuffix : " "}
        </Text>
      </View>
    );
  };

  return (
    <AnimatedCircularProgress
      size={sizeStyle[size]}
      width={6}
      fill={progress ? progress : 0}
      tintColor={progressColor}
      backgroundColor={backgroundColor}
      rotation={0}
    >
      {content}
    </AnimatedCircularProgress>
  );
}

const stylesheet = createStyleSheet((theme) =>
  StyleSheet.create({
    contentContainer: {
      alignItems: "center",
    },
    label: {
      color: theme.colors.background,
      fontSize: theme.fontSize.xs,
    },
    pointsContainer: {
      flexDirection: "row",
      alignItems: "center",
    },
    points: {
      fontWeight: "bold",
      marginLeft: 3,
    },
    pointsSuffix: {
      fontSize: 10,
      fontWeight: "bold",
      marginLeft: 1,
      marginTop: 5,
    },
  })
);

const sizeStyle = {
  lg: 130,
  md: 56,
  sm: 48,
};
