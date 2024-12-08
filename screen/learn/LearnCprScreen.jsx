import { StyleSheet, View } from "react-native";

import OverallScoreBar from "../../components/cpr/OverallScoreBar";
import CircularScore from "../../components/cpr/CircularScore";
import CprHeader from "../../components/cpr/CprHeader";
import ConfirmationDialog from "../../components/ui/ConfirmationDialog";
import { useState } from "react";
import { useNavigation, StackActions } from "@react-navigation/native";
import StatusBar from "../../components/common/StatusBar";
import useCountdown from "../../hooks/useCountdown";
import Countdown from "../../components/cpr/Countdown";
import useCpr from "../../hooks/cpr/useCpr";
import useBoundStore from "../../zustand/useBoundStore";
import CprInfoDialog from "../../components/cpr/CprInfoDialog";
import usePreventBack from "../../hooks/usePreventBack";
import moment from "moment";

function CprScreen() {
  usePreventBack();
  const {
    timer,
    start: startCpr,
    stop: stopCpr,
    currentCompressionScore,
    history,
  } = useCpr();
  const { compressionDepth, depthScore, timingScore, overallScore } =
    currentCompressionScore;
  const {
    time: countdown,
    timerOn: countdownOn,
    start: startCountdown,
  } = useCountdown(3, false, startCpr);

  const [isInfoDialogVisible, setIsInfoDialogVisible] = useState(false);
  const handleOpenInfoDialog = () => setIsInfoDialogVisible(true);

  const [isConfirmDialogVisible, setIsConfirmDialogVisible] = useState(true);
  const navigation = useNavigation();

  const setCompressionHistory = useBoundStore(
    (state) => state.setCompressionHistory
  );

  const handleStartCpr = () => {
    setIsConfirmDialogVisible(false);
    startCountdown();
  };

  const handleEndCpr = () => {
    console.log(moment().format("HH:mm:ss A"), "CPR DATA: ", history);
    setCompressionHistory([...history]);
    stopCpr();
    navigation.dispatch(StackActions.replace("LearnCprScore"));
  };

  return (
    <View style={styles.container}>
      <Countdown time={countdown} visible={countdownOn} />
      <CprHeader
        handleEnd={handleEndCpr}
        onOpenInfoDialog={handleOpenInfoDialog}
      />

      <View style={styles.scoreContainer}>
        <View style={styles.scoreBarContainer}>
          <OverallScoreBar score={overallScore} />
        </View>
        <View style={styles.circularScoreContainer}>
          <CircularScore size="sm" value={timer} label="TIMER" fontSize={34} />
          <CircularScore
            label="TIMING"
            value={timingScore}
            color={
              timingScore === "Perfect"
                ? "green"
                : timingScore === "Too Early"
                ? "yellow"
                : timingScore === "Missed"
                ? "red"
                : "gray"
            }
          />
          <CircularScore
            label="DEPTH"
            value={depthScore}
            color={
              depthScore === "Perfect"
                ? "green"
                : depthScore === "Too Shallow"
                ? "yellow"
                : depthScore === "Too Deep"
                ? "red"
                : depthScore === "Missed"
                ? "red"
                : "gray"
            }
          />
          <CircularScore
            label="DEPTH(in)"
            value={compressionDepth}
            valueColor={
              depthScore === "Perfect"
                ? "green"
                : depthScore === "Too Shallow"
                ? "yellow"
                : depthScore === "Too Deep"
                ? "red"
                : depthScore === "Missed"
                ? "red"
                : "gray"
            }
            size="sm"
            fontSize={44}
          />
        </View>
      </View>

      <CprInfoDialog
        visible={isInfoDialogVisible}
        setVisible={setIsInfoDialogVisible}
      />
      <ConfirmationDialog
        isVisible={isConfirmDialogVisible}
        cancelLabel="Back"
        confirmationLabel="Start"
        onPressCancel={() => navigation.goBack()}
        onPressConfirmation={handleStartCpr}
        title={"Are you ready to start CPR practice?"}
        containerStyle={styles.dialog}
      />
      <StatusBar hidden translucent />
    </View>
  );
}

export default CprScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scoreContainer: {
    flex: 1,
  },
  scoreBarContainer: {
    flex: 1,
    maxHeight: "28%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  circularScoreContainer: {
    flex: 1,
    flexDirection: "row",
    padding: 20,
    alignItems: "flex-end",
    justifyContent: "center",
    columnGap: 10,
  },
  dialog: {
    width: 360,
    marginHorizontal: "auto",
  },
});
