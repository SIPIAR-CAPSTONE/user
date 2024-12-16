import React, { useRef, useState } from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";

import Layout from "../../components/common/Layout";
import { createStyleSheet, useStyles } from "../../hooks/useStyles";
import AnswerOption from "../../components/learn/AnswerOption";
import { useNavigation } from "@react-navigation/native";
import useCountdown from "../../hooks/useCountdown";
import { Ionicons } from "@expo/vector-icons";
import { getAnswerScore, isLastQuestion } from "./Learn.helper";
import ConfirmationDialog from "../../components/ui/ConfirmationDialog";
import CircularIcon from "../../components/ui/CircularIcon";
import AppBar from "../../components/ui/AppBar";
import useConfirmBack from "../../hooks/useConfirmBack";
import { QUIZ_QUESTION } from "./quizQuestionsData";

const QuizScreen = ({ route }) => {
  const { id: selectedQuizId } = route.params;
  const navigation = useNavigation();
  const { styles, theme } = useStyles(stylesheet);
  const [isStartDialogVisible, setIsStartDialogVisible] = useState(true);
  const { visibleAlert, showAlert, hideAlert, confirmBack } = useConfirmBack();
  const {
    time,
    reset: resetTimer,
    pause: pauseTimer,
    start: startTimer,
  } = useCountdown(10, false, () => handleAnswer("missed"));
  const [quiz, setQuiz] = useState(
    QUIZ_QUESTION.find((quiz) => quiz.id == selectedQuizId)?.questions
  );
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const currentQuestion = quiz[currentQuestionIndex];
  const currentCorrectAnswerId = currentQuestion.correctAnswerOption;
  const [selectedAnswerId, setSelectedAnswerId] = useState(null);
  const quizAnswersHistory = useRef([]);

  const recordAnswer = (answer) => quizAnswersHistory.current.push(answer);

  const handleAnswer = (answerId) => {
    setSelectedAnswerId(answerId);
    recordAnswer({
      question: currentQuestion.question,
      answerScore: getAnswerScore(answerId, currentCorrectAnswerId),
    });
    resetTimer();

    setTimeout(() => {
      setSelectedAnswerId(null);

      if (isLastQuestion(currentQuestionIndex, quiz)) {
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
        pauseTimer();
        startTimer();
      } else {
        navigation.navigate("QuizScore", {
          quizAnswersHistory: quizAnswersHistory.current,
        });
      }
    }, 500);
  };

  const handleStart = () => {
    setIsStartDialogVisible(false);
    startTimer();
  };

  const CustomAppBar = () => (
    <AppBar>
      <CircularIcon name="arrow-back" onPress={showAlert} />
    </AppBar>
  );

  return (
    <Layout scrollable AppbarComponent={CustomAppBar}>
      <View
        style={[
          styles.headerBox,
          {
            backgroundColor:
              selectedAnswerId === null
                ? theme.colors.text3
                : selectedAnswerId === currentCorrectAnswerId
                ? theme.colors.green
                : theme.colors.primary,
          },
        ]}
      >
        <View style={styles.questionCard}>
          <View style={styles.timerWrapper}>
            <Text
              variant="titleLarge"
              style={[
                styles.timer,
                {
                  borderColor:
                    selectedAnswerId === currentCorrectAnswerId
                      ? theme.colors.green
                      : theme.colors.primary,
                },
              ]}
            >
              {selectedAnswerId ? (
                selectedAnswerId === currentCorrectAnswerId ? (
                  <Ionicons
                    name="checkmark"
                    size={26}
                    color={theme.colors.green}
                  />
                ) : (
                  <Ionicons
                    name="close-outline"
                    size={30}
                    color={theme.colors.primary}
                  />
                )
              ) : (
                time
              )}
            </Text>
          </View>
          <Text variant="labelLarge" style={styles.questionNumber}>
            Question {currentQuestionIndex + 1}/{quiz.length}
          </Text>
          <Text variant="bodyLarge" style={styles.question}>
            {currentQuestion.question}
          </Text>
        </View>
      </View>

      <View style={styles.answerOptions}>
        {currentQuestion.options.map((option) => (
          <AnswerOption
            key={option.id}
            onPress={() => handleAnswer(option.id)}
            isCorrect={
              selectedAnswerId === option.id
                ? selectedAnswerId === currentCorrectAnswerId
                : null
            }
            disabled={selectedAnswerId !== null}
            text={option.text}
          />
        ))}
      </View>

      <ConfirmationDialog
        isVisible={isStartDialogVisible}
        cancelLabel="Back"
        confirmationLabel="Start"
        onPressCancel={() => navigation.goBack()}
        onPressConfirmation={handleStart}
        title="Are you ready to take the quiz?"
        containerStyle={styles.dialog}
      />
      <ConfirmationDialog
        isVisible={visibleAlert}
        cancelLabel="Cancel"
        confirmationLabel="Exit"
        onPressCancel={hideAlert}
        onPressConfirmation={confirmBack}
        title="Are you sure you want to leave?"
        containerStyle={styles.dialog}
      />
    </Layout>
  );
};

export default QuizScreen;

const stylesheet = createStyleSheet((theme) => ({
  headerBox: {
    minHeight: 280,
    maxHeight: "40%",
    borderRadius: theme.borderRadius.curve,
    backgroundColor: theme.colors.primary,
  },
  questionCard: {
    minHeight: 200,
    width: "85%",
    position: "absolute",
    top: "40%",
    alignSelf: "center",
    alignItems: "center",
    backgroundColor: theme.colors.elevation.level3,
    borderRadius: theme.borderRadius.curve,
    elevation: 5,
    padding: 12,
    paddingTop: 40,
  },
  timerWrapper: {
    height: 70,
    width: 70,
    position: "absolute",
    top: -35,
    backgroundColor: theme.colors.elevation.level3,
    borderRadius: theme.borderRadius.full,
    alignItems: "center",
    justifyContent: "center",
    padding: 3,
  },
  timer: {
    height: "100%",
    width: "100%",
    borderRadius: theme.borderRadius.full,
    textAlign: "center",
    textAlignVertical: "center",
    fontWeight: "semibold",
    borderWidth: 2,
    borderColor: theme.colors.primary,
    color: theme.colors.primary,
    fontSize: theme.fontSize.xl,
  },
  questionNumber: {
    color: theme.colors.primary,
  },
  question: {
    marginTop: theme.spacing.xs,
  },
  answerOptions: {
    flex: 1,
    marginTop: 60,
    paddingVertical: theme.spacing.xl,
    rowGap: theme.spacing.lg,
  },
  dialog: {
    width: 360,
    marginHorizontal: "auto",
  },
}));
