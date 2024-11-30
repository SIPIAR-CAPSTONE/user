import React, { useRef, useState } from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";

import Layout from "../../components/common/Layout";
import { createStyleSheet, useStyles } from "../../hooks/useStyles";
import AnswerOption from "../../components/learn/AnswerOption";
import { useNavigation } from "@react-navigation/native";
import useCountdown from "../../hooks/useCountdown";
import Ionicons from "@expo/vector-icons/Ionicons";
import { getAnswerScore, isLastQuestion } from "./Learn.helper";
import ConfirmationDialog from "../../components/ui/ConfirmationDialog";
import CircularIcon from "../../components/ui/CircularIcon";
import AppBar from "../../components/ui/AppBar";
import useConfirmBack from "../../hooks/useConfirmBack";

const QuizScreen = ({ route }) => {
  const { id } = route.params; //!id sa ghe pili na quiz
  const navigation = useNavigation();
  const { visibleAlert, showAlert, hideAlert, confirmBack } = useConfirmBack();
  const { styles, theme } = useStyles(stylesheet);
  const {
    time,
    reset: resetTimer,
    pause: pauseTimer,
    start: startTimer,
  } = useCountdown(10, false, () => handleAnswer("missed"));
  const [isStartDialogVisible, setIsStartDialogVisible] = useState(true);
  //!temp default value
  //!diri ibutang ang na fetched na quiz
  const [quiz, setQuiz] = useState(
    QUIZ_QUESTION.find((quiz) => quiz.id == id).questions
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
      scores: {
        answerScore: getAnswerScore(answerId, currentCorrectAnswerId),
      },
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

const QUIZ_QUESTION = [
  {
    id: 1,
    questions: [
      {
        question:
          "What is the first step in performing CPR when approaching the scene?",
        options: [
          { id: 1, text: "Call 9-1-1" },
          { id: 2, text: "Check for breathing" },
          { id: 3, text: "Check the scene for safety" },
          { id: 4, text: "Begin chest compressions" },
        ],
        correctAnswerOption: 3,
      },
      {
        question:
          "How do you check for responsiveness in a person who appears unresponsive?",
        options: [
          { id: 1, text: "Tap on the person's hand" },
          { id: 2, text: "Shout and shake the person" },
          { id: 3, text: "Shout-tap-shout" },
          { id: 4, text: "Start chest compressions immediately" },
        ],
        correctAnswerOption: 3,
      },
      {
        question:
          "What should you do if the person is unresponsive and not breathing or only gasping?",
        options: [
          { id: 1, text: "Call 9-1-1" },
          { id: 2, text: "Begin chest compressions immediately" },
          { id: 3, text: "Try to wake them by shaking" },
          { id: 4, text: "Wait for someone else to help" },
        ],
        correctAnswerOption: 1,
      },
      {
        question:
          "Where should you place your hands when giving chest compressions?",
        options: [
          { id: 1, text: "On the lower abdomen" },
          { id: 2, text: "On the person's neck" },
          { id: 3, text: "On the person's back" },
          { id: 4, text: "Two hands centered on the chest" },
        ],
        correctAnswerOption: 4,
      },
      {
        question:
          " What is the recommended rate of chest compressions per minute??",
        options: [
          { id: 1, text: "50-70 compressions per minute" },
          { id: 2, text: "90-110 compressions per minute" },
          { id: 3, text: "100-120 compressions per minute" },
          { id: 4, text: "130-150 compressions per minute" },
        ],
        correctAnswerOption: 3,
      },
      {
        question: "What depth should chest compressions be during CPR?",
        options: [
          { id: 1, text: "At least 1 inch" },
          { id: 2, text: "At least 2 inches" },
          { id: 3, text: "1.5 inches" },
          { id: 4, text: "3 inches" },
        ],
        correctAnswerOption: 2,
      },
      {
        question:
          "How many chest compressions should you give before providing breaths?",
        options: [
          { id: 1, text: "20" },
          { id: 2, text: "25" },
          { id: 3, text: "30" },
          { id: 4, text: "35" },
        ],
        correctAnswerOption: 3,
      },
      {
        question:
          "When giving breaths during CPR, how should you open the airway?",
        options: [
          { id: 1, text: "Push the head back without moving the chin" },
          { id: 2, text: "Tilt the head back and lift the chin" },
          { id: 3, text: "Use both hands to press on the chest" },
          { id: 4, text: "Blow into the person's nose only" },
        ],
        correctAnswerOption: 2,
      },
      {
        question:
          "What should you do if the first breath does not cause the chest to rise?",
        options: [
          { id: 1, text: "Try a third breath immediately" },
          { id: 2, text: "Retilt the head and ensure a proper seal" },
          { id: 3, text: "Give up and start compressions again" },
          { id: 4, text: "Remove all PPE and retry" },
        ],
        correctAnswerOption: 2,
      },
      {
        question:
          "What should you do after completing 30 chest compressions during CPR?",
        options: [
          { id: 1, text: "Give 2 rescue breaths" },
          { id: 2, text: "Stop and wait for help to arrive" },
          { id: 3, text: "Give 5 more compressions" },
          { id: 4, text: "Check the person's pulse" },
        ],
        correctAnswerOption: 1,
      },
      {
        question:
          "What is the primary goal of the SIPIAR CPR mobile application?",
        options: [
          { id: 1, text: "To teach advanced medical procedures" },
          { id: 2, text: "To help bystanders perform CPR " },
          { id: 3, text: "To replace professional emergency services" },
          { id: 4, text: "To provide general health advice" },
        ],
        correctAnswerOption: 2,
      },
      {
        question: "How does the app guide a user through the CPR process?",
        options: [
          { id: 1, text: "Audio and visual guides" },
          { id: 2, text: " Video tutorials without audio" },
          { id: 3, text: "Text instructions only" },
          { id: 4, text: "Animation without instructions" },
        ],
        correctAnswerOption: 1,
      },
      {
        question:
          "What additional function does SIPIAR provide beyond CPR instructions?",
        options: [
          { id: 1, text: "Connects users to emergency dispatchers" },
          { id: 2, text: "Provides medical history of the patient" },
          { id: 3, text: "Tracks the user’s CPR performance for feedback" },
          { id: 4, text: "Offers a list of nearby hospitals" },
        ],
        correctAnswerOption: 3,
      },
      {
        question: "What age group does the SIPIAR app focus on for CPR?",
        options: [
          { id: 1, text: "Infants" },
          { id: 2, text: "Children" },
          { id: 3, text: "All age groups" },
          { id: 4, text: "Adults only" },
        ],
        correctAnswerOption: 4,
      },
      {
        question:
          "Which of the following does the SIPIAR app NOT provide assistance with?",
        options: [
          { id: 1, text: "CPR for infants and children" },
          { id: 2, text: "Monitoring compression depth during CPR" },
          { id: 3, text: " CPR for adults with cardiac arrest" },
          { id: 4, text: "Timing chest compressions" },
        ],
        correctAnswerOption: 1,
      },
    ],
  },
];
