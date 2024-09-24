import { useState } from "react";

import Button from "../../ui/Button";
import cdoBarangayData from "../../../utils/cdoBarangayData";
import FormHeader from "../../common/FormHeader";
import useBoundStore from "../../../zustand/useBoundStore";
import SelectItem from "../../ui/SelectItem";
import TextInput from "../../ui/TextInput";
import Form from "../../common/Form";
import { isFormValid } from "../../../utils/formValidation";

const fields = [
  { name: "barangay", rules: [{ type: "required" }] },
  { name: "street", rules: [{ type: "required" }] },
];

const StepTwoContent = ({ goNextStep }) => {
  const verificationForm = useBoundStore((state) => state.verificationForm);
  const setVerificationForm = useBoundStore(
    (state) => state.setVerificationForm
  );

  const [errors, setErrors] = useState({});


  const handleSubmit = () => {
    if (isFormValid(fields, verificationForm, setErrors)) {
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
        value={verificationForm.barangay}
        data={cdoBarangayData}
        onChange={(value) => setVerificationForm("barangay", value)}
        error={errors.barangay}
      />
      <TextInput
        placeholder="Street"
        value={verificationForm.street}
        onChangeText={(value) => setVerificationForm("street", value)}
        error={errors.street}
      />
      <TextInput
        placeholder="House Number"
        value={verificationForm.houseNumber}
        onChangeText={(value) => setVerificationForm("houseNumber", value)}
        error={errors.houseNumber}
      />

      <Button label="Next" onPress={handleSubmit} marginVertical={20} />
    </Form>
  );
};

export default StepTwoContent;
