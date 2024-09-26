import Layout from "../../components/common/Layout";
import EmergencyAlerts from "../../components/home/EmergencyAlerts";
import ContactCards from "../../components/home/ContactCards";
import CprPracticeScores from "../../components/home/CprPracticeScores";
import AppBar from "../../components/ui/AppBar";
import CircularIcon from "../../components/ui/CircularIcon";
import LogoTitle from "../../components/navigation/LogoTitle";

const HomeScreen = ({ navigation }) => {
  const CustomAppBar = () => (
    <AppBar>
      <LogoTitle />
      <CircularIcon
        name="notifications"
        pressable
        onPress={() => navigation.navigate("Notification")}
      />
    </AppBar>
  );

  return (
    <Layout
      scrollable
      removeDefaultPaddingHorizontal
      AppbarComponent={CustomAppBar}
    >
      <ContactCards />
      <EmergencyAlerts />
      <CprPracticeScores />
    </Layout>
  );
};

export default HomeScreen;
