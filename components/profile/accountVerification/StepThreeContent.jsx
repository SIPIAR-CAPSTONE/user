import { View, StyleSheet, ScrollView } from "react-native";
import { useTheme, Divider, Text } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";

import FormHeader from "../../common/FormHeader";
import ListItem from "../../ui/ListItem";
import NextActionIcon from "../../common/NextActionIcon";
import { useNavigation } from "@react-navigation/native";
import { Fragment } from "react";

const StepThreeContent = () => {
  const theme = useTheme();
  const navigation = useNavigation();

  const IdOptionListItems = IdItems.map((item) => (
    <Fragment key={item.id}>
      <ListItem
        size="small"
        title={item.title}
        roundness={0}
        contentContainerStyle={{
          backgroundColor: theme.colors.background,
          paddingEnd: 1,
        }}
        renderActionIcon={() => <NextActionIcon />}
        onPress={() => navigation.navigate("SelectAnId", { idType: item.type })}
      />
      <Divider />
    </Fragment>
  ));

  return (
    <ScrollView style={styles.container}>
      <FormHeader
        title="Tell us about yourself"
        desc="Please complete the information below"
      />
      <Divider style={[styles.divider, { marginTop: 30 }]} />
      <SecondaryHeader
        title="Accepted IDs"
        desc=" Get verified faster, all on the app."
      />
      <Divider
        style={[
          styles.divider,
          { height: 5, backgroundColor: theme.colors.elevation.level1 },
        ]}
      />
      <View>{IdOptionListItems}</View>
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

//Data for each id list item
const IdItems = [
  {
    id: 0,
    title: "National ID",
    type: "nationalId",
  },
  {
    id: 1,
    title: "Student ID",
    type: "studentId",
  },
  {
    id: 2,
    title: "ePhil ID",
    type: "ePhilId",
  },
  {
    id: 3,
    title: "Passport",
    type: "passport",
  },
];

// Secondary heading local component for the second heading
const SecondaryHeader = (props) => {
  const theme = useTheme();
  const { title, desc } = props;

  return (
    <View style={styles.headerSecondContent}>
      <View style={styles.titleContainer}>
        <Text
          style={[styles.title, { color: theme.colors.typography.primary }]}
          variant="titleLarge"
        >
          {title}
        </Text>
        <AntDesign name="idcard" size={33} color={theme.colors.primary} />
      </View>
      <Text
        style={[styles.desc, { color: theme.colors.typography.secondary }]}
        variant="bodyMedium"
      >
        {desc}
      </Text>
    </View>
  );
};
