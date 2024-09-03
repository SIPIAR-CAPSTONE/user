import { AnimatedCircularProgress } from "react-native-circular-progress";
import { useStyles, createStyleSheet } from "../../hooks/useStyles";
import { Text } from "react-native-paper";
import { View } from "react-native";

export default function ScorePoints({
  progress,
  points,
  pointsFontSize,
  pointsColor,
  label,
  progressColor = "#22C55E",
  backgroundColor = "#D9D9D9",
  size = "sm",
}) {
  const { styles, theme } = useStyles(stylesheet);

  const content = () => {
    if (label) {
      return (
        <View style={styles.contentContainer}>
          <Text
            style={[
              styles.points,
              {
                color: pointsColor || theme.colors.typography.primary,
                fontSize: pointsFontSize || theme.fontSize.md,
              },
            ]}
          >
            {points}
          </Text>
          <Text style={styles.label}>{label}</Text>
        </View>
      );
    }

    return <Text style={styles.points}>{points}</Text>;
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

const stylesheet = createStyleSheet((theme) => ({
  contentContainer: {
    alignItems: "center",
  },
  label: {
    color: theme.colors.background,
    fontSize: theme.fontSize.xs,
  },
  points: {
    fontWeight: "bold",
  },
}));

const sizeStyle = {
  lg: 130,
  sm: 50,
};
