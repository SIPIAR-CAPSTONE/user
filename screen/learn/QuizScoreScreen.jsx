import { View, ScrollView } from "react-native";
import { Divider, Text } from "react-native-paper";
import AppBar from "../../components/ui/AppBar";
import Layout from "../../components/common/Layout";
import useBoundStore from "../../zustand/useBoundStore";
import {
  countScore,
  getFormattedCurrentDate,
  getScorePercentage,
} from "./Learn.helper";
import Button from "../../components/ui/Button";
import { useStyles, createStyleSheet } from "../../hooks/useStyles";
import ScorePoints from "../../components/learn/ScorePoints";
import ScorePointsListItem from "../../components/learn/ScorePointsListItem";
import { useNavigation, StackActions } from "@react-navigation/native";
import Color from "../../utils/Color";

const QuizScoreScreen = ({ route }) => {
  const { quizAnswersHistory } = route.params;
  const { styles, theme } = useStyles(stylesheet);
  const navigation = useNavigation();
  const currentThemeScheme = useBoundStore((state) => state.currentThemeScheme);
  const currentDate = getFormattedCurrentDate();

  const handleExit = () => {
    navigation.dispatch(StackActions.popToTop());
  };

  const totalCompression = quizAnswersHistory.length;
  const correctScoreCount = countScore(
    quizAnswersHistory,
    "answerScore",
    "correct"
  );
  const correctScorePercentage = getScorePercentage(
    quizAnswersHistory,
    "answerScore",
    "correct"
  );
  const overallScore = `${correctScoreCount}/${totalCompression}`;
  const wrongScoreCount = countScore(
    quizAnswersHistory,
    "answerScore",
    "wrong"
  );
  const wrongScorePercentage = getScorePercentage(
    quizAnswersHistory,
    "answerScore",
    "wrong"
  );
  const missedScoreCount = countScore(
    quizAnswersHistory,
    "answerScore",
    "missed"
  );
  const missedScorePercentage = getScorePercentage(
    quizAnswersHistory,
    "answerScore",
    "missed"
  );

  return (
    <Layout
      removeDefaultPaddingHorizontal
      statusBarTheme={currentThemeScheme}
      statusBarHidden={false}
    >
      <AppBar style={styles.appbar}>
        <Text style={styles.appbarTitle}>Scoring</Text>
      </AppBar>

      <ScrollView style={styles.mainContent}>
        <View style={styles.overallScoreContainer}>
          <ScorePoints
            label="Score"
            points={overallScore}
            progress={correctScorePercentage}
            size="lg"
            pointsColor={theme.colors.background}
            progressColor={
              correctScorePercentage < 40
                ? Color.red
                : correctScorePercentage < 70
                ? Color.yellow
                : Color.green
            }
          />
          <Text style={styles.currentDate}>{currentDate}</Text>
        </View>

        <View style={styles.detailedScoreContainer}>
          <ScorePointsListItem
            title="Correct Answer"
            iconName="check"
            points={correctScoreCount}
            progress={correctScorePercentage}
            progressColor={Color.green}
          />
          <Divider />
          <ScorePointsListItem
            title="Wrong Answer"
            iconName="close"
            points={wrongScoreCount}
            progress={wrongScorePercentage}
            progressColor={Color.red}
          />
          <Divider />
          <ScorePointsListItem
            title="Missed Answer"
            iconName="progress-question"
            points={missedScoreCount}
            progress={missedScorePercentage}
            progressColor={Color.gray}
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

export default QuizScoreScreen;

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
    paddingHorizontal: theme.spacing.base,
    paddingVertical: 26,
    justifyContent: "flex-end",
  },
}));
