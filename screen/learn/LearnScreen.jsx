import { ScrollView, View } from "react-native";
import { Text } from "react-native-paper";
import StatusBar from "../../components/common/StatusBar";
import MaterialCard from "../../components/learn/MaterialCard";
import { createStyleSheet, useStyles } from "../../hooks/useStyles";

const LearnScreen = ({ navigation }) => {
  const { styles, theme } = useStyles(stylesheet);

  return (
    <ScrollView style={styles.container}>
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
          // imageSource={require("")}
          imageSource={{ uri: "https://picsum.photos/200/300" }}
          onPress={() => navigation.navigate("LearnCpr")}
        />
      </View>

      <View style={styles.section}>
        <Text variant="titleMedium" style={styles.sectionLabel}>
          Learning Materials
        </Text>
      </View>

      <StatusBar />
    </ScrollView>
  );
};

export default LearnScreen;

const stylesheet = createStyleSheet((theme) => ({
  container: {
    paddingHorizontal: theme.padding.body.horizontal,
  },
  section: {
    marginBottom: theme.margin.body.vertical,
  },
  sectionLabel: {
    marginVertical: theme.margin.heading.vertical,
    fontWeight: "bold",
  },
}));
