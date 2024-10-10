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
    name: "email",
    rules: [{ type: "required", message: "Email is required." }],
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
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleFormChange = (key, value) => {
    setReportForm((prevReportForm) => ({ ...prevReportForm, [key]: value }));
  };

  const handleSubmit = async () => {
    if (isFormValid(fields, reportForm, setErrors)) {
      setLoading(true);
      //! sumbittion

      setLoading(false);
    }
  };

  customAppBar = () => (
    <AppBar>
      <CircularIcon
        name="arrow-back"
        pressable
        onPress={() => navigation.goBack()}
      />
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
      <TextInput
        label="Email Address"
        value={reportForm.email}
        onChangeText={(value) => handleFormChange("email", value)}
        error={errors.email}
        type="email"
        variant="outlined"
        disabled={loading}
      />

      <Button
        label="Submit"
        onPress={handleSubmit}
        marginVertical={20}
        isLoading={loading}
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
