import { StyleSheet, ToastAndroid, View } from "react-native";
import { useCallback, useState } from "react";

import OverallScoreBar from "../../components/cpr/OverallScoreBar";
import CircularScore from "../../components/cpr/CircularScore";
import CprHeader from "../../components/cpr/CprHeader";
import ConfirmationDialog from "../../components/ui/ConfirmationDialog";
import { useNavigation } from "@react-navigation/native";
import StatusBar from "../../components/common/StatusBar";
import useCountdown from "../../hooks/useCountdown";
import Countdown from "../../components/cpr/Countdown";
import useCpr from "../../hooks/cpr/useCpr";
import CprInfoDialog from "../../components/cpr/CprInfoDialog";
import usePreventBack from "../../hooks/usePreventBack";
import useFirstTimePopup from "../../hooks/useFirstTimePopup";
import useLocation from "../../hooks/useLocation";
import useSendEmergencyAlert from "../../hooks/cpr/useSendEmergencyAlert";
import useBoundStore from "../../zustand/useBoundStore";
import useCheckVerification from "../../hooks/cpr/useCheckVerification";

function CprScreen() {
  usePreventBack();
  const { markAsDone } = useFirstTimePopup({
    key: "CprGuideInfo",
    handleFalse: () => {
      setIsInfoDialogVisible(true), markAsDone();
    },
  });
  const {
    timer,
    start: startCpr,
    stop: stopCpr,
    currentCompressionScore,
  } = useCpr();
  const { compressionDepth, depthScore, timingScore, overallScore } =
    currentCompressionScore;

  const [isInfoDialogVisible, setIsInfoDialogVisible] = useState(false);
  const handleOpenInfoDialog = () => setIsInfoDialogVisible(true);

  const [isConfirmDialogVisible, setIsConfirmDialogVisible] = useState(true);
  const navigation = useNavigation();
  const {
    time: countdown,
    timerOn: countdownOn,
    start: startCountdown,
  } = useCountdown(3, false, startCpr);

  const { userLocation } = useLocation();
  const { sendEmergencyAlertRequest } = useSendEmergencyAlert();
  useCheckVerification();

  const userIsVerified = useBoundStore((state) => state.userIsVerified);

  const handleStartCpr = () => {
    console.log(1);
    if (!userIsVerified) {
      ToastAndroid.show(
        "Failed to send emergency alert: your account is not verified",
        ToastAndroid.LONG
      );
    } else if (userIsVerified) {
      // added delayer to await current location because dili niya makuha ditso
      setTimeout(() => {
        sendEmergencyAlertRequest(
          userLocation?.latitude,
          userLocation?.longitude
        );
      }, 3000);
    }
    

    setIsConfirmDialogVisible(false);
    startCountdown();
  };

  const handleEndCpr = useCallback(() => {
    stopCpr();
    navigation.navigate("HomeScreen");
  }, []);

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
        onPressCancel={() => navigation.navigate("HomeScreen")}
        onPressConfirmation={handleStartCpr}
        title={"Are you ready to start?"}
        containerStyle={styles.dialog}
        removePortal
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
