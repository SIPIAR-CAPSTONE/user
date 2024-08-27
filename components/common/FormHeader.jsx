import { StyleSheet, View } from "react-native";
import { Text, useTheme } from "react-native-paper";

const FormHeader = ({ title, titleStyle, titleSize = "base", desc }) => {
  const theme = useTheme();

  const TITLE_SIZE_STYLE = {
    base: theme.fontSize.md,
    large: theme.fontSize.xxxl,
  };

  return (
    <View style={[styles.header, { rowGap: theme.gap.xs }]}>
      <Text
        style={[
          styles.title,
          { fontSize: TITLE_SIZE_STYLE[titleSize] },
          titleStyle,
        ]}
      >
        {title}
      </Text>
      <Text
        style={[
          styles.desc,
          {
            color: theme.colors.typography.secondary,
            fontSize: theme.fontSize.sm,
          },
        ]}
      >
        {desc}
      </Text>
    </View>
  );
};

export default FormHeader;

const styles = StyleSheet.create({
  header: {
    marginVertical: 14,
  },
  title: {
    fontWeight: "bold",
    textAlign: "center",
  },
  desc: {
    textAlign: "center",
  },
});
