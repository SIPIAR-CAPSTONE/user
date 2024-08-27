import { View, Text } from "react-native";
import React from "react";
import { useStyles, createStyleSheet } from "../../hooks/useStyles";
import AppBar from "../../components/ui/AppBar";
import PrimaryButton from "../../components/ui/PrimaryButton";
import { useNavigation } from "@react-navigation/native";
import StatusBar from "../../components/common/StatusBar";
import useBoundStore from "../../zustand/useBoundStore";
import ScorePoints from "../../components/learn/ScorePoints";
import ScorePointsListItem from "../../components/learn/ScorePointsListItem";
import { Divider } from "react-native-paper"

const LearnCprScoreScreen = () => {
  const currentThemeStatus = useBoundStore((state) => state.currentThemeStatus);
  const navigation = useNavigation();
  const { styles, theme } = useStyles(stylesheet);
  const date = new Date();
  const currentDate = date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    weekday: "long",
  });

  return (
    <>
      <StatusBar style={currentThemeStatus} />
      <AppBar style={styles.appbar}>
        <Text style={styles.appbarTitle}>Scoring</Text>
      </AppBar>

      <View style={styles.overallScoreContainer}>
        <ScorePoints
          label="Score"
          points="70"
          progress={70}
          size="lg"
          pointsFontSize={44}
          pointsColor={theme.colors.background}
        />
        <Text style={styles.currentDate}>{currentDate}</Text>
      </View>

      <View style={styles.detailedScoreContainer}>
        <View>
          <ScorePointsListItem
            title="Duration in sec."
            iconName="timer-outline"
            points="60"
            progress={100}
          />
          <Divider />
          <ScorePointsListItem
            title="AVG. Depth in inches"
            iconName="arrow-expand-vertical"
            points="2.1"
            progress={100}
          />
          <Divider />
          <ScorePointsListItem
            title="AVG. Timing in %"
            iconName="altimeter"
            points="60"
            progress={60}
          />
          <Divider />
        </View>

        <View style={styles.finishButtonContainer}>
          <PrimaryButton
            label="Finish"
            onPress={() => navigation.navigate("LearnScreen")}
            style={styles.finishButton}
          />
        </View>
      </View>
    </>
  );
};

export default LearnCprScoreScreen;

const stylesheet = createStyleSheet((theme) => ({
  appbar: {
    justifyContent: "center",
    backgroundColor: theme.colors.primary,
  },
  appbarTitle: {
    fontWeight: "bold",
    fontSize: 24,
    color: theme.colors.background,
  },
  overallScoreContainer: {
    backgroundColor: theme.colors.primary,
    alignItems: "center",
    paddingTop: 20,
    paddingBottom: 40,
  },
  currentDate: {
    fontSize: theme.fontSize.sm,
    marginTop: 14,
    marginBottom: 4,
    color: theme.colors.background,
  },

  detailedScoreContainer: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },

  finishButtonContainer: {
    flex: 1,
    paddingHorizontal: theme.padding.body.horizontal,
    paddingBottom: theme.padding.body.vertical,
    justifyContent: "flex-end",
  },
  finishButton: {
    borderRadius: theme.borderRadius.sm,
  },
}));
