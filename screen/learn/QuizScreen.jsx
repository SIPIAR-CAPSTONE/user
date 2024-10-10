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

const QuizScreen = ({ route }) => {
  const { id } = route.params; //!id sa ghe pili na quiz
  const navigation = useNavigation();
  const { styles, theme } = useStyles(stylesheet);
  const {
    time,
    reset: resetTimer,
    pause: pauseTimer,
    start: startTimer,
  } = useCountdown(10, false, () => handleAnswer("missed"));
  const [isStartDialogVisible, setIsStartDialogVisible] = useState(true);
  const [isExitDialogVisible, setIsExitDialogVisible] = useState(false);
  //!temp default value
  //!diri ibutang ang na fetched na quiz
  const [quiz, setQuiz] = useState(
    QUIZ_QUESTION_SAMPLE.find((quiz) => quiz.id == id).questions
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

  const handleExit = () => {
    setIsExitDialogVisible(false);
    navigation.navigate("LearnScreen");
  };

  const CustomAppBar = () => (
    <AppBar>
      <CircularIcon
        name="arrow-back"
        pressable
        onPress={() => setIsExitDialogVisible(true)}
      />
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
        isVisible={isExitDialogVisible}
        cancelLabel="Cancel"
        confirmationLabel="Exit"
        onPressCancel={() => setIsExitDialogVisible(false)}
        onPressConfirmation={handleExit}
        title="Are you sure you want to exit?"
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

//!temp
const QUIZ_QUESTION_SAMPLE = [
  {
    id: 1,
    questions: [
      {
        question:
          "What should you do if the person is unresponsive and not breathing or only gasping?",
        options: [
          { id: 1, text: "Perform CPR" },
          { id: 2, text: "Wait for help" },
          { id: 3, text: "Give them water" },
          { id: 4, text: "Check their pulse" },
        ],
        correctAnswerOption: 1,
      },
      {
        question: "Which is the primary organ for respiration?",
        options: [
          { id: 1, text: "Heart" },
          { id: 2, text: "Lungs" },
          { id: 3, text: "Brain" },
          { id: 4, text: "Tail" },
        ],
        correctAnswerOption: 2,
      },
      {
        question: "What is the chemical symbol for water?",
        options: [
          { id: 1, text: "O2" },
          { id: 2, text: "H2O" },
          { id: 3, text: "CO2" },
          { id: 4, text: "HO2" },
        ],
        correctAnswerOption: 2,
      },
      {
        question: "Which planet is known as the Red Planet?",
        options: [
          { id: 1, text: "Earth" },
          { id: 2, text: "Mars" },
          { id: 3, text: "Jupiter" },
          { id: 4, text: "Saturn" },
        ],
        correctAnswerOption: 2,
      },
      {
        question: "What is the capital of France?",
        options: [
          { id: 1, text: "Berlin" },
          { id: 2, text: "Rome" },
          { id: 3, text: "Paris" },
          { id: 4, text: "Madrid" },
        ],
        correctAnswerOption: 3,
      },
      {
        question: "What is the largest bone in the human body?",
        options: [
          { id: 1, text: "Tibia" },
          { id: 2, text: "Femur" },
          { id: 3, text: "Fibula" },
          { id: 4, text: "Humerus" },
        ],
        correctAnswerOption: 2,
      },
      {
        question: "Which element is necessary for human bones to be strong?",
        options: [
          { id: 1, text: "Iron" },
          { id: 2, text: "Calcium" },
          { id: 3, text: "Potassium" },
          { id: 4, text: "Carbon" },
        ],
        correctAnswerOption: 2,
      },
      {
        question: "Which ocean is the largest in the world?",
        options: [
          { id: 1, text: "Atlantic Ocean" },
          { id: 2, text: "Indian Ocean" },
          { id: 3, text: "Pacific Ocean" },
          { id: 4, text: "Arctic Ocean" },
        ],
        correctAnswerOption: 3,
      },
      {
        question: "What gas do plants absorb from the atmosphere?",
        options: [
          { id: 1, text: "Oxygen" },
          { id: 2, text: "Carbon Dioxide" },
          { id: 3, text: "Nitrogen" },
          { id: 4, text: "Helium" },
        ],
        correctAnswerOption: 2,
      },
      {
        question: "Which continent is the Sahara Desert located in?",
        options: [
          { id: 1, text: "Asia" },
          { id: 2, text: "Africa" },
          { id: 3, text: "Australia" },
          { id: 4, text: "North America" },
        ],
        correctAnswerOption: 2,
      },
    ],
  },
];
