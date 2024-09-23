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
      {
        type: "exactLength",
        length: 11,
        message: "Phone should contain 11 numbers.",
      },
    ],
  },
];

const StepOneContent = ({ goNextStep }) => {
  const theme = useTheme();
  const styles = useMemo(() => makeStyles(theme), [theme]);
  const verificationForm = useBoundStore((state) => state.verificationForm);
  const setVerificationForm = useBoundStore(
    (state) => state.setVerificationForm
  );
  const [errors, setErrors] = useState({});

  const userData = useBoundStore((state) => state.userMetaData)

  //! provide default value for verification form
  const toFormat = new Date(userData['birthday']);
  const [userInfo, setUserInfo] = useState({
    firstName: userData["firstName"],
    middleName: userData["middleName"],
    lastName: userData["lastName"],
    suffix: userData["suffix"],
    birthday: toFormat,
    phone: userData["phone"]
  });

  const handleFieldChange = (key, newValue) => {
    setVerificationForm(key, newValue)
    setUserInfo((prevUserInfo) => {
      return {
        ...prevUserInfo,
        [key]: newValue,
      };
    });
  };

  /**
   * Function to validate the form
   *
   * @return {boolean} true if there are no errors, false otherwise
   *
   */
  const validateForm = () => {
    const errors = {}

    if (!userInfo.firstName)
      errors.firstName = 'First Name is required.'
    if (!userInfo.middleName)
      errors.middleName = 'Middle Name is required.'
    if (!userInfo.lastName) errors.lastName = 'Last Name is required.'
    if (!userInfo.birthday) errors.birthday = 'Birthday is required.'
    if (!userInfo.phone) errors.phone = 'Phone is required.'
    if (userInfo.phone.length !== 11)
      errors.phone = 'Phone should have 11 numbers.'

    setErrors(errors)

    // return true if there is no error
    // false if error length is greater than zero
    return Object.keys(errors).length === 0
  }

  /*
   *
   *  Handle submission to proceed next step
   *
   */
  const handleSubmit = () => {
    if (isFormValid(fields, verificationForm, setErrors)) {
       //! add default value for verification form if no changes in fields
       for(let x in userInfo){
        setVerificationForm(x, userInfo[x])
      }

      //if form is valid go to next step screen
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
        date={verificationForm.birthday}
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
