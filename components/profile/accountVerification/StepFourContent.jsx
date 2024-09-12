import { useState } from "react";
import { StyleSheet, View } from "react-native";

import ImageFrame from "./StepFourComponents/ImageFrame";
import { Divider } from "react-native-paper";
import Button from "../../ui/Button";
import useBoundStore from "../../../zustand/useBoundStore";
import { useNavigation } from "@react-navigation/native";
import useImagePicker from "../../../hooks/useImagePicker";
import { useStyles, createStyleSheet } from "../../../hooks/useStyles";
import SuccessConfirmation from "../../common/SuccessConfirmation";
import { isFormValid } from "../../../utils/formValidation";

const fields = [
  {
    name: "frontIdImage",
    rules: [{ type: "required", message: "Front side ID image is required." }],
  },
  {
    name: "backIdImage",
    rules: [{ type: "required", message: "Back side ID image is required." }],
  },
];

const StepFourContent = () => {
  const { styles } = useStyles(stylesheet);
  const navigation = useNavigation();

  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const verificationForm = useBoundStore((state) => state.verificationForm);
  const [frontIdImage, setFrontIdImage] = useState(null);
  const [backIdImage, setBackIdImage] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const { takePicture } = useImagePicker();

  const handleSubmit = () => {
    if (isFormValid(fields, { frontIdImage, backIdImage }, setErrors)) {
      setLoading(true);

      setShowSuccessAlert(true);

      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <ImageFrame
        label="ID FRONT SIDE"
        image={frontIdImage}
        onPress={() => takePicture(setFrontIdImage)}
        error={errors.frontIdImage}
        isLoading={loading}
      />
      <Divider style={styles.divider} />
      <ImageFrame
        label="ID BACK SIDE"
        image={backIdImage}
        onPress={() => takePicture(setBackIdImage)}
        error={errors.backIdImage}
        isLoading={loading}
      />

      <Button
        label="Submit"
        onPress={handleSubmit}
        isLoading={loading}
        marginVertical={40}
      />

      <SuccessConfirmation
        open={showSuccessAlert}
        setOpen={setShowSuccessAlert}
        title="Verification Request Submitted"
        desc="You successfully submitted account verification request. Please just wait until your account is verified. Thank you."
        onDelayEnd={() => navigation.navigate("ProfileScreen")}
      />
    </View>
  );
};

export default StepFourContent;

const stylesheet = createStyleSheet((theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      paddingTop: 24,
      paddingHorizontal: theme.spacing.base,
    },
    divider: {
      marginVertical: 26,
      backgroundColor: "gray",
    },
  })
);
