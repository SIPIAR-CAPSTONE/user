import {  StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import MaterialCard from "../../components/learn/MaterialCard";
import { createStyleSheet, useStyles } from "../../hooks/useStyles";
import Layout from "../../components/common/Layout";

const LearnScreen = ({ navigation }) => {
  const { styles, theme } = useStyles(stylesheet);

  return (
    <Layout scrollable>
      <View style={styles.section}>
        <Text variant="titleMedium" style={styles.sectionLabel}>
          Practice
        </Text>
        <MaterialCard
          size="large"
          direction="left"
          title="Hands-on CPR Guide Training"
          backgroundColor={theme.colors.primary}
          buttonLabel="Practice CPR"
          imageSource={require("../../assets/images/hand-white.png")}
          onPress={() => navigation.navigate("LearnCpr")}
        />
      </View>

      <View style={styles.section}>
        <Text variant="titleMedium" style={styles.sectionLabel}>
          Learning Materials
        </Text>
      </View>
    </Layout>
  );
};

export default LearnScreen;

const stylesheet = createStyleSheet((theme) =>
  StyleSheet.create({
    section: {
      marginBottom: theme.spacing.xl,
    },
    sectionLabel: {
      marginVertical: theme.spacing.md,
      fontWeight: "bold",
    },
  })
);
