import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { useStyles, createStyleSheet } from "../../hooks/useStyles";

const SectionHeader = ({ title }) => {
  const { styles } = useStyles(stylesheet);

  return (
    <View style={styles.sectionHeader}>
      <Text variant="titleSmall" style={styles.title}>
        {title}
      </Text>
    </View>
  );
};

export default SectionHeader;

const stylesheet = createStyleSheet((theme) =>
  StyleSheet.create({
    sectionHeader: {
      paddingVertical: 8,
      marginVertical: 12,
      backgroundColor: theme.colors.secondary,
      paddingHorizontal: theme.padding.body.horizontal,
    },
    title: {
      color: theme.colors.typography.secondary,
    },
  })
);
