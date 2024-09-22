import { View, StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";
import { useMemo, useState } from "react";

import { TextFormField, BirthdayFormField } from '../../ui/FormField'
import PrimaryButton from '../../ui/PrimaryButton'
import FormHeader from '../../common/FormHeader'
import useBoundStore from '../../../zustand/useBoundStore'

const StepOneContent = ({ goNextStep }) => {
  const theme = useTheme();
  const styles = useMemo(() => makeStyles(theme), [theme]);
  const setVerificationForm = useBoundStore(
    (state) => state.setVerificationForm,
  )
  const [errors, setErrors] = useState({})

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
    //validateForm will return true if there is no error
    const isFormValid = validateForm()

    if (isFormValid) {
      //! add default value for verification form if no changes in fields
      for(let x in userInfo){
        setVerificationForm(x, userInfo[x])
      }
      //if form is valid go to next step screen
      goNextStep()
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <FormHeader
          title="Confirm if your information is correct"
          desc="Only provide information that is true and correct."
        />
        <TextFormField
          label="First Name"
          value={userInfo.firstName}
          onChangeText={(value) => handleFieldChange('firstName', value)}
          error={errors.firstName}
        />
        <TextFormField
          label="Middle Name"
          value={userInfo.middleName}
          onChangeText={(value) => handleFieldChange('middleName', value)}
          error={errors.middleName}
        />
        <TextFormField
          label="Last Name"
          value={userInfo.lastName}
          onChangeText={(value) => handleFieldChange('lastName', value)}
          error={errors.lastName}
        />
        <TextFormField
          label="Suffix"
          value={userInfo.suffix}
          onChangeText={(value) => handleFieldChange('suffix', value)}
          error={errors.suffix}
        />
        <BirthdayFormField
          label="Birthday"
          date={userInfo.birthday}
          setDate={handleFieldChange}
          error={errors.birthday}
        />
        <TextFormField
          label="Phone Number"
          inputMode="tel"
          value={userInfo.phone}
          onChangeText={(value) => handleFieldChange('phone', value)}
          error={errors.phone}
        />

        <PrimaryButton
          label="Next"
          onPress={handleSubmit}
          style={styles.nextButton}
        />
      </View>
    </View>
  )
}

export default StepOneContent

const makeStyles = ({ gap, borderRadius }) =>
  StyleSheet.create({
    container: {
      paddingBottom: 70,
    },
    form: {
      rowGap: gap.lg,
    },
    nextButton: {
      marginVertical: 20,
      borderRadius: borderRadius.base,
    },
  });
