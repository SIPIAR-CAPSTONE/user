import { StyleSheet, View } from "react-native";

import OverallScoreBar from "../../components/cpr/OverallScoreBar";
import CircularScore from "../../components/cpr/CircularScore";
import useCpr from "../../hooks/cpr/useCpr";
import { type Score, type TimingScore } from "../../hooks/cpr/useCpr.types";
import { CprHeader } from "../../components/cpr/CprHeader";
import ConfirmationDialog from "../../components/ui/ConfirmationDialog";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

function CprScreen() {
  const { timer, startCpr, stopCpr, currentCompressionScore } = useCpr();
  const { depthAttempt, depthScore, timingScore, overallScore } =
    currentCompressionScore;

  const [isDialogVisible, setIsDialogVisible] = useState(true);
  const navigation = useNavigation();

  const handleStartCpr = () => {
    startCpr();
    setIsDialogVisible(false);
  };

  const handleEnd = () => {
    stopCpr();
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <CprHeader handleEnd={handleEnd} />

      <View style={styles.scoreContainer}>
        <View style={styles.scoreBarContainer}>
          <OverallScoreBar score={overallScore} />
        </View>
        <View style={styles.circularScoreContainer}>
          <CircularScore size="sm" value={timer} label="TIMER" fontSize={38} />
          <CircularScore
            color={timingScore}
            value={
              timingScore
                ? timingScoreValue[timingScore]
                : timingScoreValue.gray
            }
            label="TIMING"
          />
          <CircularScore
            color={depthScore}
            value={
              depthScore ? depthScoreValue[depthScore] : depthScoreValue.gray
            }
            label="DEPTH"
          />
          <CircularScore
            size="sm"
            value={depthAttempt}
            valueColor={depthScore}
            label="DEPTH(in)"
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
    maxHeight: "35%",
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

const depthScoreValue: Record<Score, string> = {
  green: "Perfect",
  yellow: "Too  Little",
  red: "Too Much",
  gray: "",
};

const timingScoreValue: Record<TimingScore, string> = {
  green: "Perfect",
  red: "Bad",
  gray: "",
};
