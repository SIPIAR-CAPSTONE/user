import { StyleSheet, ScrollView, View } from 'react-native'
import { useTheme, Text } from 'react-native-paper'
import { useEffect, useState } from 'react'
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
  const { time } = useCountdown(30)
  const [tokenHash, setTokenHash] = useState('')
  const [serverError, setServerError] = useState('')

  const resetEmail = useStore((state) => state.email)
  const { process } = useSendToken(resetEmail, false)
  const hasCalledProcess = useRef(false)

  console.log('main compo', time)

  useEffect(() => {
    if (time === 0 && !hasCalledProcess.current) {
      console.log('nagtawag')
      process()
      hasCalledProcess.current = true
    }
  }, [time, process])

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
      const { error } = await supabase.auth.verifyOtp({
        token_hash: tokenHash,
        type: 'email',
      })

      if (error) {
        setServerError(error)
      } else if (!error) {
        navigation.navigate('ResetPassword')
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
              marginVertical: 10,
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
  console.log('reset countdown', time)
  return (
    <Text
      variant="labelMedium"
      style={{ textAlign: 'center', marginVertical: 10 }}
    >
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
