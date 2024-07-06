import { StyleSheet, View, Image } from "react-native";
import { useRef } from "react";
import { AntDesign } from "@expo/vector-icons";

import { Portal, Appbar, useTheme, Text } from "react-native-paper";
import CircularIcon from "../../ui/CircularIcon";
import PrimaryButton from "../../../components/ui/PrimaryButton";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";

const SelectIdModal = ({ onClose, onConfirmed, idTitle, idImageSource }) => {
  const theme = useTheme();
  const bottomSheetRef = useRef(null);

  //all instructions in the bottomSheet
  const renderInstructions = InstructionData.map((instruction) => (
    <View key={instruction.id} style={styles.instructionContainer}>
      <View
        style={[
          styles.circularNumber,
          {
            backgroundColor: theme.colors.primary,
            borderRadius: theme.borderRadius.full,
          },
        ]}
      >
        <Text
          style={{ color: theme.colors.onPrimary, fontSize: theme.fontSize.xs }}
        >
          {instruction.number}
        </Text>
      </View>
      <Text variant="bodyMedium" style={{ flex: 1 }}>
        {instruction.desc}
      </Text>
    </View>
  ));

  return (
    <Portal>
      <Appbar.Header
        style={[
          styles.customHeader,
          { backgroundColor: theme.colors.background },
        ]}
      >
        <CircularIcon name="arrow-back" pressable onPress={onClose} />
        <Text
          style={{
            fontWeight: "bold",
            fontSize: theme.fontSize.lg,
            color: theme.colors.typography.primary,
          }}
        >
          Select ID
        </Text>

        {/* invisible element, just to make the Select ID title center */}
        <View style={{ width: 10 }} />
      </Appbar.Header>

      <View style={styles.body}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: idImageSource }}
            style={[
              styles.idSampleImage,
              { borderRadius: theme.borderRadius.lg },
            ]}
          />
        </View>

        <BottomSheet ref={bottomSheetRef} snapPoints={[380]}>
          <BottomSheetView style={styles.contentContainer}>
            <View style={styles.titleContainer}>
              <AntDesign name="idcard" size={33} color={theme.colors.primary} />
              <Text style={styles.title} variant="titleLarge">
                {idTitle}
              </Text>
            </View>
            <Text
              variant="bodyMedium"
              style={{ color: theme.colors.typography.secondary }}
            >
              Make sure to follow these tips!
            </Text>

            <View style={styles.instructionsContainer}>
              {renderInstructions}
            </View>

            <PrimaryButton
              label="Confirm"
              onPress={onConfirmed}
              style={[styles.button, { borderRadius: theme.borderRadius.base }]}
            />
          </BottomSheetView>
        </BottomSheet>
      </View>
    </Portal>
  );
};

export default SelectIdModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  customHeader: {
    height: 56,
    paddingHorizontal: 16,
    textAlign: "center",
    justifyContent: "space-between",
  },
  body: {
    flex: 1,
    backgroundColor: "rgba(1,1,1,0.5)",
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 14,
  },
  titleContainer: {
    flexDirection: "row",
    columnGap: 10,
    alignItems: "center",
    marginBottom: 2,
  },
  title: {
    fontWeight: "bold",
  },
  imageContainer: {
    height: "50%",
    alignItems: "center",
    justifyContent: "center",
  },
  idSampleImage: {
    width: "88%",
    height: 220,
  },
  instructionsContainer: {
    rowGap: 10,
    marginTop: 20,
    marginBottom: 30,
  },
  instructionContainer: {
    flexDirection: "row",
    columnGap: 10,
    alignItems: "center",
  },
  circularNumber: {
    height: 22,
    width: 22,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 2,
  },
});

const InstructionData = [
  {
    id: 0,
    number: 1,
    desc: "Clear and readable ang mga nakasulat sa ID",
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
    desc: "Complete and correct lahat ng personal information na nasa ID",
  },
];
