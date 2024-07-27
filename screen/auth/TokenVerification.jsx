import { StyleSheet, ScrollView, View } from "react-native";
import { useTheme, Text } from "react-native-paper";
import { useEffect, useState, useRef, useMemo } from "react";

import { TextFormField } from "../../components/ui/FormField";
import FormHeader from "../../components/common/FormHeader";
import PrimaryButton from "../../components/ui/PrimaryButton";
import useCountdown from "../../hooks/useCountdown";
import { useNavigation } from "@react-navigation/native";
import { supabase } from "../../utils/supabase/config";
import useSendToken from "../../hooks/useSendToken";
import useBoundStore from "../../zustand/useBoundStore";

const TokenVerification = () => {
  const theme = useTheme();
  const styles = useMemo(() => makeStyles(theme), [theme]);
  const navigation = useNavigation();
  const [isFilled, setIsFilled] = useState(false);
  const { time, pause } = useCountdown(70); //* it should be 70 constant, this is for interval in supabase
  const [tokenHash, setTokenHash] = useState("");
  const [serverError, setServerError] = useState("");
  const passwordResetEmail = useBoundStore((state) => state.passwordResetEmail);
  const { process } = useSendToken(passwordResetEmail, false);
  const hasCalledProcess = useRef(true);

  /*
   * if the countdown sets to 0, call the process for sending the token again
   * 0 is rendered twice, so it needs a useRef hook to determine if it's already performed
   */
  if (time === 0 && hasCalledProcess.current) {
    process();
    hasCalledProcess.current = false;
  }

  /*
   * listen to token Field changes
   * if inputted token is equals or greater than 56, then remove the disabled state of verify button
   */
  useEffect(() => {
    if (tokenHash.length >= 56) {
      setIsFilled(true);
    } else {
      setIsFilled(false);
    }
  }, [tokenHash]);

  const handleSubmit = async () => {
    if (isFilled) {
      //* verify provied token
      const { data, error } = await supabase.auth.verifyOtp({
        token_hash: tokenHash,
        type: "email",
      });

      if (error) {
        setServerError(error);
      } else if (!error) {
        navigation.navigate("ResetPassword");
        pause(); //* call the pause function to stop the countdown
      }
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.form}>
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

        <Text style={styles.serverErrorMessage}>{serverError}</Text>

        {time === 0 ? (
          <Text variant="labelLarge" style={styles.resentMessage}>
            Resent, please wait a while.
          </Text>
        ) : (
          <ResendCountdown time={time} styles={styles} />
        )}

        <PrimaryButton
          label="Verify"
          onPress={handleSubmit}
          disabled={!isFilled}
          style={styles.button}
        />
      </View>
    </ScrollView>
  );
};

const ResendCountdown = ({ time, styles }) => {
  return (
    <Text variant="labelMedium" style={styles.timerContainer}>
      Resend Token in{" "}
      <Text variant="labelLarge" style={styles.time}>
        {time}
      </Text>{" "}
      Sec
    </Text>
  );
};

export default TokenVerification;

const makeStyles = ({ padding, gap, colors, borderRadius }) =>
  StyleSheet.create({
    container: {
      paddingBottom: 70,
      paddingHorizontal: padding.body.horizontal,
    },
    form: {
      rowGap: gap.lg,
    },
    serverErrorMessage: {
      color: colors.primary,
    },
    resentMessage: {
      color: colors.primary,
      textAlign: "center",
    },
    button: {
      marginTop: 20,
      borderRadius: borderRadius.base,
    },
    timerContainer: {
      textAlign: "center",
    },
    time: {
      color: colors.primary,
    },
  });
