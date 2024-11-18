import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";

const CprInitialScreen = ({ navigation }) => {
  //redict to cpr
  useFocusEffect(
    useCallback(() => {
      navigation.navigate("Cpr");
    }, [navigation])
  );

  return;
};

export default CprInitialScreen;
