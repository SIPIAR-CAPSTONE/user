import { View, ScrollView } from "react-native";
import { Divider, Text } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";

import FormHeader from "../../common/FormHeader";
import ListItem from "../../ui/ListItem";
import NextActionIcon from "../../common/NextActionIcon";
import { Fragment, useState, lazy } from "react";
import { useStyles, createStyleSheet } from "../../../hooks/useStyles";
const SelectIdModal = lazy(() => import("./StepThreeComponents/SelectIdModal"));

const StepThreeContent = ({ goNextStep }) => {
  const { styles, theme } = useStyles(stylesheet);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const IdItems = ID_ITEMS_DATA.map((item) => (
    <Fragment key={item.id}>
      <ListItem
        size="small"
        title={item.title}
        roundness={0}
        contentContainerStyle={styles.listItem}
        renderActionIcon={() => <NextActionIcon />}
        onPress={() => {
          setSelectedId(item);
          setModalVisible(true);
        }}
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
      {IdItems}

      {modalVisible && (
        <SelectIdModal
          onClose={() => setModalVisible(false)}
          onConfirmed={() => {
            setModalVisible(false);
            goNextStep();
          }}
          idTitle={selectedId.title}
          idImageSource={selectedId.imageSource}
        />
      )}
    </ScrollView>
  );
};

// Secondary heading local component for the second heading
const SecondaryHeader = (props) => {
  const { styles, theme } = useStyles(stylesheet);
  const { title, desc } = props;

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

export default StepThreeContent;

const stylesheet = createStyleSheet((theme) => ({
  container: {
    paddingBottom: 70,
    height: 600,
  },
  listItem: {
    backgroundColor: theme.colors.background,
    paddingEnd: 1,
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
    color: theme.colors.typography.primary,
  },
  desc: {
    color: theme.colors.typography.secondary,
  },
}));

//Data for each id list item
const ID_ITEMS_DATA = [
  {
    id: 0,
    title: "National ID",
    type: "nationalId",
    imageSource:
      "https://marketplace.canva.com/EAFanujoFkY/2/0/1600w/canva-blue-modern-highschool-id-card-vjI1KIbwj8o.jpg",
  },
  {
    id: 1,
    title: "Student ID",
    type: "studentId",
    imageSource:
      "https://marketplace.canva.com/EAFXhyJiKhc/1/0/1600w/canva-white-and-red-modern-highschool-id-card-9QGif02vO4s.jpg",
  },
  {
    id: 2,
    title: "ePhil ID",
    type: "ePhilId",
    imageSource:
      "https://upload.wikimedia.org/wikipedia/commons/3/34/Philippine_Identification_System_%28PhilSys%29_card_sample.png",
  },
  {
    id: 3,
    title: "Passport",
    type: "passport",
    imageSource:
      "https://upload.wikimedia.org/wikipedia/commons/5/56/Specimen_Personal_Information_Page_South_Korean_Passport.jpg",
  },
];
