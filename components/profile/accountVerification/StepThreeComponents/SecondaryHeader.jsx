import { View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";

import { useStyles, createStyleSheet } from "../../../../hooks/useStyles";

const SecondaryHeader = ({ title, desc }) => {
  const { styles, theme } = useStyles(stylesheet);
  return (
    <View style={styles.headerSecondContent}>
      <View style={styles.titleContainer}>
        <Text style={styles.title} variant="titleLarge">
          {title}
        </Text>
        <AntDesign name="idcard" size={33} color={theme.colors.primary} />
      </View>
      <Text style={styles.desc} variant="bodyMedium">
        {desc}
      </Text>
    </View>
  );
};

export default SecondaryHeader;

const stylesheet = createStyleSheet((theme) =>
  StyleSheet.create({
    headerSecondContent: {
      marginTop: 10,
      marginBottom: 20,
    },
    titleContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    title: {
      fontWeight: "bold",
      color: theme.colors.text,
    },
    desc: {
      color: theme.colors.text2,
    },
  })
);
