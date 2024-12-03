import Layout from "../../components/common/Layout";
import AppBar from "../../components/ui/AppBar";
import CircularIcon from "../../components/ui/CircularIcon";
import LogoTitle from "../../components/navigation/LogoTitle";
import useLocation from "../../hooks/useLocation";
import EmergencyAlerts from "../../components/home/EmergencyAlerts";
import ContactCards from "../../components/home/ContactCards";
import CprPracticeScores from "../../components/home/CprPracticeScores";
import Button from "../../components/ui/Button";
import { supabase } from "../../utils/supabase/config";
import useFirstTimePopup from "../../hooks/useFirstTimePopup";
import useBoundStore from "../../zustand/useBoundStore";

const HomeScreen = ({ navigation }) => {
  useFirstTimePopup({
    key: "TermAndConditions",
    handleFalse: () => navigation.navigate("TermsAndConditions"),
  });

  //! TESTING: GETTING CURRENT USER LOCATION IN HOME PAGE
  const { userLocation } = useLocation();
  const session = useBoundStore((state) => state.session);
  const userId = session?.user?.id;

  const onPressSend = async () => {
    try {
      const { error, data } = await supabase.from("broadcast").insert({
        latitude: userLocation.latitude,
        longitude: userLocation.longitude,
        address: "test address",
        barangay: "test barangay",
        landmark: "test landmark",
        isActive: "Yes",
        user_id: userId,
        created_at: new Date().toISOString(),
      });

      if (error) {
        console.log("insert to broadcast error inner: ", error.message);
      }
      if (data) {
        console.log("insert to broadcast: ", data);
      }
    } catch (error) {
      console.log("insert to broadcast error outer: ", error.message);
    }
  };

  const CustomAppBar = () => (
    <AppBar>
      <LogoTitle />
      <CircularIcon
        name="notifications"
        onPress={() => navigation.navigate("Notification")}
      />
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

      <Button label={"asd"} onPress={onPressSend} />
    </Layout>
  );
};

export default HomeScreen;
