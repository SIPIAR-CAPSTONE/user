import { useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";

import { supabase } from "../../utils/supabase/config";
import useBoundStore from "../../zustand/useBoundStore";

export default function useCheckVerification() {
  const isFocused = useIsFocused();
  const userMetaData = useBoundStore((state) => state.userMetaData);
  const userIsVerified = useBoundStore((state) => state.userIsVerified);
  const setAccountIsVerified = useBoundStore(
    (state) => state.setAccountIsVerified
  );

  const checkAccountIfVerified = async () => {
    const { data, error } = await supabase
      .from("BYSTANDER")
      .select()
      .eq("user_id", userMetaData["bystanderId"]);

    if (!error) {
      const isVerified = data[0]["is_verified"];
      console.log("is verified - id", isVerified);
      setAccountIsVerified(isVerified);
    }
  };

  useEffect(() => {
    if (!isFocused) return;

    checkAccountIfVerified();

    const channels = supabase
      .channel("bystander-veri-status-all-channel")
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "bystander" },
        (payload) => {
          console.log("Change received!", payload["new"]["isVerified"]);
          const isVeried = payload["new"]["isVerified"];

          setAccountIsVerified(isVeried);
        }
      )
      .subscribe();

    return () => {
      channels.unsubscribe();
    };
  }, [isFocused]);

  return { userIsVerified };
}
