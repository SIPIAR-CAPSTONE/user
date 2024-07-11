import { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";

import ImageFrame from "./StepFourComponents/ImageFrame";
import { useTheme, Divider } from "react-native-paper";
import PrimaryButton from "../../ui/PrimaryButton";
import useBoundStore from "../../../zustand/useBoundStore";
import { useNavigation } from "@react-navigation/native";
import useImagePicker from "../../../hooks/useImagePicker";

const StepFourContent = () => {
  const theme = useTheme();
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
    <View
      style={[
        styles.container,
        {
          paddingVertical: 24,
          paddingHorizontal: theme.padding.body.horizontal,
        },
      ]}
    >
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
        style={[styles.button, { borderRadius: theme.borderRadius.base }]}
        disabled={loading}
      />
    </View>
  );
};

export default StepFourContent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  divider: {
    marginVertical: 26,
    backgroundColor: "gray",
  },
  button: {
    marginVertical: 40,
  },
});
