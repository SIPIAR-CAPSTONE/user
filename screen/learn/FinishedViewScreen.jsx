import { View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import Ionicons from "@expo/vector-icons/Ionicons";
import Layout from "../../components/common/Layout";

import { useStyles, createStyleSheet } from "../../hooks/useStyles";
import Button from "../../components/ui/Button";
import { useNavigation } from "@react-navigation/native";

const FinishedViewScreen = () => {
  const { styles, theme } = useStyles(stylesheet);
  const navigation = useNavigation();
  return (
    <Layout>
      <View style={styles.container}>
        <Ionicons
          name="checkmark-circle"
          size={100}
          color={theme.colors.primary}
        />
        <Text variant="titleLarge" style={styles.title}>
          Congratulations for finishing the tutorial
        </Text>
        <View style={styles.buttonsContainer}>
          <Button
            label="Answer Quiz"
            onPress={() => navigation.navigate("Quiz", { id: 1 })}
          />
          <Button
            label="Exit"
            variant="outlined"
            onPress={() => navigation.navigate("LearnScreen")}
          />
        </View>
      </View>
    </Layout>
  );
};

export default FinishedViewScreen;

const stylesheet = createStyleSheet((theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      paddingBottom: 100,
      rowGap: theme.spacing.md,
      backgroundColor: theme.colors.background,
    },

    title: {
      fontSize: theme.fontSize.xl,
      fontWeight: "bold",
      textAlign: "center",
      marginTop: theme.spacing.sm,
    },
    desc: {
      textAlign: "center",
      color: theme.colors.text2,
    },
    buttonsContainer: {
      width: "100%",
      rowGap: theme.spacing.base,
      marginTop: theme.spacing.xxxl,
    },
  })
);
