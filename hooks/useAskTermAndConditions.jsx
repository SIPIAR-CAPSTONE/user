import { useEffect, useState } from "react";
import { getItem } from "../utils/LocalStorage";
import { useNavigation } from "@react-navigation/native";

export default function useAskTermAndConditions() {
  const navigation = useNavigation();
  const [isTACAccepted, setIsTACAccepted] = useState(false);

  useEffect(() => {
    const askTermAndConditions = async () => {
      const isAccepted = await getItem("termAndConditions");
      
      if (isAccepted === "false") {
        setIsTACAccepted(false);
        navigation.navigate("TermsAndConditions");
      } else {
        setIsTACAccepted(true);
      }
    };

    askTermAndConditions();
  }, []);

  return { isTACAccepted };
}
