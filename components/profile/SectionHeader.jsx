import { useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { Text, useTheme } from "react-native-paper";

const SectionHeader = ({ title }) => {
  const theme = useTheme();
  const styles = useMemo(() => makeStyles(theme), [theme]);

  return (
    <View style={styles.sectionHeader}>
      <Text variant="titleSmall" style={styles.title}>
        {title}
      </Text>
    </View>
  );
};

export default SectionHeader;

const makeStyles = ({ colors, padding }) =>
  StyleSheet.create({
    sectionHeader: {
      paddingVertical: 8,
      marginVertical: 12,
      backgroundColor: colors.secondary,
      paddingHorizontal: padding.body.horizontal,
    },
    title: {
      color: colors.typography.secondary,
    },
  });
