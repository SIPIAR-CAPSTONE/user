import { View, Text } from "react-native";
import React from "react";
import { Button, useTheme } from "react-native-paper";

const StepTwoContent = ({ goNextStep, backPrevStep }) => {
  const theme = useTheme();

  return (
    <View style={{}}>
      <Text>StepTwoContent</Text>
      <View style={{ flexDirection: "row", columnGap: theme.gap.sm }}>
        <Button
          mode="outlined"
          onPress={backPrevStep}
          contentStyle={{ padding: theme.padding.button.base }}
          labelStyle={{ fontSize: theme.fontSize.base }}
          style={{
            flex: 1,
            borderRadius: theme.borderRadius.base,
            borderColor: theme.colors.primary,
            borderWidth: 2,
          }}
        >
          Prev
        </Button>
        <Button
          mode="contained"
          onPress={goNextStep}
          contentStyle={{ padding: theme.padding.button.base }}
          labelStyle={{ fontSize: theme.fontSize.base }}
          style={{ flex: 1, borderRadius: theme.borderRadius.base }}
        >
          Next
        </Button>
      </View>
    </View>
  );
};

export default StepTwoContent;
