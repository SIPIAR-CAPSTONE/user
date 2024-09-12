import { StyleSheet, View, Image } from "react-native";
import { useRef } from "react";
import { AntDesign } from "@expo/vector-icons";

import { Portal, Appbar, useTheme, Text } from "react-native-paper";
import CircularIcon from "../../../ui/CircularIcon";
import Button from "../../../ui/Button";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";

/**
 * Select ID Modal component for account verification step 3.
 * @param {Function} props.onClose - Function to close the modal.
 * @param {Function} props.onConfirmed - Function to confirm the selected ID.
 * @param {string} props.idTitle - Title of the selected ID. e.g. "Driver's License", "Passport", etc. This will be displayed as the title of the selected ID.
 * @param {string} props.idImageSource - Image source of the selected ID.
 */
const SelectIdModal = ({ onClose, onConfirmed, idTitle, idImageSource }) => {
  const theme = useTheme();
  const bottomSheetRef = useRef(null);

  //Render the instructions in the bottom sheet
  const renderInstructions = INSTRUCTION_DATA.map((instruction) => (
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

        {/* the parent use justify between that is why i have this invisible 
        element to center the "Select ID" title */}
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

        <BottomSheet
          ref={bottomSheetRef}
          snapPoints={[380]}
          handleStyle={{
            backgroundColor: theme.colors.elevation.level3,
            borderTopEndRadius: 14,
            borderTopStartRadius: 14,
          }}
        >
          <BottomSheetView
            style={[
              styles.contentContainer,
              { backgroundColor: theme.colors.elevation.level3 },
            ]}
          >
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

            <Button label="Confirm" onPress={onConfirmed} />
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
    width: 310,
    maxWidth: "88%",
    height: 190,
    maxHeight: "54%",
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
