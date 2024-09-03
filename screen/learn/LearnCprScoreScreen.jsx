import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { useStyles, createStyleSheet } from "../../hooks/useStyles";
import AppBar from "../../components/ui/AppBar";
import PrimaryButton from "../../components/ui/PrimaryButton";
import { useNavigation } from "@react-navigation/native";
import StatusBar from "../../components/common/StatusBar";
import useBoundStore from "../../zustand/useBoundStore";
import ScorePoints from "../../components/learn/ScorePoints";
import ScorePointsListItem from "../../components/learn/ScorePointsListItem";
import { Divider } from "react-native-paper";
import {
  getAverageDepthAttempt,
  getAvgOverallScorePercentage,
  getColorScoreCount,
  getColorScorePercentage,
} from "./Learn.helper";

const LearnCprScoreScreen = () => {
  const compressionHistory = useBoundStore((state) => state.compressionHistory);
  const currentThemeStatus = useBoundStore((state) => state.currentThemeStatus);
  const navigation = useNavigation();
  const { styles, theme } = useStyles(stylesheet);

  const date = new Date();
  const currentDate = date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    weekday: "long",
  });

  const averageDepthInInches = getAverageDepthAttempt(compressionHistory);
  const averageTimingInPercent = getColorScorePercentage(
    compressionHistory,
    "green"
  );
  const totalDuration = Number(
    compressionHistory[compressionHistory.length - 1].time
  ).toFixed(0);
  const overallScorePercentage =
    getAvgOverallScorePercentage(compressionHistory);

  const perfectOverallScoreCount = getColorScoreCount(
    compressionHistory,
    "green"
  );
  const totalCompression = compressionHistory.length;
  const overallScore = `${perfectOverallScoreCount}/${totalCompression}`;
  const overallScorePointsFontSize =
    totalCompression < 10 ? 40 : totalCompression < 100 ? 30 : 24;

  //prevent going back to previous screen
  useEffect(() => {
    const beforeRemoveListener = (e) => {
      e.preventDefault();
    };

    const subscription = navigation.addListener(
      "beforeRemove",
      beforeRemoveListener
    );

    // Cleanup the listener on component unmount
    return () => {
      subscription();
    };
  }, [navigation]);

  return (
    <>
      <AppBar style={styles.appbar}>
        <Text style={styles.appbarTitle}>Scoring</Text>
      </AppBar>

      <View style={styles.overallScoreContainer}>
        <ScorePoints
          label="Score"
          points={overallScore}
          progress={overallScorePercentage}
          size="lg"
          pointsFontSize={overallScorePointsFontSize}
          pointsColor={theme.colors.background}
          progressColor={
            overallScorePercentage < 40
              ? "#DC2626"
              : overallScorePercentage < 70
              ? "#F59E0B"
              : "#22C55E"
          }
        />
        <Text style={styles.currentDate}>{currentDate}</Text>
      </View>

      <View style={styles.detailedScoreContainer}>
        <View>
          <ScorePointsListItem
            title="Duration in sec."
            iconName="timer-outline"
            points={totalDuration}
            progress={100}
          />
          <Divider />
          <ScorePointsListItem
            title="AVG. Depth in inches"
            iconName="arrow-expand-vertical"
            points={averageDepthInInches}
            progress={100}
            progressColor={
              averageDepthInInches < 2
                ? "#F59E0B"
                : averageDepthInInches > 2.5
                ? "#DC2626"
                : "#22C55E"
            }
          />
          <Divider />
          <ScorePointsListItem
            title="AVG. Timing in %"
            iconName="altimeter"
            points={averageTimingInPercent}
            progress={100}
            progressColor={
              averageTimingInPercent < 40
                ? "#DC2626"
                : averageTimingInPercent < 70
                ? "#F59E0B"
                : "#22C55E"
            }
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
        <StatusBar hidden={false} style={currentThemeStatus} />
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
