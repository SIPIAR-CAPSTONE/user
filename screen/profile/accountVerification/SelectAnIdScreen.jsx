import { Image, StyleSheet, View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { useRef } from "react";
import { AntDesign } from "@expo/vector-icons";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";

import PrimaryButton from "../../../components/ui/PrimaryButton";
import useBoundStore from "../../../zustand/useBoundStore";

const FALLBACK_ID_IMG =
  "https://community.softr.io/uploads/db9110/original/2X/7/74e6e7e382d0ff5d7773ca9a87e6f6f8817a68a6.jpeg";

const SelectAnIdScreen = ({ navigation, route }) => {
  const theme = useTheme();
  const bottomSheetRef = useRef(null);

  const goVerificationNextStep = useBoundStore(
    (state) => state.goVerificationNextStep
  );
  const setVerificationForm = useBoundStore(
    (state) => state.setVerificationForm
  );

  const { idType } = route.params;
  //get the id data of the providedIdType
  const currentId = IdData.find((id) => id.type == idType);

  //handle null or falsy value so that it will display a placeholder when data doesnt exist
  const imageSource = currentId?.imageSource
    ? currentId?.imageSource
    : FALLBACK_ID_IMG;
  const idTitle = currentId?.title ? currentId?.title : "Valid ID";

  const handleOnSubmit = () => {
    setVerificationForm("selectedIdType", idTitle);
    navigation.goBack();
    goVerificationNextStep();
  };

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
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: imageSource }}
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

          <View style={styles.instructionsContainer}>{renderInstructions}</View>

          <PrimaryButton
            label="Confirm"
            onPress={handleOnSubmit}
            style={[styles.button, { borderRadius: theme.borderRadius.base }]}
          />
        </BottomSheetView>
      </BottomSheet>
    </View>
  );
};

export default SelectAnIdScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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

const IdData = [
  {
    id: 0,
    title: "National ID",
    type: "nationalId",
    imageSource:
      "https://marketplace.canva.com/EAFanujoFkY/2/0/1600w/canva-blue-modern-highschool-id-card-vjI1KIbwj8o.jpg",
  },
  {
    id: 1,
    title: "Student ID",
    type: "studentId",
    imageSource:
      "https://marketplace.canva.com/EAFXhyJiKhc/1/0/1600w/canva-white-and-red-modern-highschool-id-card-9QGif02vO4s.jpg",
  },
  {
    id: 2,
    title: "ePhil ID",
    type: "ePhilId",
    imageSource:
      "https://upload.wikimedia.org/wikipedia/commons/3/34/Philippine_Identification_System_%28PhilSys%29_card_sample.png",
  },
  {
    id: 3,
    title: "Passport",
    type: "passport",
    imageSource:
      "https://upload.wikimedia.org/wikipedia/commons/5/56/Specimen_Personal_Information_Page_South_Korean_Passport.jpg",
  },
];

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
