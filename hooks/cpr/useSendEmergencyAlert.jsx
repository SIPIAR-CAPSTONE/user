import moment from "moment";
import { ToastAndroid } from "react-native";

import { supabase } from "../../utils/supabase/config";
import useBoundStore from "../../zustand/useBoundStore";

export default function useSendEmergencyAlert() {
  const session = useBoundStore((state) => state.session);
  const userId = session?.user?.id;

  const sendEmergencyAlertRequest = async (userLatitude, userLongitude) => {
    const currentDate = moment();

    if (!userLatitude || !userLongitude) {
      ToastAndroid.show(
        "Failed to send emergency alert: unable to get location",
        ToastAndroid.LONG
      );
      return;
    }

    try {
      const { error, status } = await supabase.from("broadcast").insert({
        user_id: userId,
        latitude: userLatitude,
        longitude: userLongitude,
        address: "test address",
        barangay: "test barangay",
        landmark: "test landmark",
        isActive: "Yes",
        created_at: currentDate,
      });

      if (error) {
        ToastAndroid.show(`Error sending emergency alert: ${error.message}`);
      }
      if (status === 400) {
        ToastAndroid.show("400 Error: Unable to send emergency alert");
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
