import { useNavigation } from '@react-navigation/native'
import { supabase } from '../utils/supabase/config'
import { useState } from 'react'
import { useEffect } from 'react'

const useSendToken = (email, isNavigate) => {
  const navigation = useNavigation()
  const [errors, setErrors] = useState({})
  const process = async () => {
    //if form is valid send password recovery code
    const { error } = await supabase.auth.signInWithOtp({
      email: email,
    })

    if (error) {
      let errors = {}
      errors.email = error.message
      setErrors(errors)
    } else if (!error) {
      if (isNavigate) {
        //then navigate to otp verification
        navigation.navigate('TokenVerification')
      }
    }
  }

  return { errors, setErrors, process }
}

export default useSendToken
