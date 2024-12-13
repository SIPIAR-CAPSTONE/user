import { useState } from "react";
import { ToastAndroid, View } from "react-native";

import ImageFrame from "./ImageFrame";
import { Divider } from "react-native-paper";
import Button from "../../ui/Button";
import useBoundStore from "../../../zustand/useBoundStore";
import { useNavigation } from "@react-navigation/native";
import useImagePicker from "../../../hooks/useImagePicker";
import { supabase } from "../../../utils/supabase/config";
import { decode } from "base64-arraybuffer";
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
  const userMetaData = useBoundStore((state) => state.userMetaData);

  const { verificationIdCapturerOne, verificationIdCapturerTwo } =
    useImagePicker();

  //! logger

  //!access base 64 formatted image
  const verificationIdOneBase64 = useBoundStore(
    (state) => state.verificationIdOneBase64
  );

  const verificationIdTwoBase64 = useBoundStore(
    (state) => state.verificationIdTwoBase64
  );

  const handleSubmit = async () => {
    if (isFormValid(fields, { frontIdImage, backIdImage }, setErrors)) {
      try {
        setLoading(true);

        // Update bystander data in USER table
        const { error: updateError } = await supabase
          .from("USER")
          .update({
            first_name: verificationForm["firstName"],
            middle_name: verificationForm["middleName"],
            last_name: verificationForm["lastName"],
            suffix: verificationForm["suffix"],
            birth_date: verificationForm["birthday"],
            phone_number: verificationForm["phone"],
            barangay: verificationForm["barangay"],
            street: verificationForm["street"],
            house_number: verificationForm["houseNumber"],
            email: verificationForm["email"],
          })
          .eq("user_id", userMetaData["bystanderId"]);

        // Check for update error
        if (updateError) {
          console.log("Update user Error:", updateError);
          return;
        }

        // Insert into VERIFICATION REQUEST table
        const { error: insertError } = await supabase
          .from("VERIFICATION REQUEST")
          .insert({
            user_id: userMetaData["bystanderId"],
            identification_type: verificationForm["selectedIdType"],
          });

        // Check for insert error
        if (insertError) {
          console.log("Insert request Error:", insertError);
          return;
        }

        const files = [
          {
            fileName: "verification_id_front",
            base64: verificationIdOneBase64,
          },
          { fileName: "verification_id_back", base64: verificationIdTwoBase64 },
        ];

        // Upload each file
        for (const file of files) {
          const { error: uploadError } = await supabase.storage
            .from("bystander")
            .upload(
              `verification_request/${userMetaData["email"]}/${file.fileName}`,
              decode(file.base64),
              {
                contentType: "image/*",
                upsert: true,
              }
            );

          // Check for upload error
          if (uploadError) {
            console.log("Image Upload Error:", uploadError);
            return;
          }
        }
        setShowSuccessAlert(true);
      } catch (error) {
        ToastAndroid.show(
          `Error submitting verification request: ${error.message}`
        );
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <View style={styles.container}>
      <ImageFrame
        label="ID FRONT SIDE"
        image={frontIdImage}
        onPress={() => verificationIdCapturerOne(setFrontIdImage)}
        error={errors.frontIdImage}
        isLoading={loading}
      />
      <Divider style={styles.divider} />
      <ImageFrame
        label="ID BACK SIDE"
        image={backIdImage}
        onPress={() => verificationIdCapturerTwo(setBackIdImage)}
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

const stylesheet = createStyleSheet((theme) => ({
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
}));
