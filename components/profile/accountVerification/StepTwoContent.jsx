import { useState, useEffect } from "react";

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
    (state) => state.setVerificationForm,
  )
  const userData = useBoundStore((state) => state.userMetaData)
  const [errors, setErrors] = useState({})

  //! provide default value for verification form
  const [userInfo, setUserInfo] = useState({
    barangay: userData['barangay'],
    street: userData['street'],
    houseNumber: userData['houseNumber'],
  })

  const handleFieldChange = (key, newValue) => {
    setVerificationForm(key, newValue)
    setUserInfo((prevUserInfo) => {
      return {
        ...prevUserInfo,
        [key]: newValue,
      }
    })
  }

  const handleSubmit = () => {
    if (isFormValid(fields, verificationForm, setErrors)) {
           //! add default value for verification form if no changes in fields
           for (let x in userInfo) {
            setVerificationForm(x, userInfo[x])
          }

      //if form is valid go to next step screen
      goNextStep()
    }
  }

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
