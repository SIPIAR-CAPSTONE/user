import { View, Image } from "react-native";
import { useRef } from "react";
import { AntDesign } from "@expo/vector-icons";
import { Portal, Appbar, Text } from "react-native-paper";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";

import CircularIcon from "../../ui/CircularIcon";
import Button from "../../ui/Button";
import { createStyleSheet, useStyles } from "../../../hooks/useStyles";
import AppBarTitle from "../../ui/AppBarTitle";

const SelectIdModal = ({ onClose, onConfirmed, idTitle, idImageSource }) => {
  const { styles, theme } = useStyles(stylesheet);
  const bottomSheetRef = useRef(null);

  //Render the instructions in the bottom sheet
  const renderInstructions = INSTRUCTION_DATA.map((instruction) => (
    <View key={instruction.id} style={styles.instructionContainer}>
      <View style={styles.circularNumber}>
        <Text style={styles.number}>{instruction.number}</Text>
      </View>
      <Text variant="bodyMedium" style={styles.desc}>
        {instruction.desc}
      </Text>
    </View>
  ));

  return (
    <Portal>
      <Appbar.Header style={styles.customHeader}>
        <CircularIcon name="arrow-back" onPress={onClose} />
        <AppBarTitle size="sm">Select ID</AppBarTitle>
        <View style={{ width: 10 }} />
      </Appbar.Header>

      <View style={styles.body}>
        <View style={styles.imageContainer}>
          <Image source={idImageSource} style={styles.idSampleImage} />
        </View>

        <BottomSheet
          ref={bottomSheetRef}
          snapPoints={[385]}
          handleStyle={styles.handleStyle}
        >
          <BottomSheetView style={styles.contentContainer}>
            <View style={styles.titleContainer}>
              <AntDesign name="idcard" size={33} color={theme.colors.primary} />
              <Text style={styles.title} variant="titleLarge">
                {idTitle}
              </Text>
            </View>
            <Text variant="bodyMedium" style={{ color: theme.colors.text2 }}>
              Make sure to follow these tips!
            </Text>

            <View style={styles.instructionsContainer}>
              {renderInstructions}
            </View>

            <Button label="Confirm" onPress={onConfirmed} />
          </BottomSheetView>
        </BottomSheet>
      </View>
    </Portal>
  );
};

export default SelectIdModal;

const stylesheet = createStyleSheet((theme) => ({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  customHeader: {
    height: 47,
    paddingHorizontal: 16,
    textAlign: "center",
    justifyContent: "space-between",
    backgroundColor: theme.colors.background,
  },
  body: {
    flex: 1,
    backgroundColor: "rgba(1,1,1,0.5)",
  },
  handleStyle: {
    backgroundColor: theme.colors.elevation.level3,
    borderTopEndRadius: 14,
    borderTopStartRadius: 14,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 14,
    backgroundColor: theme.colors.elevation.level3,
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
    flex: 1,
    fontSize: 13,
  },
  imageContainer: {
    height: "50%",
    alignItems: "center",
    justifyContent: "center",
  },
  idSampleImage: {
    width: 310,
    maxWidth: "88%",
    objectFit: "cover",
    height: 190,
    maxHeight: "50%",
    borderRadius: theme.borderRadius.lg,
  },
  instructionsContainer: {
    rowGap: theme.spacing.xs,
    marginTop: 20,
    marginBottom: 30,
  },
  instructionContainer: {
    flexDirection: "row",
    columnGap: theme.spacing.sm,
    alignItems: "center",
  },
  number: {
    color: theme.colors.onPrimary,
    fontSize: theme.fontSize.xs,
  },
  circularNumber: {
    height: 22,
    width: 22,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 2,
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.full,
  },
}));

const INSTRUCTION_DATA = [
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
