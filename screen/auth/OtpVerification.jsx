import { StyleSheet, ScrollView, View } from "react-native";
import { useTheme, Text } from "react-native-paper";
import { useEffect, useState } from "react";
import { OtpInput } from "react-native-otp-entry";

import FormHeader from "../../components/common/FormHeader";
import PrimaryButton from "../../components/ui/PrimaryButton";
import useCountdown from "../../hooks/useCountdown";
import { useNavigation } from "@react-navigation/native";

const OtpVerification = () => {
  const theme = useTheme();
  const navigation = useNavigation();

  const [isFilled, setIsFilled] = useState(false);
  const [otp, setOtp] = useState(0);
  const { time } = useCountdown(30);

  /*
   * listen to otp Field changes
   * if all otp fields are filled then remove the disabled state of verify button
   */
  useEffect(() => {
    if (otp.length == 4) {
      setIsFilled(true);
    } else {
      setIsFilled(false);
    }
  }, [otp]);

  const handleSubmit = () => {
    if (isFilled) {
      //TODO: diri ang fetching

      const otpVerified = true; //* if success ang verification
      if (otpVerified) {
        navigation.navigate("ResetPassword");
      }
    }
  };

  return (
    <ScrollView
      style={[
        styles.container,
        {
          paddingVertical: theme.padding.body.vertical,
          paddingHorizontal: theme.padding.body.horizontal,
        },
      ]}
    >
      <View style={{ rowGap: theme.gap.lg }}>
        <FormHeader
          title="Enter Your OTP"
          titleSize="large"
          desc="We have sent the verification code to your email address."
        />

        <OtpInput
          numberOfDigits={4}
          focusColor={theme.colors.primary}
          focusStickBlinkingDuration={500}
          onTextChange={setOtp}
          textInputProps={{
            accessibilityLabel: "One-Time Password",
          }}
          theme={{
            containerStyle: styles.otpInputContainer,
            pinCodeContainerStyle: {
              ...styles.otpInputPinCodeContainer,
              backgroundColor: theme.colors.secondary,
            },
          }}
        />

        <ResendCountdown theme={theme} time={time} />

        <PrimaryButton
          label="Verify"
          onPress={handleSubmit}
          disabled={!isFilled}
          style={[styles.button, { borderRadius: theme.borderRadius.base }]}
        />
      </View>
    </ScrollView>
  );
};

const ResendCountdown = ({ time, theme }) => {
  if (time === 0) {
    return (
      <Text
        variant="labelLarge"
        style={{
          color: theme.colors.primary,
          textAlign: "center",
          marginVertical: 10,
        }}
      >
        Sent
      </Text>
    );
  }

  return (
    <Text
      variant="labelMedium"
      style={{ textAlign: "center", marginVertical: 10 }}
    >
      Resend Code in{" "}
      <Text variant="labelLarge" style={{ color: theme.colors.primary }}>
        {time}
      </Text>{" "}
      Sec
    </Text>
  );
};

export default OtpVerification;

const styles = StyleSheet.create({
  container: {
    paddingBottom: 70,
  },
  otpInputContainer: {
    justifyContent: "center",
    columnGap: 18,
  },
  otpInputPinCodeContainer: {
    height: 60,
    width: 64,
  },
  button: {
    marginTop: 20,
  },
});
