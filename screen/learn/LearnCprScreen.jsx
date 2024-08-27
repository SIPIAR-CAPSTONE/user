import { View, Text } from "react-native";
import React from "react";
import { Button } from "react-native-paper";

const LearnCprScreen = ({ navigation }) => {
  return (
    <View>
      <Text>LearnCprScreen</Text>
      <Button onPress={() => navigation.navigate("LearnCprScore")}>
        score
      </Button>
    </View>
  );
};

export default LearnCprScreen;
