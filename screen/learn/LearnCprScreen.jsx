import { useNavigation } from "@react-navigation/native";
import { useMemo, useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";

import useTimingAudio from "../../hooks/cpr/useTimingAudio";
import useCpr from "../../hooks/cpr/useCpr";
import ScoreCircle from "../../components/cpr/ScoreCircle";
import {
  getOverallScoreColor,
  getScoreColor,
} from "../../hooks/cpr/useCpr.helper";
import usePreventBack from "../../hooks/usePreventBack";
import useFirstTimePopup from "../../hooks/useFirstTimePopup";
import useCountdown from "../../hooks/useCountdown";
import StatusBar from "../../components/common/StatusBar";
import CprInfoDialog from "../../components/cpr/CprInfoDialog";
import ConfirmationDialog from "../../components/ui/ConfirmationDialog";
import CprHeader from "../../components/cpr/CprHeader";
import Countdown from "../../components/cpr/Countdown";
import useHistory from "../../hooks/cpr/useHistory";
import useTimer from "../../hooks/cpr/useTimer";

export default function CprScreen() {
  const { isLoading: audioLoading, playAudio, stopAudio } = useTimingAudio();
  const navigation = useNavigation();
  usePreventBack();
  const { markAsDone } = useFirstTimePopup({
    key: "CprGuideInfo",
    handleFalse: () => {
      setIsInfoDialogVisible(true), markAsDone();
    },
  });
  const {
    compressionScores: {
      depth: depthScore,
      timing: timingScore,
      overall: overallScore,
    },
    isSessionStarted,
    startSession,
    stopSession,
  } = useCpr();
  const {
    history,
    clear: clearHistory,
    record: recordHistory,
    setDuration: setHistoryDuration,
  } = useHistory();

  useEffect(() => {
    if (isSessionStarted) {
      recordHistory({
        depth: depthScore,
        timing: timingScore,
        overall: overallScore,
      });
    }
  }, [overallScore]);

  const [isInfoDialogVisible, setIsInfoDialogVisible] = useState(false);
  const handleOpenInfoDialog = () => setIsInfoDialogVisible(true);

  const [isConfirmDialogVisible, setIsConfirmDialogVisible] = useState(true);
  const {
    time: countdown,
    timerOn: countdownOn,
    start: startCountdown,
  } = useCountdown(3, false, () => handleStartSession());
  const { startTimer, resetTimer, timer, timerInSeconds } = useTimer();

  //Get score colors
  const { backgroundColor: overallBgColor, borderColor: overallBorderColor } =
    useMemo(() => getOverallScoreColor(overallScore), [overallScore]);
  const { backgroundColor: timingBgColor, borderColor: timingBorderColor } =
    useMemo(() => getScoreColor(timingScore), [timingScore]);
  const { backgroundColor: depthBgColor, borderColor: depthBorderColor } =
    useMemo(() => getScoreColor(depthScore), [depthScore]);

  const handleStartSession = () => {
    playAudio();
    startSession();
    startTimer();
  };

  const handleStopSession = () => {
    stopAudio();
    stopSession();
    resetTimer();
  };

  const handleStartCpr = () => {
    setIsConfirmDialogVisible(false);
    startCountdown();
  };

  const handleEndCpr = () => {
    handleStopSession();

    setHistoryDuration(timerInSeconds);
    clearHistory();

    navigation.navigate("LearnCprScore", { history: history });
  };

  return (
    <View style={styles.container}>
      <Countdown time={countdown} visible={countdownOn} />
      <CprHeader
        handleEnd={handleEndCpr}
        onOpenInfoDialog={handleOpenInfoDialog}
        timer={timer}
      />
      <View style={styles.content}>
        <ScoreCircle
          label="Timing"
          score={timingScore}
          size="small"
          backgroundColor={timingBgColor}
          borderColor={timingBorderColor}
        />
        <ScoreCircle
          label="Feedback"
          score={overallScore}
          size="big"
          backgroundColor={overallBgColor}
          borderColor={overallBorderColor}
        />
        <ScoreCircle
          label="Depth"
          score={depthScore}
          size="small"
          backgroundColor={depthBgColor}
          borderColor={depthBorderColor}
        />
      </View>

      {isInfoDialogVisible && (
        <CprInfoDialog
          visible={isInfoDialogVisible}
          setVisible={setIsInfoDialogVisible}
        />
      )}
      {isConfirmDialogVisible && (
        <ConfirmationDialog
          isVisible={isConfirmDialogVisible}
          cancelLabel="Back"
          confirmationLabel="Start"
          onPressCancel={() => navigation.navigate("HomeScreen")}
          loading={audioLoading}
          onPressConfirmation={handleStartCpr}
          title={"Are you ready to start?"}
          containerStyle={styles.dialog}
          removePortal
        />
      )}
      <StatusBar hidden translucent />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 6,
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sensorData: {
    fontSize: 14,
  },
  content: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
    columnGap: 14,
  },
  scoreCircleContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
    borderColor: "#a6a6a6",
    backgroundColor: "#bab8b8",
    borderRadius: 500,
    maxHeight: "90%",
  },
  dialog: {
    width: 360,
    marginHorizontal: "auto",
  },
});
