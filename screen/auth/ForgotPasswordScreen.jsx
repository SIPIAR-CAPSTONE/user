import { StyleSheet, ScrollView, View } from "react-native";
import { useTheme } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";

import FormHeader from "../../components/common/FormHeader";
import { TextFormField } from "../../components/ui/FormField";
import PrimaryButton from "../../components/ui/PrimaryButton";
import StatusBar from "../../components/common/StatusBar";
// import { supabase } from '../../utils/supabase/config'
import useSendToken from '../../hooks/useSendToken'
import useStore from "../../zustand/useStore"

const ForgotPasswordScreen = () => {
  const theme = useTheme()
  const navigation = useNavigation()
  const [email, setEmail] = useState('')
  const { errors, setErrors, process } = useSendToken(email, true)

  const setResetEmail = useStore((state) => state.setPasswordResetEmail)

  /*
   *
   * Form Validation
   *
   */
  const validateForm = () => {
    let errors = {}

    // Validate email field if it is empty
    if (!email) {
      errors.email = 'Email is required.'
    }

    //check if email has @ and .com
    if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Invalid Email'
    }

    // Set the errors and update form validity if it is empty
    setErrors(errors)

    // return true if there is no error
    // false if error length is greater than zero
    return Object.keys(errors).length === 0
  }

  /*
   *
   *  Handle submission for forgot password
   *
   */
  const handleSubmit = async () => {
    // add email as a global prop
    setResetEmail(email)

    //validateForm will return true if there is no error
    const isFormValid = validateForm()

    if (isFormValid) {
      process()
      // //if form is valid send password recovery code
      // const { error } = await supabase.auth.signInWithOtp({
      //   email: email,
      // })

      // if (error) {
      //   let errors = {}
      //   errors.email = error
      //   setErrors(errors)
      // } else if (!error) {
      //   //then navigate to otp verification
      //   navigation.navigate('TokenVerification')
      // }
    }
  }

  return (
    <ScrollView
      style={[
        styles.container,
        {
          paddingHorizontal: theme.padding.body.horizontal,
        },
      ]}
    >
      <View style={{ rowGap: theme.gap.lg }}>
        <FormHeader
          title="Forgot Password"
          titleSize="large"
          desc="Please provide your email address."
        />
        <TextFormField
          label="Email Address"
          value={email}
          inputMode="email"
          onChangeText={setEmail}
          error={errors.email}
        />

        <PrimaryButton
          label="Send Token"
          onPress={handleSubmit}
          style={[styles.button, { borderRadius: theme.borderRadius.base }]}
        />
      </View>

      <StatusBar />
    </ScrollView>
  )
}

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
  container: {
    paddingBottom: 70,
  },
  button: {
    marginTop: 20,
  },
})
