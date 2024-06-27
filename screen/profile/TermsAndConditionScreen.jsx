import { ScrollView } from "react-native";
import { useTheme } from "react-native-paper";
import {
  Title,
  H1,
  H2,
  P,
  OL,
  Strong,
  Time,
} from "../../components/terms and policy/Typography";

const TermsAndConditionScreen = () => {
  const theme = useTheme();

  return (
    <ScrollView
      contentContainerStyle={{
        paddingVertical: theme.padding.body.vertical,
        paddingHorizontal: theme.padding.body.horizontal,
      }}
    >
      <Title>SIPIAR Terms and Conditions</Title>

      <H1>1. Acceptance of Terms</H1>
      <P>
        By downloading, installing, or using the App, you agree to be bound by
        these Terms and our Privacy Policy. If you do not agree to these Terms,
        please do not use the App.
      </P>

      <H1>2. Use of the App</H1>
      <P>
        <H2>2.1. License: </H2>
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

      <H1>3. Content</H1>
      <P>
        <H2>3.1 User Content: </H2>
        You are solely responsible for any content you upload, transmit, or
        share through the App. You grant us a perpetual, worldwide, royalty-free
        license to use, modify, reproduce, and distribute your content for the
        purpose of operating and improving the App.
      </P>

      <P>
        <H2>3.2. Third-Party Content: </H2>
        The App may contain links to third-party websites or services. We do not
        endorse or control these third-party sites and are not responsible for
        their content or practices.
      </P>

      <H1>4. Intellectual Property</H1>
      <P>
        The App and its content, including but not limited to text, graphics,
        logos, and images, are protected by copyright, trademark, and other
        intellectual property laws. You may not use, modify, or distribute any
        of the App's content without our prior written consent.
      </P>

      <H1>5. Disclaimers</H1>
      <P>
        <H2>5.1. No Medical Advice: </H2>
        The information provided in the App is for educational purposes only and
        should not be considered medical advice. Always consult a qualified
        healthcare professional for medical guidance and treatment.
      </P>

      <P>
        <H2>5.2. Accuracy of Information: </H2>
        We strive to provide accurate and up-to-date information in the App but
        make no representations or warranties of any kind regarding the
        accuracy, completeness, or reliability of the content.
      </P>

      <H1>6. Limitation of Liability</H1>
      <P>
        To the extent permitted by law, we shall not be liable for any direct,
        indirect, incidental, special, or consequential damages arising out of
        or in any way connected with your use of the App.
      </P>

      <H1>7. Indemnification</H1>
      <P>
        You agree to indemnify and hold us harmless from any claims, damages,
        liabilities, costs, or expenses (including attorney fees) arising out of
        your use of the App or violation of these Terms.
      </P>

      <H1>8. Changes to Terms</H1>
      <P>
        We reserve the right to update or modify these Terms at any time without
        prior notice. Your continued use of the App after any changes
        constitutes acceptance of the revised Terms.
      </P>

      <H1>9. Governing Law</H1>
      <P>
        These Terms shall be governed by and construed in accordance with the
        laws of Regional Trial Courts, without regard to its conflict of law
        provisions.
      </P>

      <H1>10. Contact Us</H1>
      <P>
        If you have any questions or concerns about these Terms, please contact
        us at <Strong>sipiar@gmail.com</Strong>.
      </P>

      <P>
        By using the App, you acknowledge that you have read, understood, and
        agree to be bound by these Terms and our Privacy Policy.
      </P>

      <Time style={{ marginTop: 50 }}>Last updated: May 15, 2024</Time>
    </ScrollView>
  );
};

export default TermsAndConditionScreen;
