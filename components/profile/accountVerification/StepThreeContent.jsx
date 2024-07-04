import { View, StyleSheet, ScrollView } from "react-native";
import { useTheme, Divider, Text } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";

import FormHeader from "../../common/FormHeader";
import ListItem from "../../ui/ListItem";
import NextActionIcon from "../../common/NextActionIcon";
import { useNavigation } from "@react-navigation/native";

const StepThreeContent = () => {
  const theme = useTheme();
  const navigation = useNavigation();

  const SectionTwoHeading = () => (
    <View style={styles.headerSecondContent}>
      <View style={styles.titleContainer}>
        <Text
          style={[styles.title, { color: theme.colors.typography.primary }]}
          variant="titleLarge"
        >
          Accepted IDs
        </Text>
        <AntDesign name="idcard" size={33} color={theme.colors.primary} />
      </View>
      <Text
        style={[styles.desc, { color: theme.colors.typography.secondary }]}
        variant="bodyMedium"
      >
        Get verified faster, all on the app.
      </Text>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <FormHeader
        title="Tell us about yourself"
        desc="Please complete the information below"
      />
      <Divider style={[styles.divider, { marginTop: 30 }]} />
      <SectionTwoHeading />
      <Divider
        style={[
          styles.divider,
          { height: 5, backgroundColor: theme.colors.elevation.level1 },
        ]}
      />

      <View>
        <ListItem
          size="small"
          title="Passport"
          roundness={0}
          contentContainerStyle={{
            backgroundColor: theme.colors.background,
            paddingEnd: 1,
          }}
          renderActionIcon={() => <NextActionIcon />}
          onPress={() => navigation.navigate("SelectAnId")}
        />
        <Divider />
        <ListItem
          size="small"
          title="National ID"
          roundness={0}
          contentContainerStyle={{
            backgroundColor: theme.colors.background,
            paddingEnd: 1,
          }}
          renderActionIcon={() => <NextActionIcon />}
          onPress={() => {}}
        />
        <Divider />
        <ListItem
          size="small"
          title="ePhil ID"
          roundness={0}
          contentContainerStyle={{
            backgroundColor: theme.colors.background,
            paddingEnd: 1,
          }}
          renderActionIcon={() => <NextActionIcon />}
          onPress={() => {}}
        />
        <Divider />
        <ListItem
          size="small"
          title="Student ID"
          roundness={0}
          contentContainerStyle={{
            backgroundColor: theme.colors.background,
            paddingEnd: 1,
          }}
          renderActionIcon={() => <NextActionIcon />}
          onPress={() => {}}
        />
        <Divider />
      </View>
    </ScrollView>
  );
};

export default StepThreeContent;

const styles = StyleSheet.create({
  container: {
    paddingBottom: 70,
    height: 600,
  },
  headerSecondContent: {
    marginTop: 10,
    marginBottom: 20,
  },
  divider: {
    marginVertical: 8,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontWeight: "bold",
  },
});
