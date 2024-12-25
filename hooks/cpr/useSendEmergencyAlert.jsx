import { ToastAndroid } from "react-native";
import moment from "moment";

import { supabase } from "../../utils/supabase/config";
import useBoundStore from "../../zustand/useBoundStore";
import { reverseGeocode } from "../../screen/learn/utils";
import { useState } from "react";

const MINIMUM_MINS_BEFORE_ALLOWED_TO_RESEND_ALERT = 10;

export default function useSendEmergencyAlert() {
  const [loading, setLoading] = useState({
    checkIfthereIsRecentAlert: false,
    sendEmergencyAlertRequest: false,
  });
  const userId = useBoundStore((state) => state.userMetaData["bystanderId"]);

  //create a function that check if there is a recent sent emergencyAlertRequest not more than 30 mins ago
  const checkIfthereIsRecentAlert = async () => {
    try {
      setLoading({
        checkIfthereIsRecentAlert: true,
      });

      const { data, error } = await supabase
        .from("BROADCAST")
        .select("date, user_id")
        .eq("user_id", userId)
        .order("date", { ascending: false })
        .limit(1);

      if (error) {
        if (!error.message === "TypeError: Network request failed") {
          ToastAndroid.show(
            `Error checking recent emergency alert request: ${error.message}`,
            ToastAndroid.LONG
          );
        }
      }
      if (data && data.length > 0) {
        console.log(data[0]);
        const recentDate = data[0].date;
        const recentDateDiff = moment().diff(recentDate, "minutes");
        if (recentDateDiff < MINIMUM_MINS_BEFORE_ALLOWED_TO_RESEND_ALERT) {
          ToastAndroid.show(
            `You have already sent an emergency alert in the last ${MINIMUM_MINS_BEFORE_ALLOWED_TO_RESEND_ALERT} minutes`,
            ToastAndroid.LONG
          );
          return true;
        }
      }
      return false;
    } finally {
      setLoading({
        checkIfthereIsRecentAlert: false,
      });
    }
  };

  const sendEmergencyAlertRequest = async (userLatitude, userLongitude) => {
    if (!userLatitude || !userLongitude) {
      ToastAndroid.show(
        "Failed to send emergency alert: unable to get location",
        ToastAndroid.LONG
      );
      return;
    }

    try {
      setLoading({
        sendEmergencyAlertRequest: true,
      });
      const address = await reverseGeocode({
        latitude: userLatitude,
        longitude: userLongitude,
      });

      //* ADDRESS, BARANGAY, AND LANDMARK SHOULD BE DYNAMIC
      const currentDate = moment();

      const { error, status } = await supabase.from("BROADCAST").insert({
        user_id: userId,
        latitude: userLatitude,
        longitude: userLongitude,
        address: address[0]?.formattedAddress ?? "",
        barangay: "",
        landmark: "",
        date: currentDate,
      });

      if (error) {
        if (!error.message === "TypeError: Network request failed") {
          ToastAndroid.show(`Error sending emergency alert: ${error.message}`);
        }
      }
      if (status === 201) {
        ToastAndroid.show(
          "Emergency alert sent successfully",
          ToastAndroid.LONG
        );
      }
    } catch (error) {
      if (!error.message === "TypeError: Network request failed") {
        ToastAndroid.show(`Error sending emergency alert: ${error.message}`);
      }
    } finally {
      setLoading({
        sendEmergencyAlertRequest: false,
      });
    }
  };

  return {
    sendEmergencyAlertRequest,
    checkIfthereIsRecentAlert,
    loadingCheckAlert: loading.checkIfthereIsRecentAlert,
    loadingSendAlert: loading.sendEmergencyAlertRequest,
  };
}
