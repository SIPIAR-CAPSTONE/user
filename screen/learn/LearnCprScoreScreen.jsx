import { View, Text, Dimensions, ScrollView } from "react-native";
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
  countColorOverallScore,
  countScore,
  getFormattedCurrentDate,
  getTotalTimeDuration,
  getScorePercentage,
  getPercentage,
} from "./Learn.helper";

const LearnCprScoreScreen = () => {
  const navigation = useNavigation();
  const { styles, theme } = useStyles(stylesheet);
  const compressionHistory = useBoundStore((state) => state.compressionHistory);
  const currentThemeStatus = useBoundStore((state) => state.currentThemeStatus);

  const currentDate = getFormattedCurrentDate();
  const totalCompression = compressionHistory.length;
  const totalDuration = getTotalTimeDuration(compressionHistory);

  const perfectOverallScoreCount = countScore(
    compressionHistory,
    "overallScore",
    "green"
  );
  const perfectOverallScorePercentage = getScorePercentage(
    compressionHistory,
    "overallScore",
    "green"
  );
  const overallScore = `${perfectOverallScoreCount}/${totalCompression}`;

  const perfectTimingInPercentage = getScorePercentage(
    compressionHistory,
    "timingScore",
    "green"
  );
  const perfectDepthInPercentage = getScorePercentage(
    compressionHistory,
    "depthScore",
    "green"
  );
  const perfectDepthCount = countScore(
    compressionHistory,
    "depthScore",
    "green"
  );
  const tooMuchDepthInPercentage = getScorePercentage(
    compressionHistory,
    "depthScore",
    "red"
  );
  const tooMuchDepthCount = countScore(compressionHistory, "depthScore", "red");
  const tooLittleDepthInPercentage = getScorePercentage(
    compressionHistory,
    "depthScore",
    "yellow"
  );
  const tooLittleDepthCount = countScore(
    compressionHistory,
    "depthScore",
    "yellow"
  );

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
      <StatusBar hidden={false} style={currentThemeStatus} />
      <AppBar style={styles.appbar}>
        <Text style={styles.appbarTitle}>Scoring</Text>
      </AppBar>

      <ScrollView style={styles.mainContent}>
        <View style={styles.overallScoreContainer}>
          <ScorePoints
            label="Score"
            points={overallScore}
            progress={perfectOverallScorePercentage}
            size="lg"
            pointsFontSize={
              //the larger the totalCompression the smaller the fontSize of points
              totalCompression < 10 ? 40 : totalCompression < 100 ? 30 : 24
            }
            pointsColor={theme.colors.background}
            progressColor={
              perfectOverallScorePercentage < 40
                ? "#DC2626"
                : perfectOverallScorePercentage < 70
                ? "#F59E0B"
                : "#22C55E"
            }
          />
          <Text style={styles.currentDate}>{currentDate}</Text>
        </View>

        <View style={styles.detailedScoreContainer}>
          <ScorePointsListItem
            title="Total Duration"
            iconName="timer-outline"
            points={totalDuration}
            pointsSuffix="s"
            progress={100}
          />
          <Divider />
          <ScorePointsListItem
            title="Average Perfect Timing"
            iconName="altimeter"
            points={perfectTimingInPercentage}
            pointsSuffix="%"
            progress={perfectTimingInPercentage}
            progressColor={
              perfectTimingInPercentage < 40
                ? "#DC2626"
                : perfectTimingInPercentage < 70
                ? "#F59E0B"
                : "#22C55E"
            }
          />
          <Divider />
          <ScorePointsListItem
            title="Average Perfect Depth"
            iconName="arrow-expand-vertical"
            points={perfectDepthInPercentage}
            pointsSuffix="%"
            progress={perfectDepthInPercentage}
            progressColor="#22C55E"
          />
          <Divider />
          <ScorePointsListItem
            title="Perfect Depth"
            iconName="arrow-expand-vertical"
            points={perfectDepthCount}
            progress={perfectDepthInPercentage}
            progressColor="#22C55E"
          />
          <Divider />
          <ScorePointsListItem
            title="Too Much Depth"
            iconName="arrow-expand-vertical"
            points={tooMuchDepthCount}
            progress={tooMuchDepthInPercentage}
            progressColor="#DC2626"
          />
          <Divider />
          <ScorePointsListItem
            title="Too Little Depth"
            iconName="arrow-expand-vertical"
            points={tooLittleDepthCount}
            progress={tooLittleDepthInPercentage}
            progressColor="#F59E0B"
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
      </ScrollView>
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

  mainContent: {
    flex: 1,
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
    paddingHorizontal: theme.padding.body.horizontal,
    paddingVertical: theme.padding.body.vertical,
    justifyContent: "flex-end",
  },
  finishButton: {
    borderRadius: theme.borderRadius.sm,
  },
}));
