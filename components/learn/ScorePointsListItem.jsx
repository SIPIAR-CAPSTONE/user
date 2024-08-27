import { List } from "react-native-paper";
import { createStyleSheet, useStyles } from "../../hooks/useStyles";
import ScorePoints from "./ScorePoints";

function ScorePointsListItem({ iconName, title, points, progress }) {
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
      right={(props) => (
        <ScorePoints progress={progress} points={points} {...props} />
      )}
    />
  );
}

export default ScorePointsListItem;

const stylesheet = createStyleSheet((theme) => ({
  titleStyle: {
    color: theme.colors.typography.primary,
    fontSize: 17,
  },
}));
