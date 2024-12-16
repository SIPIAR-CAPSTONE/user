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
    imageSource: require("../../assets/images/cprGuideInfo/timer.jpg"),
  },
  {
    title: "TIMING",
    descriptions: [
      "Displays the current compression timing score for every compression.",
      "Pefect: if compression is performed around 500 milliseconds.",
      "Too Fast: if interval between compression is less than 450 milliseconds.",
      "Missed: if interval between compression is greater than 550 milliseconds or compression is not performed.",
    ],
    imageSource: require("../../assets/images/cprGuideInfo/timingScore.jpg"),
  },
  {
    title: "OVERALL SCORE",
    descriptions: [
      "Display feedback according on the depth and time scores combined.",
      "For example:",
      "If TIMING is Perfect but DEPTH is Too Shallow, then the feedback is Push Harder.",
    ],
    imageSource: require("../../assets/images/cprGuideInfo/feedback.jpg"),
  },
  {
    title: "DEPTH",
    descriptions: [
      "Displays the current compression depth score for every compression.",
      "Perfect: Depth is between 2 and 2.5 inches.",
      "Too Shallow: Depth is less than 2 inches.",
      "Too Deep: Depth is greater than 2.5 inches.",
    ],
    imageSource: require("../../assets/images/cprGuideInfo/depthScore.jpg"),
  },
];
