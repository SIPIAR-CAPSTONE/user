import { StyleSheet, ScrollView } from "react-native";
import { createStyleSheet, useStyles } from "../../hooks/useStyles";

const Form = ({ style, children, ...props }) => {
  const { styles } = useStyles(stylesheet);

  return (
    <ScrollView style={style} contentContainerStyle={styles.form} {...props}>
      {children}
    </ScrollView>
  );
};

export default Form;

const stylesheet = createStyleSheet((theme) =>
  StyleSheet.create({
    form: {
      rowGap: theme.spacing.base,
      paddingBottom: 70,
    },
  })
);
