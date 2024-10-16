import { View, Modal, FlatList } from "react-native";
import { Text, Searchbar, Portal, TouchableRipple } from "react-native-paper";
import { useState } from "react";

import MaterialCard from "../../components/learn/MaterialCard";
import { createStyleSheet, useStyles } from "../../hooks/useStyles";
import Layout from "../../components/common/Layout";
import AppBar from "../../components/ui/AppBar";
import CircularIcon from "../../components/ui/CircularIcon";
import NextActionIcon from "../../components/common/NextActionIcon";
import AppBarTitle from "../../components/ui/AppBarTitle";

const LearnScreen = ({ navigation }) => {
  const { styles, theme } = useStyles(stylesheet);
  const [isModalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState(SEARCH_DATA);

  const handleSearch = (query) => {
    setSearchQuery(query);
    setFilteredData(
      SEARCH_DATA.filter((item) =>
        item.title.toLowerCase().includes(query.toLowerCase())
      )
    );
  };

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);
  const handleNavigate = (route, params) => {
    closeModal();
    navigation.navigate(route, params);
  };

  const CustomAppBar = () => (
    <AppBar>
      <AppBarTitle>Learn</AppBarTitle>
      <CircularIcon name="search" onPress={openModal} />
    </AppBar>
  );

  return (
    <Layout scrollable AppbarComponent={CustomAppBar}>
      <View style={styles.section}>
        <Text variant="titleMedium" style={styles.sectionLabel}>
          Practice
        </Text>
        <MaterialCard
          size="large"
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
        <View style={styles.materialCards}>
          <MaterialCard
            size="large"
            title="How to Perform CPR"
            backgroundColor="#B6A4F8"
            buttonLabel="View Tutorial"
            imageSource={require("../../assets/images/learningMaterials/howToPerformCpr/howToPerformCprCover.png")}
            onPress={() =>
              navigation.navigate("DocumentMaterial", { data: CPR_STEPS_DATA })
            }
          />
          <MaterialCard
            size="large"
            title="QUIZ: How to Perform CPR"
            backgroundColor="#99DBCD"
            buttonLabel="Answer Quiz"
            imageSource={require("../../assets/images/learningMaterials/howToPerformCpr/howToPerformCprQuizCover.png")}
            onPress={() => navigation.navigate("Quiz", { id: "1" })}
          />
        </View>
      </View>

 
      <Portal>
        <Modal
          visible={isModalVisible}
          animationType="slide"
          onRequestClose={closeModal}
          transparent
        >
          <TouchableRipple style={{ flex: 1 }} onPress={closeModal}>
            <View style={styles.modalContainer}>
              <Searchbar
                onIconPress={closeModal}
                value={searchQuery}
                onChangeText={handleSearch}
                style={styles.searchInput}
                rippleColor={theme.colors.elevation.level5}
              />
              <FlatList
                data={filteredData}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <TouchableRipple
                    style={styles.searchResultItem}
                    onPress={() => handleNavigate(item.route, item.params)}
                  >
                    <>
                      <Text style={styles.searchResult}>{item.title}</Text>
                      <NextActionIcon styles={styles.nextAction} />
                    </>
                  </TouchableRipple>
                )}
              />
            </View>
          </TouchableRipple>
        </Modal>
      </Portal>
    </Layout>
  );
};

export default LearnScreen;

const stylesheet = createStyleSheet((theme) => ({
  section: {
    marginBottom: theme.spacing.xl,
  },
  sectionLabel: {
    marginVertical: theme.spacing.md,
    fontWeight: "bold",
  },
  materialCards: {
    rowGap: theme.spacing.md,
  },
  modalContainer: {
    flex: 1,
    padding: theme.spacing.base,
    justifyContent: "center",
    backgroundColor: "rgba(1,1,1,0.6)",
  },
  searchInput: {
    marginBottom: 20,
    backgroundColor: theme.colors.elevation.level3,
  },
  searchResult: {
    padding: 20,
  },
  searchResultItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.elevation.level3,
    paddingRight: theme.spacing.sm,
  },
  nextAction: {
    marginLeft: "auto",
  },
}));

const CPR_STEPS_DATA = [
  {
    id: 0,
    number: null,
    message: [
      "        CPR, or cardiopulmonary resuscitation can help save a life during cardiac arrest, when the heart stops beating or beats too ineffectively to circulate blood to the brain and other vital organs. However, even after training, remembering the CPR steps and administering them correctly can be a challenge.",
      "        How many compressions should you do, and how fast? How deeply should you compress the chest? How often should you give rescue breaths? These are all important factors to consider to ensure you can perform high quality CPR when the time comes. To be prepared when to perform CPR, please read the steps below. ",
    ],
    imageSource: null,
  },
  {
    id: 1,
    number: 1,
    message: ["CHECK the scene for safety."],
    imageSource: require("../../assets/images/learningMaterials/howToPerformCpr/step1.gif"),
  },
  {
    id: 2,
    number: 2,
    message: [
      "        If the person appears unresponsive, CHECK for responsiveness, breathing, life-threatening bleeding or other life-threatening conditions using shout-tap-shout.",
    ],
    imageSource: require("../../assets/images/learningMaterials/howToPerformCpr/step2.gif"),
  },
  {
    id: 3,
    number: 3,
    message: [
      "        If the person does not respond and is not breathing or only gasping, CALL 9-1-1 and get equipment, or tell someone to do so",
    ],
    imageSource: require("../../assets/images/learningMaterials/howToPerformCpr/step3.gif"),
  },
  {
    id: 4,
    number: 4,
    message: [
      "        Kneel beside the person. Place the person on their back on a firm, flat surface",
    ],
    imageSource: require("../../assets/images/learningMaterials/howToPerformCpr/step4.gif"),
  },
  {
    id: 5,
    number: 5,
    message: [
      "Remember these five points:",
      "● HAND POSITION: Two hands centered on the chest",
      "● BODY POSITION: Shoulders directly over hands; elbows locked",
      "● COMPRESSION DEPTH: At least 2 inches",
      "● RATE OF COMPRESSIONS: 100 to 120 per minute",
      "● Allow chest to return to normal position after each compression",
    ],
    imageSource: require("../../assets/images/learningMaterials/howToPerformCpr/step5.gif"),
  },
  {
    id: 6,
    number: 6,
    message: [
      "Give 2 breaths",
      "● Open the airway to a past-neutral position using the head-tilt/chin-lift technique",
      "● Pinch the nose shut, take a normal breath, and make complete seal over the person’s mouth with your mouth.",
      "● Ensure each breath lasts about 1 second and makes the chest rise; allow air to exit before giving the next breath",
      "Note: If the 1st breath does not cause the chest to rise, retilt the head and ensure a proper seal before giving the 2nd breath If the 2nd breath does not make the chest rise, an object may be blocking the airway",
    ],
    imageSource: require("../../assets/images/learningMaterials/howToPerformCpr/step6.gif"),
  },
  {
    id: 7,
    number: 7,
    message: [
      "        Continue giving sets of 30 chest compressions and 2 breaths. Use an AED as soon as one is available! Minimize interruptions to chest compressions to less than 10 seconds.",
    ],
    imageSource: require("../../assets/images/learningMaterials/howToPerformCpr/step7.gif"),
  },
];

const SEARCH_DATA = [
  { id: 1, title: "Hands-on CPR Guide Training", route: "LearnCpr" },
  {
    id: 2,
    title: "How to Perform CPR",
    route: "DocumentMaterial",
    params: { data: CPR_STEPS_DATA },
  },
  {
    id: 3,
    title: "QUIZ: How to Perform CPR",
    route: "Quiz",
    params: { data: "1" },
  },
];
