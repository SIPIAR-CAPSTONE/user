import { ScrollView } from "react-native";
import { useTheme } from "react-native-paper";

import StatusBar from "../../../components/common/StatusBar";
import {
  Title,
  H1,
  H2,
  P,
  Strong,
} from "../../../components/terms and policy/Typography";

const PrivacyAndPolicyScreen = () => {
  const theme = useTheme();

  return (
    <ScrollView
      contentContainerStyle={{
        paddingVertical: theme.padding.body.vertical,
        paddingHorizontal: theme.padding.body.horizontal,
      }}
    >
      <Title>SIPIAR Privacy Policy</Title>

      <P>
        This Privacy Policy describes how we collects, uses, and shares personal
        information when you use our CPR application the SIPIAR.
      </P>

      <H1>1. Information We Collect</H1>
      <P>
        <H2>1.1. Information You Provide:</H2> When you use the App, you may
        choose to provide us with certain personal information, such as your
        name, email address, contact details, and identification card.
      </P>
      <P>
        <H2>1.2. Usage Information:</H2> We may collect information about your
        use of the App, including the actions you take within the App, device
        information (such as device type, operating system), and log data (such
        as IP address, access times).
      </P>
      <P>
        <H2>1.3. Location Information:</H2> With your consent, we may collect
        location information from your device to provide location-based
        services, such as finding nearby CPR training centers.
      </P>

      <H1>2. How We Use Your Information</H1>
      <P>
        <H2>2.1. Provide and Improve the App:</H2> We use the information we
        collect to operate, maintain, and improve the functionality of the App,
        including providing CPR guidance and training.
      </P>
      <P>
        <H2>2.2. Communicate with You:</H2> We may use your contact information
        to send you important notifications, updates, and information about the
        App.
      </P>
      <P>
        <H2>2.3. Personalization:</H2> We may use your information to
        personalize your experience within the App, such as providing customized
        CPR training recommendations.
      </P>

      <H1>3. How We Share Your Information</H1>
      <P>
        <H2>3.1. Service Providers:</H2> We may share your information with
        third-party service providers who assist us in providing and maintaining
        the App, such as hosting services or analytics providers.
      </P>
      <P>
        <H2>3.2. Legal Compliance:</H2> We may disclose your information if
        required to do so by law or in response to a valid legal request, such
        as a court order or subpoena.
      </P>

      <H1>4. Your Choices</H1>
      <P>
        <H2>4.1. Access and Update:</H2> You may access and update your personal
        information by contacting us at sipiar@gmail.com.
      </P>
      <P>
        <H2>4.2. Location Services:</H2> You can control location tracking
        preferences through your device settings or within the App.
      </P>

      <H1>5. Data Security</H1>
      <P>
        We take reasonable measures to protect the security of your personal
        information and prevent unauthorized access, disclosure, or alteration.
      </P>

      <H1>6. Children's Privacy</H1>
      <P>
        The App is not intended for use by children under the age of 13. We do
        not knowingly collect personal information from children under 13. If
        you believe we have inadvertently collected personal information from a
        child under 13, please contact us immediately.
      </P>

      <H1>7. Changes to this Privacy Policy</H1>
      <P>
        We reserve the right to update or modify this Privacy Policy at any
        time. We will notify you of any changes by posting the revised Privacy
        Policy on this page.
      </P>

      <H1>8. Contact Us</H1>
      <P>
        If you have any questions or concerns about this Privacy Policy, please
        contact us at <Strong>sipiar@gmail.com.</Strong>
      </P>

      <StatusBar />
    </ScrollView>
  );
};

export default PrivacyAndPolicyScreen;
