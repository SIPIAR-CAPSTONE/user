import { StyleSheet, View } from "react-native";
import { Text, useTheme } from "react-native-paper";

const SectionHeader = ({ title }) => {
  const theme = useTheme();

  return (
    <View
      style={[
        styles.sectionHeader,
        {
          backgroundColor: theme.colors.secondary,
          paddingHorizontal: theme.padding.body.horizontal,
        },
      ]}
    >
      <Text
        variant="titleSmall"
        style={{ color: theme.colors.typography.secondary }}
      >
        {title}
      </Text>
    </View>
  );
};

export default SectionHeader;

const styles = StyleSheet.create({
  sectionHeader: {
    paddingVertical: 8,
    marginVertical: 12,
  },
});
