import { useState } from "react";
import useBoundStore from "../../../zustand/useBoundStore";

import Button from "../../ui/Button";
import cdoBarangayData from "../../../utils/cdoBarangayData";
import FormHeader from "../../common/FormHeader";
import TextInput from "../../ui/TextInput";
import SelectItem from "../../ui/SelectItem";
import Form from "../../common/Form";
import { useTheme } from "react-native-paper";
import { isFormValid } from "../../../utils/formValidation";

const fields = [
  { name: "barangay", rules: [{ type: "required" }] },
  { name: "street", rules: [{ type: "required" }] },
];

const StepTwoContent = ({ goNextStep }) => {
  const theme = useTheme();
  const signupForm = useBoundStore((state) => state.signupForm);
  const setSignupForm = useBoundStore((state) => state.setSignupForm);
  const [errors, setErrors] = useState({});

  const handleSubmit = () => {
    if (isFormValid(fields, signupForm, setErrors)) {
      //if form is valid go to next step screen
      goNextStep();
    }
  };

  return (
    <Form>
      <FormHeader
        title="Please provide your current address"
        desc="Only provide information that is true and correct."
      />
      <SelectItem
        placeholder="Barangay"
        data={cdoBarangayData}
        value={signupForm.barangay}
        onChange={(value) => setSignupForm("barangay", value)}
        error={errors.barangay}
      />
      <TextInput
        placeholder="Street"
        value={signupForm.street}
        onChangeText={(value) => setSignupForm("street", value)}
        error={errors.street}
      />
      <TextInput
        placeholder="House Number"
        value={signupForm.houseNumber}
        onChangeText={(value) => setSignupForm("houseNumber", value)}
        error={errors.houseNumber}
      />

      <Button
        label="Next"
        marginVertical={theme.spacing.xxl}
        onPress={handleSubmit}
      />
    </Form>
  );
};

export default StepTwoContent;
