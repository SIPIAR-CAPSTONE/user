import Layout from "../../components/common/Layout";
import AppBar from "../../components/ui/AppBar";
import CircularIcon from "../../components/ui/CircularIcon";
import LogoTitle from "../../components/navigation/LogoTitle";
import EmergencyAlerts from "../../components/home/EmergencyAlerts";
import ContactCards from "../../components/home/ContactCards";
import CprPracticeScores from "../../components/home/CprPracticeScores";
import useFirstTimePopup from "../../hooks/useFirstTimePopup";
import useCheckVerification from "../../hooks/cpr/useCheckVerification";

const HomeScreen = ({ navigation }) => {
  useFirstTimePopup({
    key: "TermAndConditions",
    handleFalse: () => navigation.navigate("TermsAndConditions"),
  });
  useCheckVerification();
 
  const CustomAppBar = () => (
    <AppBar>
      <LogoTitle />
    </AppBar>
  );

  return (
    <Layout
      scrollable
      removeDefaultPaddingHorizontal
      AppbarComponent={CustomAppBar}
      contentContainerStyle={{ paddingBottom: 20 }}
    >
      <ContactCards />
      <EmergencyAlerts />
      <CprPracticeScores />
    </Layout>
  );
};

export default HomeScreen;
