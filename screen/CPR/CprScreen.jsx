import { useNavigation } from "@react-navigation/native";
import { useMemo, useState, useCallback, useEffect } from "react";
import { StyleSheet, View, ToastAndroid } from "react-native";

import useTimingAudio from "../../hooks/cpr/useTimingAudio";
import useCpr from "../../hooks/cpr/useCpr";
import ScoreCircle from "../../components/cpr/ScoreCircle";
import {
  getOverallScoreColor,
  getScoreColor,
} from "../../hooks/cpr/useCpr.helper";
import useLocation from "../../hooks/useLocation";
import usePreventBack from "../../hooks/usePreventBack";
import useFirstTimePopup from "../../hooks/useFirstTimePopup";
import useCountdown from "../../hooks/useCountdown";
import useSendEmergencyAlert from "../../hooks/cpr/useSendEmergencyAlert";
import useBoundStore from "../../zustand/useBoundStore";
import StatusBar from "../../components/common/StatusBar";
import CprInfoDialog from "../../components/cpr/CprInfoDialog";
import ConfirmationDialog from "../../components/ui/ConfirmationDialog";
import CprHeader from "../../components/cpr/CprHeader";
import Countdown from "../../components/cpr/Countdown";
import useTimer from "../../hooks/cpr/useTimer";
import useInternet from "../../hooks/useInternet";

export default function CprScreen() {
  const { isLoading: audioLoading, playAudio, stopAudio } = useTimingAudio();
  const { userLocation, loading: locationLoading } = useLocation();
  const userIsVerified = useBoundStore((state) => state.userIsVerified);
  const { hasInternet } = useInternet();
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
    startSession,
    stopSession,
  } = useCpr();

  const [isInfoDialogVisible, setIsInfoDialogVisible] = useState(false);
  const handleOpenInfoDialog = () => setIsInfoDialogVisible(true);

  const [isConfirmDialogVisible, setIsConfirmDialogVisible] = useState(false);
  const [isSendAlertDialogVisible, setIsSendDialogVisible] = useState(false);

  const showConfirmDialog = () => setIsConfirmDialogVisible(true);
  const hideConfirmDialog = () => setIsConfirmDialogVisible(false);
  const showSendAlertDialog = () => setIsSendDialogVisible(true);
  const hideSendAlertDialog = () => setIsSendDialogVisible(false);

  //if userIsVerified and has internet show send alert broadcast dialog
  useEffect(() => {
    if (userIsVerified && hasInternet) {
      showSendAlertDialog();
    } else {
      showConfirmDialog();
    }
  }, []);

  const {
    time: countdown,
    timerOn: countdownOn,
    start: startCountdown,
  } = useCountdown(3, false, () => handleStartSession());
  const { startTimer, resetTimer, timer } = useTimer();

  const {
    sendEmergencyAlertRequest,
    checkIfthereIsRecentAlert,
    loadingCheckAlert,
    loadingSendAlert,
  } = useSendEmergencyAlert();

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

  const handleNoSendEmergencyAlert = () => {
    hideSendAlertDialog();
    showConfirmDialog();
  };

  const handleYesSendEmergencyAlert = async () => {
    if (!userIsVerified) {
      ToastAndroid.show(
        "Failed to send emergency alert: your account is not verified",
        ToastAndroid.LONG
      );
      hideSendAlertDialog();
      showConfirmDialog();
      return;
    }

    if (
      locationLoading ||
      !userLocation?.latitude ||
      !userLocation?.longitude
    ) {
      return;
    }

    const thereIsRecentAlert10MinsAgo = await checkIfthereIsRecentAlert();
    if (thereIsRecentAlert10MinsAgo === false) {
      sendEmergencyAlertRequest(userLocation.latitude, userLocation.longitude);
    }

    hideSendAlertDialog();
    showConfirmDialog();
  };

  const handleStartCpr = async () => {
    hideConfirmDialog();
    startCountdown();
  };

  const handleEndCpr = useCallback(() => {
    handleStopSession();
    navigation.navigate("HomeScreen");
  }, []);

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
          title={"Would you like to start?"}
          containerStyle={styles.dialog}
          removePortal
        />
      )}
      {isSendAlertDialogVisible && userIsVerified && (
        <ConfirmationDialog
          isVisible={isSendAlertDialogVisible}
          cancelLabel="No"
          confirmationLabel="Yes"
          onPressCancel={handleNoSendEmergencyAlert}
          loading={locationLoading && loadingSendAlert && loadingCheckAlert}
          onPressConfirmation={handleYesSendEmergencyAlert}
          title={"Would you like to send emergency alert broadcast?"}
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
    width: 400,
    marginHorizontal: "auto",
  },
});
