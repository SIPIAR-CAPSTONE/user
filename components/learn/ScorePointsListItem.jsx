import { List } from "react-native-paper";
import { createStyleSheet, useStyles } from "../../hooks/useStyles";
import ScorePoints from "./ScorePoints";
import { StyleSheet } from "react-native";

function ScorePointsListItem({
  iconName,
  title,
  points,
  progress,
  progressColor,
  pointsSuffix,
}) {
  const { styles, theme } = useStyles(stylesheet);

  return (
    <List.Item
      title={title}
      titleStyle={styles.titleStyle}
      left={(props) => (
        <List.Icon
          {...props}
          icon={iconName}
          color={theme.colors.typography.primary}
        />
      )}
      right={() => (
        <ScorePoints
          progress={progress}
          points={points}
          progressColor={progressColor}
          pointsFontSize={16}
          pointsSuffix={pointsSuffix}
        />
      )}
    />
  );
}

export default ScorePointsListItem;

const stylesheet = createStyleSheet((theme) =>
  StyleSheet.create({
    titleStyle: {
      color: theme.colors.typography.primary,
      fontSize: 17,
    },
  })
);
