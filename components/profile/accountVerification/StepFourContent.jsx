import { useMemo, useState } from 'react'
import { View, StyleSheet, Alert } from 'react-native'
import * as ImagePicker from 'expo-image-picker'

import ImageFrame from './StepFourComponents/ImageFrame'
import { useTheme, Divider } from 'react-native-paper'
import PrimaryButton from '../../ui/PrimaryButton'
import useBoundStore from '../../../zustand/useBoundStore'
import { useNavigation } from '@react-navigation/native'
import useImagePicker from '../../../hooks/useImagePicker'
import { supabase } from '../../../utils/supabase/config'
import { decode } from 'base64-arraybuffer'

const StepFourContent = () => {
  const theme = useTheme()
  const styles = useMemo(() => makeStyles(theme), [theme])
  const navigation = useNavigation()

  const verificationForm = useBoundStore((state) => state.verificationForm)
  const [frontIdImage, setFrontIdImage] = useState(null)
  const [backIdImage, setBackIdImage] = useState(null)
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const userMetaData = useBoundStore((state) => state.userMetaData)

  const {
    verificationIdCapturerOne,
    verificationIdCapturerTwo,
  } = useImagePicker()

  //! logger
  console.log('VERIFICATION FORMDATA:', verificationForm)
  //!access base 64 formatted image
  const verificationIdOneBase64 = useBoundStore(
    (state) => state.verificationIdOneBase64,
  )

  const verificationIdTwoBase64 = useBoundStore(
    (state) => state.verificationIdTwoBase64,
  )

  /*
   *
   * Form Validation
   *
   */
  const validateForm = () => {
    const errors = {}

    if (!frontIdImage) errors.frontIdImage = 'Front side ID image is required.'
    if (!backIdImage) errors.backIdImage = 'Back side ID image is required.'

    setErrors(errors)

    // return true if there is no error
    // false if error length is greater than zero
    return Object.keys(errors).length === 0
  }

  /*
   *
   *  Handle submission for signup
   *
   */
  const handleSubmit = async () => {
    //validateForm will return true if there is no error
    const isFormValid = validateForm()

    if (isFormValid) {
      setLoading(true)

      try {
        // Insert data into Supabase
        const { error: insertError } = await supabase
          .from('verification_request')
          .insert({
            first_name: verificationForm['firstName'],
            middle_name: verificationForm['middleName'],
            last_name: verificationForm['lastName'],
            suffix: verificationForm['suffix'],
            birthday: verificationForm['birthday'],
            phone: verificationForm['phone'],
            barangay: verificationForm['barangay'],
            street: verificationForm['street'],
            house_number: verificationForm['houseNumber'],
            identification_type: verificationForm['selectedIdType'],
          });
      
        // Check for insert error
        if (insertError) {
          console.log('Insert Error:', insertError);
          return;
        }
      
        const files = [
          { fileName: 'verification_id_front', base64: verificationIdOneBase64 },
          { fileName: 'verification_id_back', base64: verificationIdTwoBase64 },
        ];
      
        // Upload each file
        for (const file of files) {
          const { error: uploadError } = await supabase.storage
            .from('bystander')
            .upload(
              `verification_request/${userMetaData['email']}/${file.fileName}`,
              decode(file.base64),
              {
                contentType: 'image/*',
                upsert: true,
              }
            );
      
          // Check for upload error
          if (uploadError) {
            console.log('Image Upload Error:', uploadError);
            return;
          }
        }
      
        // Success: Navigate to confirmation screen
        console.log('Success: Verification request submitted');
        navigation.navigate('SuccessConfirmation', {
          title: 'Verification Request Submitted',
          desc:
            'You successfully submitted account verification request. Please just wait until your account is verified. Thank you.',
          nextScreen: 'ProfileScreen',
        });
      
      } catch (error) {
        // Catch unexpected errors
        console.log('Unexpected Error:', error);
      }
      

      setLoading(false)
    }
  }

  return (
    <View style={styles.container}>
      <ImageFrame
        label="ID FRONT SIDE"
        image={frontIdImage}
        onPress={() => verificationIdCapturerOne(setFrontIdImage)}
        error={errors.frontIdImage}
        disabled={loading}
      />
      <Divider style={styles.divider} />
      <ImageFrame
        label="ID BACK SIDE"
        image={backIdImage}
        onPress={() => verificationIdCapturerTwo(setBackIdImage)}
        error={errors.backIdImage}
        disabled={loading}
      />

      <PrimaryButton
        label="Submit"
        onPress={handleSubmit}
        style={styles.submitButton}
        disabled={loading}
      />
    </View>
  )
}

export default StepFourContent

const makeStyles = ({ borderRadius, padding }) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      paddingVertical: 24,
      paddingHorizontal: padding.body.horizontal,
    },
    divider: {
      marginVertical: 26,
      backgroundColor: 'gray',
    },
    submitButton: {
      marginVertical: 40,
      borderRadius: borderRadius.base,
    },
  })
