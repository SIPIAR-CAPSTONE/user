import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import { View } from "react-native";
import { ActivityIndicator } from "react-native-paper";

const CprInitialScreen = ({ navigation }) => {
  //redict to cpr
  useFocusEffect(
    useCallback(() => {
      navigation.navigate("Cpr");
    }, [navigation])
  );

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" />
    </View>
  );
};

export default CprInitialScreen;
