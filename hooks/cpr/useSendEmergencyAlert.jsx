import { ToastAndroid } from "react-native";

import { supabase } from "../../utils/supabase/config";
import useBoundStore from "../../zustand/useBoundStore";

export default function useSendEmergencyAlert() {
  const userId = useBoundStore((state) => state.userMetaData['bystanderId']);

  const sendEmergencyAlertRequest = async (userLatitude, userLongitude) => {

    if (!userLatitude || !userLongitude) {
      ToastAndroid.show(
        "Failed to send emergency alert: unable to get location",
        ToastAndroid.LONG
      );
      return;
    }

    try {

      //* ADDRESS, BARANGAY, AND LANDMARK SHOULD BE DYNAMIC
      const { error, status } = await supabase.from("BROADCAST").insert({
        user_id: userId,
        latitude: userLatitude,
        longitude: userLongitude,
        address: "test address",
        barangay: "test barangay",
        landmark: "test landmark"
      });

      if (error) {
        ToastAndroid.show(`Error sending emergency alert: ${error.message}`);
      }
      if (status === 400) {
        ToastAndroid.show("Error 400: Unable to send emergency alert");
      }
      if (status === 201) {
        ToastAndroid.show(
          "Emergency alert sent successfully",
          ToastAndroid.LONG
        );
      }
    } catch (error) {
      ToastAndroid.show(`Error sending emergency alert: ${error.message}`);
    }
  };

  return { sendEmergencyAlertRequest };
}
