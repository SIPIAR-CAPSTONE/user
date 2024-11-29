import { ScrollView, View, Image } from "react-native";
import { Dialog, Portal, Button } from "react-native-paper";

import { H2, OL } from "../termsAndPolicy/Typography";
import { useStyles, createStyleSheet } from "../../hooks/useStyles";
import { memo } from "react";

const CprInfoDialog = ({ visible, setVisible }) => {
  const { styles } = useStyles(stylesheet);

  if (!visible) return;

  const hideDialog = () => setVisible(false);

  return (
    <Portal>
      <Dialog
        visible={visible}
        onDismiss={hideDialog}
        style={{ maxHeight: "90%" }}
      >
        <Dialog.Title>CPR Guide Information</Dialog.Title>
        <Dialog.ScrollArea>
          <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.body}>
              {CPR_INFO_DATA.map((item) => (
                <View key={item.title} style={styles.list}>
                  <View style={styles.textWrapper}>
                    <H2>{item.title}</H2>
                    {item.descriptions.map((desc, index) => (
                      <OL key={index}>{desc}</OL>
                    ))}
                  </View>
                  <Image
                    source={item.imageSource}
                    style={styles.image}
                    resizeMode="contain"
                  />
                </View>
              ))}
            </View>
          </ScrollView>
        </Dialog.ScrollArea>
        <Dialog.Actions>
          <Button onPress={hideDialog}>Close</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default memo(CprInfoDialog);

const stylesheet = createStyleSheet((theme) => ({
  container: {
    paddingBottom: 40,
    paddingHorizontal: 24,
  },
  body: {
    rowGap: theme.spacing.xs,
  },
  list: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: theme.spacing.xxxs,
  },
  textWrapper: {
    flex: 1,
  },
  image: {
    height: 150,
    width: 150,
    borderWidth: 1,
  },
}));

const CPR_INFO_DATA = [
  {
    title: "TIMER",
    descriptions: ["Displays the time passed while using the CPR guide."],
    imageSource: require("../../assets/images/learningMaterials/cprConfirmation/timer.png"),
  },
  {
    title: "TIMING",
    descriptions: [
      "Displays the current compression timing score for every 0.6 seconds.",
    ],
    imageSource: require("../../assets/images/learningMaterials/cprConfirmation/timingscore.png"),
  },
  {
    title: "DEPTH",
    descriptions: [
      "Displays the current compression depth score for every 0.6 seconds.",
      "Perfect: Depth is between 2 and 2.5 inches.",
      "Too Shallow: Depth is less than 2 inches.",
      "Too Deep: Depth is greater than 2.5 inches.",
    ],
    imageSource: require("../../assets/images/learningMaterials/cprConfirmation/depthscore.png"),
  },
  {
    title: "DEPTH(in)",
    descriptions: ["Displays the current compression depth in inches."],
    imageSource: require("../../assets/images/learningMaterials/cprConfirmation/depthInches.png"),
  },
  {
    title: "OVERALL SCORE",
    descriptions: [
      "Displays the overall compression score every 0.6 seconds based on the scores in TIMING and DEPTH.",
      "For example:",
      "If TIMING is Perfect but DEPTH is Too Shallow, then the overall score is Yellow.",
    ],
    imageSource: require("../../assets/images/learningMaterials/cprConfirmation/overallscore.png"),
  },
];
