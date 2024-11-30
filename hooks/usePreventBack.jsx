import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import { BackHandler } from "react-native";

export default function usePreventBack() {
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        // Return true to disable the default back button behavior
        return true;
      };

      BackHandler.addEventListener("hardwareBackPress", onBackPress);

      return () =>
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    }, [])
  );

  return {};
}
