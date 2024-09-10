import { View, Image, StyleSheet } from "react-native";
import { useRef } from "react";
import { AntDesign } from "@expo/vector-icons";

import { Portal, Appbar, Text } from "react-native-paper";
import CircularIcon from "../../ui/CircularIcon";
import PrimaryButton from "../../../components/ui/PrimaryButton";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { useStyles, createStyleSheet } from "../../../hooks/useStyles";

const SelectIdModal = ({ onClose, onConfirmed, idTitle, idImageSource }) => {
  const { styles } = useStyles(stylesheet);
  const bottomSheetRef = useRef(null);

  //all instructions in the bottomSheet
  const renderInstructions = InstructionData.map((instruction) => (
    <View key={instruction.id} style={styles.instructionContainer}>
      <View style={styles.circularNumber}>
        <Text style={styles.number}>{instruction.number}</Text>
      </View>
      <Text variant="bodyMedium" style={{ flex: 1 }}>
        {instruction.desc}
      </Text>
    </View>
  ));

  return (
    <Portal>
      <Appbar.Header style={styles.customHeader}>
        <CircularIcon name="arrow-back" pressable onPress={onClose} />
        <Text style={styles.headerLabel}>Select ID</Text>

        {/* invisible element, just to make the Select ID title center */}
        <View style={{ width: 10 }} />
      </Appbar.Header>

      <View style={styles.body}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: idImageSource }} style={styles.idSampleImage} />
        </View>

        <BottomSheet ref={bottomSheetRef} snapPoints={["55%"]}>
          <BottomSheetView style={styles.contentContainer}>
            <View style={styles.titleContainer}>
              <AntDesign name="idcard" size={33} color={theme.colors.primary} />
              <Text style={styles.title} variant="titleLarge">
                {idTitle}
              </Text>
            </View>
            <Text variant="bodyMedium" style={styles.desc}>
              Make sure to follow these tips!
            </Text>

            <View style={styles.instructionsContainer}>
              {renderInstructions}
            </View>

            <PrimaryButton
              label="Confirm"
              onPress={onConfirmed}
              style={styles.confirmButton}
            />
          </BottomSheetView>
        </BottomSheet>
      </View>
    </Portal>
  );
};

export default SelectIdModal;

const stylesheet = createStyleSheet((theme) =>
  StyleSheet.create({
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
      backgroundColor: theme.colors.background,
    },
    headerLabel: {
      fontWeight: "bold",
      fontSize: theme.fontSize.lg,
      color: theme.colors.typography.primary,
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
    desc: {
      color: theme.colors.typography.secondary,
    },
    imageContainer: {
      height: "50%",
      alignItems: "center",
      justifyContent: "center",
    },
    idSampleImage: {
      width: 310,
      height: 190,
      borderRadius: theme.borderRadius.lg,
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
      backgroundColor: theme.colors.primary,
      borderRadius: theme.borderRadius.full,
    },
    number: {
      color: theme.colors.onPrimary,
      fontSize: theme.fontSize.xs,
    },
    confirmButton: {
      borderRadius: theme.borderRadius.base,
    },
  })
);

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
