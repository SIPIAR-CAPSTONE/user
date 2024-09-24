import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { createStyleSheet, useStyles } from "../../hooks/useStyles";

const FormHeader = ({ title, titleStyle, titleSize = "base", desc }) => {
  const { styles, theme } = useStyles(stylesheet);

  const TITLE_SIZE_STYLE = {
    base: theme.fontSize.md,
    large: theme.fontSize.xxxl,
  };

  return (
    <View style={[styles.header, { rowGap: theme.spacing.xxxs }]}>
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
            color: theme.colors.text2,
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

const stylesheet = createStyleSheet((theme) =>
  StyleSheet.create({
    header: {
      marginVertical: theme.spacing.md,
    },
    title: {
      fontWeight: "bold",
      textAlign: "center",
    },
    desc: {
      textAlign: "center",
    },
  })
);
