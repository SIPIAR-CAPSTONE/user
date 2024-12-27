import { Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import {
  Title,
  H1,
  H2,
  P,
  OL,
  Strong,
  Time,
} from "../../../components/termsAndPolicy/Typography";
import Layout from "../../../components/common/Layout";
import AppBar from "../../../components/ui/AppBar";
import CircularIcon from "../../../components/ui/CircularIcon";
import { createStyleSheet, useStyles } from "../../../hooks/useStyles";
import Button from "../../../components/ui/Button";
import AppBarTitle from "../../../components/ui/AppBarTitle";
import usePreventBack from "../../../hooks/usePreventBack";
import useFirstTimePopup from "../../../hooks/useFirstTimePopup";

const TermsAndConditionScreen = () => {
  const navigation = useNavigation();
  const { styles } = useStyles(stylesheet);
  const { done, markAsDone } = useFirstTimePopup({
    key: "TermAndConditions",
  });
  usePreventBack();

  const handleAcceptTAC = () => {
    markAsDone();
    navigation.navigate("HomeScreen");
  };

  const CustomAppBar = () => (
    <AppBar>
      {done && (
        <CircularIcon name="arrow-back" onPress={() => navigation.goBack()} />
      )}
      <AppBarTitle>Terms and Conditions</AppBarTitle>
      <View style={{ width: 40 }} />
    </AppBar>
  );

  return (
    <Layout
      scrollable
      contentContainerStyle={styles.container}
      AppbarComponent={CustomAppBar}
    >
      <Title>SIPIAR Terms and Conditions</Title>

      <H1>1. Real-Time Location Monitoring</H1>
      <P>
        <Text style={styles.highlight}>
          To ensure the effectiveness of emergency response,{" "}
          <Strong>
            the SIPIAR app collects real-time location data from active
            bystander users.
          </Strong>
          This data allows administrators to monitor available bystanders near
          incidents. By using the App, you consent to the collection, use, and
          storage of your real-time location data for these purposes.
        </Text>
      </P>
      <P>
        <Strong>Data Usage:</Strong> Your location data is solely used for
        monitoring and optimizing emergency response. It will not be shared with
        unauthorized third parties.
      </P>

      <H1>2. Purpose of the App</H1>
      <P>
        The SIPIAR app is designed to assist in providing first aid during
        emergencies, such as cardiac arrests. However, the App alone does not
        guarantee the saving of lives without the help of professional
        responders. It is intended to supplement, not replace, professional
        medical intervention.
      </P>

      <H1>3. Acceptance of Terms</H1>
      <P>
        By downloading, installing, or using the App, you agree to be bound by
        these Terms and our Privacy Policy. If you do not agree to these Terms,
        please do not use the App.
      </P>

      <H1>4. Use of the App</H1>
      <P>
        <H2>4.1. License: </H2>
        Subject to these Terms, we grant you a limited, non-exclusive,
        non-transferable, revocable license to use the App for your personal,
        non-commercial use.
      </P>
      <OL>Use the App for any illegal or unauthorized purpose.</OL>
      <OL>Interfere with or disrupt the operation of the App or servers.</OL>
      <OL>Reverse engineer, decompile, or disassemble the App.</OL>
      <OL>
        Use the App in any manner that could harm, damage, or impair its
        functionality.
      </OL>
      <OL>
        You shall not make prank or false emergency calls using the App. Pranks
        to emergency services can divert vital resources away from genuine
        emergencies and may result in serious consequences, including legal
        action.
      </OL>

      <H1>5. Content</H1>
      <P>
        <H2>5.1 User Content: </H2>
        You are solely responsible for any content you upload, transmit, or
        share through the App. You grant us a perpetual, worldwide, royalty-free
        license to use, modify, reproduce, and distribute your content for the
        purpose of operating and improving the App.
      </P>

      <P>
        <H2>5.2. Third-Party Content: </H2>
        The App may contain links to third-party websites or services. We do not
        endorse or control these third-party sites and are not responsible for
        their content or practices.
      </P>

      <H1>6. Disclaimers</H1>
      <P>
        <H2>6.1. No Medical Advice: </H2>
        The information provided in the App is for educational purposes only and
        should not be considered medical advice. Always consult a qualified
        healthcare professional for medical guidance and treatment.
      </P>

      <P>
        <H2>6.2. Accuracy of Information: </H2>
        We strive to provide accurate and up-to-date information in the App but
        make no representations or warranties of any kind regarding the
        accuracy, completeness, or reliability of the content.
      </P>

      <H1>7. Limitation of Liability</H1>
      <P>
        To the extent permitted by law, we shall not be liable for any direct,
        indirect, incidental, special, or consequential damages arising out of
        or in any way connected with your use of the App.
      </P>

      <H1>8. Indemnification</H1>
      <P>
        You agree to indemnify and hold us harmless from any claims, damages,
        liabilities, costs, or expenses (including attorney fees) arising out of
        your use of the App or violation of these Terms.
      </P>

      <H1>9. Changes to Terms</H1>
      <P>
        We reserve the right to update or modify these Terms at any time without
        prior notice. Your continued use of the App after any changes
        constitutes acceptance of the revised Terms.
      </P>

      <H1>10. Contact Us</H1>
      <P>
        If you have any questions or concerns about these Terms, please contact
        us at <Strong>cdo.sipiar@gmail.com</Strong>.
      </P>

      <P>
        By using the App, you acknowledge that you have read, understood, and
        agree to be bound by these Terms and our Privacy Policy.
      </P>

      <Time style={{ marginVertical: 20 }}>
        Last updated: December 26, 2024
      </Time>

      {!done && (
        <View style={styles.buttonsContainer}>
          <Button label="Accept" onPress={handleAcceptTAC} />
          <Button
            variant="outlined"
            label="Decline"
            onPress={() => navigation.goBack()}
          />
        </View>
      )}
    </Layout>
  );
};

export default TermsAndConditionScreen;

const stylesheet = createStyleSheet((theme) => ({
  container: {
    paddingVertical: 30,
  },
  buttonsContainer: {
    rowGap: theme.spacing.sm,
    marginTop: theme.spacing.xxxl,
  },
  highlight: {
    backgroundColor: "yellow",
  },
}));
