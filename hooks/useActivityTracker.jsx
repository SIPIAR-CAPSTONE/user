import { useEffect } from "react";
import useBoundStore from "../zustand/useBoundStore";
import useLocation from "./useLocation";
import { supabase } from "../utils/supabase/config";
import moment from "moment";

export default function useActivityTracker() {
  const { userLocation, loading } = useLocation();
  const userId = useBoundStore((state) => state.userMetaData['bystanderId']);
  // console.log('SESSION VAL', session);
  // console.log('USER ID - TRACKER', userId);

  const updateActivity = async () => {
    if (!userId || loading || !userLocation) return;

    const { error } = await supabase.from("USER ACTIVITY").upsert({
      user_id: userId,
      last_active: moment(),
      status: "active",
      latitude: userLocation?.latitude,
      longitude: userLocation?.longitude,
      location_updated_at: moment(),
      role: "bystander",
    });

    if (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (!loading) {
      updateActivity();
    }

    const intervalId = setInterval(() => {
      if (!loading) {
        updateActivity();
      }
    }, 10000);

    return () => clearInterval(intervalId);
  }, [loading]);
}
