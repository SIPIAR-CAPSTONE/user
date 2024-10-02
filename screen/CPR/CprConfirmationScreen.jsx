import { Image, StyleSheet, View } from "react-native";
import React from "react";
import Button from "../../components/ui/Button";
import { useStyles, createStyleSheet } from "../../hooks/useStyles";
import { useNavigation } from "@react-navigation/native";
import Layout from "../../components/common/Layout";
import { Divider } from "react-native-paper";
import Ionicons from "@expo/vector-icons/Ionicons";
import { H2, OL, Strong } from "../../components/terms and policy/Typography";

const CprConfirmationScreen = () => {
  const { styles, theme } = useStyles(stylesheet);
  const navigation = useNavigation();

  return (
    <Layout scrollable contentContainerStyle={styles.container}>
      <Button label="PROCEED" onPress={() => navigation.navigate("Cpr")} />
      <Divider style={styles.divider} />

      <View style={styles.content}>
        <View style={styles.section}>
          <View style={styles.titleWrapper}>
            <Ionicons name="warning" size={20} color={theme.colors.primary} />
            <H2 style={{ color: theme.colors.primary }}>Warning:</H2>
          </View>
          <OL>Only use the CPR guide in an actual event.</OL>
          <OL>
            If your account is verified, the moment you start the CPR guide{" "}
            <Strong>It will send an emergency alert to the EMS</Strong>, and the
            responder will respond and come to your location.
          </OL>
          <OL>
            <Strong>Please use cautiously.</Strong>
          </OL>
        </View>

        <View style={styles.section}>
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
        </View>
      </View>
    </Layout>
  );
};

export default CprConfirmationScreen;

const stylesheet = createStyleSheet((theme) =>
  StyleSheet.create({
    container: {
      paddingBottom: 40,
    },
    divider: {
      marginTop: theme.spacing.md,
    },
    content: {},
    titleWrapper: {
      flexDirection: "row",
      alignItems: "center",
      columnGap: theme.spacing.xxxs,
    },
    section: {
      marginVertical: theme.spacing.lg,
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
  })
);

const CPR_INFO_DATA = [
  {
    title: "TIMER",
    descriptions: ["This shows the time passed on using  the CPR guide."],
    imageSource: require("../../assets/images/learningMaterials/cprConfirmation/timer.png"),
  },
  {
    title: "TIMING",
    descriptions: [
      "This shows the current compression timing score every 0.6 seconds.",
    ],
    imageSource: require("../../assets/images/learningMaterials/cprConfirmation/timingscore.png"),
  },
  {
    title: "DEPTH",
    descriptions: [
      "This shows the current compression depth score for every 0.6 seconds.",
      "Perfect: depth is in between 2 and 2.5 inches.",
      "Too Shallow: depth is less than 2 inches.",
      "Too Deep: depth is greater than 2.5 inches.",
    ],
    imageSource: require("../../assets/images/learningMaterials/cprConfirmation/depthscore.png"),
  },
  {
    title: "DEPTH(in)",
    descriptions: ["This shows the current compression depth in inches."],
    imageSource: require("../../assets/images/learningMaterials/cprConfirmation/depthInches.png"),
  },
  {
    title: "OVERALL SCORE",
    descriptions: [
      "This shows the overall compression score every 0.6 seconds based on the scores in TIMING and DEPTH.",
      "For example:",
      "If TIMING is Perfect but DEPTH is Too Shallow, then the overall score is Yellow.",
    ],
    imageSource: require("../../assets/images/learningMaterials/cprConfirmation/overallscore.png"),
  },
];
