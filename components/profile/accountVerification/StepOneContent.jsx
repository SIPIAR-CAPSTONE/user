import { useState } from "react";

import Button from "../../ui/Button";
import FormHeader from "../../common/FormHeader";
import useBoundStore from "../../../zustand/useBoundStore";
import TextInput from "../../ui/TextInput";
import BirthdatePicker from "../../ui/BirthdayPicker";
import Form from "../../common/Form";
import { isFormValid } from "../../../utils/formValidation";

const fields = [
  { name: "firstName", rules: [{ type: "required" }] },
  { name: "middleName", rules: [{ type: "required" }] },
  { name: "lastName", rules: [{ type: "required" }] },
  { name: "birthday", rules: [{ type: "required" }] },
  {
    name: "phone",
    rules: [
      { type: "required" },
      { type: "validPhNumber" },
      {
        type: "exactLength",
        length: 11,
        message: "Phone number should be exactly 11 digits long.",
      },
    ],
  },
];

const StepOneContent = ({ goNextStep }) => {
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
        title="Confirm if your information is correct"
        desc="Only provide information that is true and correct."
      />
      <TextInput
        placeholder="First Name"
        value={verificationForm.firstName}
        defaultValue={"12321"}
        onChangeText={(value) => setVerificationForm("firstName", value)}
        error={errors.firstName}
      />
      <TextInput
        placeholder="Middle Name"
        value={verificationForm.middleName}
        onChangeText={(value) => setVerificationForm("middleName", value)}
        error={errors.middleName}
      />
      <TextInput
        placeholder="Last Name"
        value={verificationForm.lastName}
        onChangeText={(value) => setVerificationForm("lastName", value)}
        error={errors.lastName}
      />
      <TextInput
        placeholder="Suffix"
        value={verificationForm.suffix}
        onChangeText={(value) => setVerificationForm("suffix", value)}
        error={errors.suffix}
      />
      <BirthdatePicker
        placeholder="Birthday"
        givenDate={verificationForm.birthday}
        setDate={setVerificationForm}
        error={errors.birthday}
      />
      <TextInput
        placeholder="Phone Number"
        inputMode="tel"
        value={verificationForm.phone}
        onChangeText={(value) => setVerificationForm("phone", value)}
        error={errors.phone}
      />

      <Button label="Next" marginVertical={20} onPress={handleSubmit} />
    </Form>
  );
};

export default StepOneContent;
