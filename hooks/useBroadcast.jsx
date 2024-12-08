import { useEffect, useState } from "react";

import { supabase } from "../utils/supabase/config";
import { ToastAndroid } from "react-native";

export default function useBroadcast() {
  const [emergencyAlerts, setEmergencyAlerts] = useState([]);
  const [loading, setLoading] = useState(false);
  const emergencyAlertsLength = emergencyAlerts.length;
  let pollingInterval;

  const fetchAlerts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.from("BROADCAST").select(`
        *,
        bystander: user_id (first_name, last_name)
      `);

      if (error) {
        ToastAndroid.show(
          `Error fetching alerts: ${error.message}`,
          ToastAndroid.SHORT
        );
      }
      if (data) {
        setEmergencyAlerts(data);
      }
    } catch (error) {
      ToastAndroid.show(
        `Error fetching alerts: ${error.message}`,
        ToastAndroid.SHORT
      );
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

    //refetch every 20 seconds
    pollingInterval = setInterval(() => {
      fetchAlerts();
    }, 20000);

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
    const channels = supabase
      .channel("broadcast-all-channel")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "broadcast" },
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
