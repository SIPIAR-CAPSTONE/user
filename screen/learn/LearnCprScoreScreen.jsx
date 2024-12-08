import { View, Text, ScrollView } from "react-native";
import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { Divider } from "react-native-paper";

import ScorePointsListItem from "../../components/learn/ScorePointsListItem";
import { useStyles, createStyleSheet } from "../../hooks/useStyles";
import ScorePoints from "../../components/learn/ScorePoints";
import AppBarTitle from "../../components/ui/AppBarTitle";
import useBoundStore from "../../zustand/useBoundStore";
import usePreventBack from "../../hooks/usePreventBack";
import Layout from "../../components/common/Layout";
import AppBar from "../../components/ui/AppBar";
import Button from "../../components/ui/Button";
import Color from "../../utils/Color";
import {
  countScore,
  getFormattedCurrentDate,
  getTotalTimeDuration,
  getScorePercentage,
} from "./Learn.helper";

const LearnCprScoreScreen = () => {
  usePreventBack();
  const navigation = useNavigation();
  const { styles } = useStyles(stylesheet);
  const compressionHistory = useBoundStore((state) => state.compressionHistory);
  const clearCompressionHistory = useBoundStore(
    (state) => state.clearCompressionHistory
  );
  const currentThemeScheme = useBoundStore((state) => state.currentThemeScheme);

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
  const badOverallScoreCount =
    Number(totalCompression) - Number(perfectOverallScoreCount);

  const perfectTimingInPercentage = getScorePercentage(
    compressionHistory,
    "timingScore",
    "Perfect"
  );
  const perfectDepthInPercentage = getScorePercentage(
    compressionHistory,
    "depthScore",
    "Perfect"
  );
  const perfectDepthCount = countScore(
    compressionHistory,
    "depthScore",
    "Perfect"
  );
  const tooDeepDepthInPercentage = getScorePercentage(
    compressionHistory,
    "depthScore",
    "Too Deep"
  );
  const tooDeepDepthCount = countScore(
    compressionHistory,
    "depthScore",
    "Too Deep"
  );
  const tooShallowDepthInPercentage = getScorePercentage(
    compressionHistory,
    "depthScore",
    "Too Shallow"
  );
  const tooShallowDepthCount = countScore(
    compressionHistory,
    "depthScore",
    "Too Shallow"
  );

  const missedTimingInPercentage = getScorePercentage(
    compressionHistory,
    "timingScore",
    "Missed"
  );
  const missedTimingCount = countScore(
    compressionHistory,
    "timingScore",
    "Missed"
  );

  const handleExit = () => {
    clearCompressionHistory();
    navigation.navigate("LearnScreen");
  };

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
    <Layout
      removeDefaultPaddingHorizontal
      statusBarTheme={currentThemeScheme}
      statusBarHidden={false}
    >
      <AppBar style={styles.appbar}>
        <AppBarTitle size="lg" style={{ color: "white" }}>
          Scoring
        </AppBarTitle>
      </AppBar>

      <ScrollView style={styles.mainContent}>
        <View style={styles.overallScoreContainer}>
          <ScorePoints
            label="Score"
            labelColor="white"
            points={overallScore}
            progress={perfectOverallScorePercentage}
            size="lg"
            pointsFontSize={
              //the larger the totalCompression the smaller the fontSize of points
              totalCompression < 10 ? 40 : totalCompression < 100 ? 30 : 24
            }
            pointsColor="white"
            progressColor={
              perfectOverallScorePercentage < 40
                ? Color.red
                : perfectOverallScorePercentage < 70
                ? Color.yellow
                : Color.green
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
            title="Total Compressions"
            iconName="alpha-n-box-outline"
            points={totalCompression}
            progress={100}
            progressColor={Color.green}
          />
          <Divider />
          <ScorePointsListItem
            title="Perfect Compressions"
            iconName="thumb-up-outline"
            points={perfectOverallScoreCount}
            progress={100}
            progressColor={Color.green}
          />
          <Divider />
          <ScorePointsListItem
            title="Bad Compressions"
            iconName="thumb-down-outline"
            points={badOverallScoreCount}
            progress={100}
            progressColor={Color.red}
          />
          <Divider />
          <ScorePointsListItem
            title="Perfect Depth"
            iconName="arrow-expand-vertical"
            points={perfectDepthCount}
            progress={perfectDepthInPercentage}
            progressColor={Color.green}
          />
          <Divider />
          <ScorePointsListItem
            title="Too Deep Depth"
            iconName="arrow-expand-vertical"
            points={tooDeepDepthCount}
            progress={tooDeepDepthInPercentage}
            progressColor={Color.red}
          />
          <Divider />
          <ScorePointsListItem
            title="Too Shallow Depth"
            iconName="arrow-expand-vertical"
            points={tooShallowDepthCount}
            progress={tooShallowDepthInPercentage}
            progressColor={Color.yellow}
          />
          <Divider />
          <ScorePointsListItem
            title="Missed"
            iconName="arrow-expand-vertical"
            points={missedTimingCount}
            progress={missedTimingInPercentage}
            progressColor={Color.red}
          />
          <Divider />
          <ScorePointsListItem
            title="Avg. Perfect Timing"
            iconName="altimeter"
            points={perfectTimingInPercentage}
            pointsSuffix="%"
            progress={perfectTimingInPercentage}
            progressColor={
              perfectTimingInPercentage < 40
                ? Color.red
                : perfectTimingInPercentage < 70
                ? Color.yellow
                : Color.green
            }
          />
          <Divider />
        </View>

        <View style={styles.finishButtonContainer}>
          <Button label="Finish" onPress={handleExit} />
        </View>
      </ScrollView>
    </Layout>
  );
};

export default LearnCprScoreScreen;

const stylesheet = createStyleSheet((theme) => ({
  appbar: {
    justifyContent: "center",
    backgroundColor: theme.colors.primary,
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
    color: "white",
  },
  detailedScoreContainer: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },

  finishButtonContainer: {
    paddingHorizontal: theme.spacing.base,
    paddingVertical: 26,
    justifyContent: "flex-end",
  },
}));
