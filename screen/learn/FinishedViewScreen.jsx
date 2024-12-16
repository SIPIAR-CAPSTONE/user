import { View } from "react-native";
import { Text } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import Layout from "../../components/common/Layout";

import { useStyles, createStyleSheet } from "../../hooks/useStyles";
import Button from "../../components/ui/Button";
import { useNavigation, StackActions } from "@react-navigation/native";
import useBoundStore from "../../zustand/useBoundStore";

const FinishedViewScreen = ({ route }) => {
  const { id } = route.params;
  const { styles, theme } = useStyles(stylesheet);
  const navigation = useNavigation();
  const isUserVerified = useBoundStore((state) => state.isUserVerified);

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
            style={styles.button}
            label="Exit"
            variant="outlined"
            onPress={() => navigation.navigate("LearnScreen")}
          />
          {isUserVerified && (
            <Button
              style={styles.button}
              label="Answer Quiz"
              onPress={() =>
                navigation.dispatch(StackActions.replace("Quiz", { id: id }))
              }
            />
          )}
        </View>
      </View>
    </Layout>
  );
};

export default FinishedViewScreen;

const stylesheet = createStyleSheet((theme) => ({
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
    flexDirection: "row",
    columnGap: theme.spacing.base,
    marginTop: theme.spacing.xxxl,
  },
  button: {
    flex: 1,
  },
}));
