import { StyleSheet, ScrollView, View } from 'react-native'
import { useTheme, Text } from 'react-native-paper'
import { useEffect, useState, useRef } from 'react'
import { TextFormField } from '../../components/ui/FormField'
import FormHeader from '../../components/common/FormHeader'
import PrimaryButton from '../../components/ui/PrimaryButton'
import useCountdown from '../../hooks/useCountdown'
import { useNavigation } from '@react-navigation/native'
import { supabase } from '../../utils/supabase/config'
import useSendToken from '../../hooks/useSendToken'
import useStore from '../../zustand/useStore'

const TokenVerification = () => {
  const theme = useTheme()
  const navigation = useNavigation()
  const [isFilled, setIsFilled] = useState(false)
  const { time, pause } = useCountdown(70) //! it should be 70 constant, this is for interval in supabase
  const [tokenHash, setTokenHash] = useState('')
  const [serverError, setServerError] = useState('')
  const resetEmail = useStore((state) => state.email)
  const { process } = useSendToken(resetEmail, false)
  const hasCalledProcess = useRef(true)
  const setResetPasswordSession = useStore((state) => state.setResetPasswordSession)

  /*
   * if the countdown sets to 0, call the process for sending the token again
   * 0 is rendered twice, so it needs a useRef hook to determine if it's already performed
   */
  if (time === 0 && hasCalledProcess.current) {
    process()
    hasCalledProcess.current = false
  }

  /*
   * listen to token Field changes
   * if inputted token is equals or greater than 56, then remove the disabled state of verify button
   */
  useEffect(() => {
    if (tokenHash.length >= 56) {
      setIsFilled(true)
    } else {
      setIsFilled(false)
    }
  }, [tokenHash])

  const handleSubmit = async () => {
    if (isFilled) {
      //! verify provied token
      const { data, error } = await supabase.auth.verifyOtp({
        token_hash: tokenHash,
        type: 'email',
      })

      if (error) {
        setServerError(error)
      } else if (!error) {
        navigation.navigate('ResetPassword')
        pause() //! call the pause function to stop the countdown
        setResetPasswordSession(data['session']) //! set the session as global but not yet encrypted
      }
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
          title="Enter Your Token"
          titleSize="large"
          desc="We have sent the verification token to your email address."
        />

        <TextFormField
          label="Token Hash"
          value={tokenHash}
          onChangeText={setTokenHash}
        />

        <Text style={{ color: theme.colors.primary }}>{serverError}</Text>

        {time === 0 ? (
          <Text
            variant="labelLarge"
            style={{
              color: theme.colors.primary,
              textAlign: 'center',
            }}
          >
            Resent, please wait a while.
          </Text>
        ) : (
          <ResendCountdown theme={theme} time={time} />
        )}

        <PrimaryButton
          label="Verify"
          onPress={handleSubmit}
          disabled={!isFilled}
          style={[styles.button, { borderRadius: theme.borderRadius.base }]}
        />
      </View>
    </ScrollView>
  )
}

const ResendCountdown = ({ time, theme }) => {
  return (
    <Text variant="labelMedium" style={{ textAlign: 'center' }}>
      Resend Token in{' '}
      <Text variant="labelLarge" style={{ color: theme.colors.primary }}>
        {time}
      </Text>{' '}
      Sec
    </Text>
  )
}

export default TokenVerification

const styles = StyleSheet.create({
  container: {
    paddingBottom: 70,
  },
  button: {
    marginTop: 20,
  },
})
