import { useEffect, useState } from "react";

import { supabase } from "../utils/supabase/config";
import { ToastAndroid } from "react-native";
import { useIsFocused } from "@react-navigation/native";

export default function useBroadcast() {
  const isFocused = useIsFocused();
  const [emergencyAlerts, setEmergencyAlerts] = useState([]);
  const [loading, setLoading] = useState(false);
  const emergencyAlertsLength = emergencyAlerts.length;
  let pollingInterval;

  const fetchAlerts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("BROADCAST")
        .select(
          `
        *,
        USER: user_id (first_name, last_name)
      `
        )
        .neq("status", "Completed");
        
      if (error) {
        if (!error.message === "TypeError: Network request failed") {
          ToastAndroid.show(
            `Error fetching alerts: ${error?.message}`,
            ToastAndroid.SHORT
          );
        }
      }

      if (data) {
        setEmergencyAlerts(data);
      }
    } catch (error) {
      if (!error.message === "TypeError: Network request failed") {
        ToastAndroid.show(
          `Error fetching alerts: ${error?.message}`,
          ToastAndroid.SHORT
        );
      }
    } finally {
      setLoading(false);
    }
  };

  /*
   *
   * Get initial broadcast data in first load
   *
   */
  useEffect(() => {
    fetchAlerts();

    //refetch every 10 seconds
    pollingInterval = setInterval(() => {
      fetchAlerts();
    }, 10000);

    return () => {
      clearInterval(pollingInterval);
    };
  }, []);

  /*
   *
   * Observe the broadcast table for changes then refetch
   *
   */
  useEffect(() => {
    if (!isFocused) return;

    const channels = supabase
      .channel("broadcast-all-channel")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "BROADCAST" },
        async () => {
          fetchAlerts();
        }
      )
      .subscribe();

    return () => {
      channels.unsubscribe();
    };
  }, []);

  return {
    emergencyAlerts,
    emergencyAlertsLength,
    refecthAlerts: fetchAlerts,
    loading,
  };
}
