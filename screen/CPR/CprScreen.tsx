import { StyleSheet, View } from "react-native";

import OverallScoreBar from "../../components/cpr/OverallScoreBar";
import CircularScore from "../../components/cpr/CircularScore";
import { CprHeader } from "../../components/cpr/CprHeader";
import ConfirmationDialog from "../../components/ui/ConfirmationDialog";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import StatusBar from "../../components/common/StatusBar";
import useCountdown from "../../hooks/useCountdown";
import Countdown from "../../components/cpr/Countdown";
import useCpr from "../../hooks/cpr/useCpr";

function CprScreen() {
  const {
    timer,
    start: startCpr,
    stop: stopCpr,
    currentCompressionScore,
  } = useCpr();
  const { compressionDepth, depthScore, timingScore, overallScore } =
    currentCompressionScore;

  const [isDialogVisible, setIsDialogVisible] = useState(true);
  const navigation = useNavigation();
  const {
    time: countdown,
    timerOn: countdownOn,
    start: startCountdown,
  } = useCountdown(3, false, startCpr);

  const handleStartCpr = () => {
    setIsDialogVisible(false);
    startCountdown();
  };

  /**
   * Stop CPR and go back to the previous screen.
   */
  const handleEnd = () => {
    stopCpr();
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Countdown time={countdown} visible={countdownOn} />
      <CprHeader handleEnd={handleEnd} />

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
                : timingScore === "Too Late"
                ? "red"
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

      <ConfirmationDialog
        isVisible={isDialogVisible}
        cancelLabel="Back"
        confirmationLabel="Start"
        onPressCancel={() => navigation.goBack()}
        onPressConfirmation={handleStartCpr}
        title={"Start CPR?"}
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
