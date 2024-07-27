import { useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { Text, useTheme } from "react-native-paper";

const SectionItem = ({ label, value }) => {
  const theme = useTheme();
  const styles = useMemo(() => makeStyles(theme), [theme]);

  return (
    <View style={styles.itemContainer}>
      <Text variant="bodyMedium" style={styles.label}>
        {label}
      </Text>
      <Text variant="bodyMedium">{value}</Text>
    </View>
  );
};

export default SectionItem;

const makeStyles = ({ colors, padding }) =>
  StyleSheet.create({
    itemContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      padding: 14,
      paddingHorizontal: padding.body.horizontal,
    },
    label: {
      color: colors.typography.tertiary,
    },
  });
