import { View } from "react-native";
import { Text } from "react-native-paper";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import { createStyleSheet, useStyles } from "../../hooks/useStyles";

export default function EmptyLabel({ label = "Empty" }) {
  const { styles, theme } = useStyles(stylesheet);

  return (
    <View style={styles.emptyListContainer}>
      <Text style={styles.emptyListLabel}>{label}</Text>
    </View>
  );
}

const stylesheet = createStyleSheet((theme) => ({
  emptyListContainer: {
    borderRadius: theme.spacing.sm,
    width: "100%",
    height: 50,
    columnGap: theme.spacing.xs,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: theme.spacing.xxs,
  },
  emptyListLabel: {
    color: theme.colors.text2,
    marginBottom: 3,
  },
}));
