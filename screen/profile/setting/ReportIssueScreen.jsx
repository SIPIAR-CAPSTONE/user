import React, { useState } from "react";
import FormHeader from "../../../components/common/FormHeader";
import { createStyleSheet, useStyles } from "../../../hooks/useStyles";
import SelectItem from "../../../components/ui/SelectItem";
import TextInput from "../../../components/ui/TextInput";
import Button from "../../../components/ui/Button";
import { isFormValid } from "../../../utils/formValidation";
import AppBar from "../../../components/ui/AppBar";
import CircularIcon from "../../../components/ui/CircularIcon";
import { useNavigation } from "@react-navigation/native";
import Layout from "../../../components/common/Layout";
import ReportImageFrame from "../../../components/profile/settings/ReportImageFrame";
import { supabase } from "../../../utils/supabase/config";
import useBoundStore from "../../../zustand/useBoundStore";
import { decode } from "base64-arraybuffer";
import ConfirmationDialog from "../../../components/ui/ConfirmationDialog";
import { ToastAndroid } from "react-native";

const fields = [
  {
    name: "issueType",
    rules: [{ type: "required", message: "Issue Type is required." }],
  },
  {
    name: "issueDesc",
    rules: [{ type: "required", message: "Issue Description is required." }],
  },
  {
    name: "reportImage",
    rules: [],
  },
];

const ReportIssueScreen = () => {
  const navigation = useNavigation();
  const { styles } = useStyles(stylesheet);
  const [reportForm, setReportForm] = useState({
    issueType: "",
    issueDesc: "",
    email: "",
  });
  const [reportImage, setReportImage] = useState(null);

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [isConfirmationDialogVisible, setIsConfirmationDialogVisible] =
    useState(false);

  const showConfirmationDialog = () => {
    if (isFormValid(fields, { ...reportForm, reportImage }, setErrors)) {
      setIsConfirmationDialogVisible(true);
    }
  };
  const hideConfirmationDialog = () => setIsConfirmationDialogVisible(false);

  const handleFormChange = (key, value) => {
    setReportForm((prevReportForm) => ({ ...prevReportForm, [key]: value }));
  };

  const base64ImageFormat = useBoundStore((state) => state.base64ImageFormat);

  const handleSubmit = async () => {
    try {
      setLoading(true);

      // Insert the bug report data
      const { data, error: insertError } = await supabase
        .from("bug_report")
        .insert([
          {
            issue_type: reportForm.issueType,
            issue_description: reportForm.issueDesc,
          },
        ])
        .select();

      if (insertError) {
        ToastAndroid.show(`${insertError.message}`, ToastAndroid.SHORT);
        setLoading(false);
        return;
      }

      const newBugId = data[0]?.bug_id;

      if (!newBugId) {
        ToastAndroid.show(
          "Bug ID is undefined. Cannot upload the image.",
          ToastAndroid.SHORT
        );
        setLoading(false);
        return;
      }

      // Upload the image
      const { error: imageUploadError } = await supabase.storage
        .from("bug_report")
        .upload(`${newBugId}`, decode(base64ImageFormat), {
          contentType: "image/*",
        });

      if (imageUploadError) {
        ToastAndroid.show(
          `Image upload error: ${imageUploadError.message}`,
          ToastAndroid.SHORT
        );
      }
    } catch (error) {
      ToastAndroid.show(
        `Error during image upload: ${error.message}`,
        ToastAndroid.SHORT
      );
    } finally {
      setLoading(false);
      navigation.goBack();
    }
  };

  customAppBar = () => (
    <AppBar>
      <CircularIcon name="arrow-back" onPress={() => navigation.goBack()} />
    </AppBar>
  );

  return (
    <Layout
      AppbarComponent={customAppBar}
      contentContainerStyle={styles.form}
      addNoInternetAlert
      scrollable
    >
      <FormHeader
        title="Report an Issue"
        desc="If you're experiencing any issues with the platform, please fill out the form below, and our support team will assist you as soon as possible."
      />
      <SelectItem
        label="Issue Type"
        value={reportForm.issueType}
        data={ISSUE_TYPES}
        onChange={(value) => handleFormChange("issueType", value)}
        error={errors.issueType}
        variant="outlined"
        disabled={loading}
      />
      <TextInput
        label="Issue Description"
        value={reportForm.issueDesc}
        onChangeText={(value) => handleFormChange("issueDesc", value)}
        error={errors.issueDesc}
        variant="outlined"
        style={[styles.issueDesc, errors.issueDesc && styles.inputError]}
        multiline
        textAlignVertical="top"
        disabled={loading}
      />
      <ReportImageFrame
        label="Image of the issue"
        image={reportImage}
        setImage={setReportImage}
        onPress={() => bugReportCapture(setReportImage)}
        error={errors.reportImage}
        isLoading={loading}
      />

      <Button
        label="Submit"
        onPress={showConfirmationDialog}
        marginVertical={20}
        isLoading={loading}
      />
      <ConfirmationDialog
        title="Are you sure you want to submit this report?"
        isVisible={isConfirmationDialogVisible}
        onPressConfirmation={handleSubmit}
        onPressCancel={hideConfirmationDialog}
        loading={loading}
      />
    </Layout>
  );
};

export default ReportIssueScreen;

const stylesheet = createStyleSheet((theme) => ({
  form: {
    paddingHorizontal: theme.spacing.base,
    rowGap: theme.spacing.base,
  },
  issueDesc: {
    backgroundColor: theme.colors.background,
    borderWidth: 1,
    borderColor: "#e1e2e3",
    borderRadius: theme.borderRadius.sm,
    height: 200,
    padding: 14,
  },
  inputError: {
    borderWidth: 1.5,
    color: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
}));

const ISSUE_TYPES = [
  { label: "Hands-On CPR Issue", value: "Hands-On CPR Issue" },
  { label: "Training Module Problem", value: "Training Module Problem" },
  {
    label: "Performance Issue (Slow/Unresponsive)",
    value: "Performance Issue",
  },
  { label: "Others", value: "Others" },
];
