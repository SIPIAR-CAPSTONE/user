import { StyleSheet, View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { useRef } from "react";
import { AntDesign } from "@expo/vector-icons";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";

import PrimaryButton from "../../../components/ui/PrimaryButton";

const SelectAnIdScreen = () => {
  const theme = useTheme();
  const bottomSheetRef = useRef < BottomSheet > null;

  const renderInstructions = InstructionData.map((instruction) => (
    <View style={styles.instructionContainer}>
      <Text>{instruction.number}</Text>
      <Text>{instruction.desc}</Text>
    </View>
  ));

  return (
    <View>
      <Text>selectAnId</Text>

      <BottomSheet ref={bottomSheetRef}>
        <BottomSheetView style={styles.contentContainer}>
          <View>
            <AntDesign name="idcard" size={33} color={theme.colors.primary} />
            <Text>National ID</Text>
          </View>
          <Text>Make sure to follow these tips!</Text>

          <View style={styles.instructionsContainer}>{renderInstructions}</View>
        </BottomSheetView>

        {/* Close Button */}
        <PrimaryButton
          label="Confirm"
          onPress={() => {}}
          style={[styles.button, { borderRadius: theme.borderRadius.base }]}
        />
      </BottomSheet>
    </View>
  );
};

export default SelectAnIdScreen;

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
  instructionsContainer: {
    rowGap: 10,
    marginVertical: 10,
  },
  instructionContainer: {
    flexDirection: "row",
    columnGap: 10,
  },
  button: {
    marginVertical: 20,
  },
});

const InstructionData = [
  {
    id: 0,
    number: 1,
    desc: "Clear and readable ang mga nakasulat sa ID (Full Name, Birthdate, and Address)",
  },
  {
    id: 1,
    number: 2,
    desc: "Make sure na match ang ID photo sa selfie mo",
  },
  {
    id: 2,
    number: 3,
    desc: "Take a photo of your real ID, at hindi photocopy",
  },
  {
    id: 3,
    number: 4,
    desc: "Complete and correct lahat ng personal information na nasa ID (tingnan sa sample sa itaas)",
  },
];
