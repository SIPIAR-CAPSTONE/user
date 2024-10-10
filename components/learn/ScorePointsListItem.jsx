import { List } from "react-native-paper";
import { createStyleSheet, useStyles } from "../../hooks/useStyles";
import ScorePoints from "./ScorePoints";

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
        <List.Icon {...props} icon={iconName} color={theme.colors.text} />
      )}
      right={() => (
        <ScorePoints
          progress={progress}
          points={points}
          progressColor={progressColor}
          pointsFontSize={14}
          pointsSuffix={pointsSuffix}
        />
      )}
    />
  );
}

export default ScorePointsListItem;

const stylesheet = createStyleSheet((theme) => ({
  titleStyle: {
    color: theme.colors.text,
    fontSize: 17,
  },
}));
