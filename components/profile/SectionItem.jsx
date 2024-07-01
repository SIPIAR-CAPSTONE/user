import { StyleSheet, View } from "react-native";
import { Text, useTheme } from "react-native-paper";

const SectionItem = ({ label, value }) => {
  const theme = useTheme();

  return (
    <View
      style={[
        styles.itemContainer,
        { paddingHorizontal: theme.padding.body.horizontal },
      ]}
    >
      <Text
        variant="bodyMedium"
        style={{ color: theme.colors.typography.tertiary }}
      >
        {label}
      </Text>
      <Text variant="bodyMedium">{value}</Text>
    </View>
  );
};

export default SectionItem;

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 14,
  },
});
