import Layout from "../../components/common/Layout";
import EmergencyAlerts from "../../components/home/EmergencyAlerts";
import ContactCards from "../../components/home/ContactCards";
import CprPracticeScores from "../../components/home/CprPracticeScores";
import AppBar from "../../components/ui/AppBar";
import CircularIcon from "../../components/ui/CircularIcon";
import LogoTitle from "../../components/navigation/LogoTitle";
import useLocation from "../../hooks/useLocation";

import Button from "../../components/ui/Button";
import { supabase } from "../../utils/supabase/config";
import useFirstTimePopup from "../../hooks/useFirstTimePopup";

const HomeScreen = ({ navigation }) => {
  useFirstTimePopup({
    key: "TermAndConditions",
    handleFalse: () => navigation.navigate("TermsAndConditions"),
  });

  //! TESTING: GETTING CURRENT USER LOCATION IN HOME PAGE
  const { userLocation } = useLocation();

  const onPressSend = async () => {
    console.log("USER LOCS/ LATITUDE: ", userLocation.latitude);
    console.log("USER LOCS/ LONGTITUDE: ", userLocation.longitude);
    /*
    - BSYTANDER NAME
    - latitude
    - longitude
    - date
    - time
    */
    const { error } = await supabase.from("broadcast").insert({
      latitude: userLocation.latitude,
      longitude: userLocation.longitude,
    });

    if (!error) {
      console.log("success insert");
    }
  };

  //!----------------------------------------------------

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
