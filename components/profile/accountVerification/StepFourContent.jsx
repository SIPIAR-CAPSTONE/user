import { useState } from "react";
import { StyleSheet, View } from "react-native";

import ImageFrame from "./StepFourComponents/ImageFrame";
import { Divider } from "react-native-paper";
import PrimaryButton from "../../ui/PrimaryButton";
import useBoundStore from "../../../zustand/useBoundStore";
import { useNavigation } from "@react-navigation/native";
import useImagePicker from "../../../hooks/useImagePicker";
import { useStyles, createStyleSheet } from "../../../hooks/useStyles";

const StepFourContent = () => {
  const { styles } = useStyles(stylesheet);
  const navigation = useNavigation();

  const verificationForm = useBoundStore((state) => state.verificationForm);
  const [frontIdImage, setFrontIdImage] = useState(null);
  const [backIdImage, setBackIdImage] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const { takePicture } = useImagePicker();

  /*
   *
   * Form Validation
   *
   */
  const validateForm = () => {
    const errors = {};

    if (!frontIdImage) errors.frontIdImage = "Front side ID image is required.";
    if (!backIdImage) errors.backIdImage = "Back side ID image is required.";

    setErrors(errors);

    // return true if there is no error
    // false if error length is greater than zero
    return Object.keys(errors).length === 0;
  };

  /*
   *
   *  Handle submission for signup
   *
   */
  const handleSubmit = () => {
    //validateForm will return true if there is no error
    const isFormValid = validateForm();

    if (isFormValid) {
      setLoading(true);

      //TODO: fetching
      navigation.navigate("SuccessConfirmation", {
        title: "Verification Request Submitted",
        desc: "You successfully submitted account verification request. Please just wait until your account is verified. Thank you.",
        nextScreen: "ProfileScreen",
      });
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
        disabled={loading}
      />
      <Divider style={styles.divider} />
      <ImageFrame
        label="ID BACK SIDE"
        image={backIdImage}
        onPress={() => takePicture(setBackIdImage)}
        error={errors.backIdImage}
        disabled={loading}
      />

      <PrimaryButton
        label="Submit"
        onPress={handleSubmit}
        style={styles.submitButton}
        disabled={loading}
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
      paddingVertical: 24,
      paddingHorizontal: theme.padding.body.horizontal,
    },
    divider: {
      marginVertical: 26,
      backgroundColor: "gray",
    },
    submitButton: {
      marginVertical: 40,
      borderRadius: theme.borderRadius.base,
    },
  })
);
