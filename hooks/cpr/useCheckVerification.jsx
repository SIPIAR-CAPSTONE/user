import { useEffect } from "react";

import { supabase } from "../../utils/supabase/config";
import useBoundStore from "../../zustand/useBoundStore";

export default function useCheckVerification() {
  const userMetaData = useBoundStore((state) => state.userMetaData);
  const userIsVerified = useBoundStore((state) => state.userIsVerified);
  const setAccountIsVerified = useBoundStore(
    (state) => state.setAccountIsVerified
  );

  const checkAccountIfVerified = async () => {
    const { data, error } = await supabase
      .from("bystander")
      .select()
      .eq("id", userMetaData["bystanderId"]);

    if (!error) {
      const isVerified = data[0]["isVerified"];
      setAccountIsVerified(isVerified);
    }
  };

  useEffect(() => {
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
  }, []);

  return { userIsVerified };
}
