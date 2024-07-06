import { View, StyleSheet, ScrollView } from "react-native";
import { useTheme } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useRef } from "react";
import StatusBar from "../../components/common/StatusBar";
import ListItem from "../../components/ui/ListItem";
import VerifiedIndicator from "../../components/profile/VerifiedIndicator";
import CircularIcon from "../../components/ui/CircularIcon";
import UserProfileCard from "../../components/profile/UserProfileCard";
import ConfirmationDialog from "../../components/ui/ConfirmationDialog";
import NextActionIcon from "../../components/common/NextActionIcon";
import { supabase } from "../../utils/supabase/config";
import { LargeSecureStore } from "../../utils/SecureLocalStorage";
import useBoundStore from "../../zustand/useBoundStore";

const ProfileScreen = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const logoutDialogRef = useRef(null);

  const removeSession = useBoundStore((state) => state.removeSession);
  const largeSecureStore = new LargeSecureStore();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (!error) {
      //! remove encrypted session from secure local storage
      await largeSecureStore.removeItem("session");
      //! remove encrypted session as a global state
      removeSession();
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{
        paddingVertical: theme.padding.body.vertical,
        paddingHorizontal: theme.padding.body.horizontal,
      }}
      showsVerticalScrollIndicator={false}
    >
      <UserProfileCard
        name="John Doe"
        email="j.doe@gmail.com"
        renderFooter={() => <VerifiedIndicator isVerified={false} />}
      />
      {/*
       *
       * Profile screen
       * List item
       *
       */}
      <View style={styles.listItems}>
        {/* My Account */}
        <ListItem
          size="medium"
          title="My Account"
          renderIcon={() => (
            <CircularIcon name="person" variant="primary" size={12} />
          )}
          renderActionIcon={() => <NextActionIcon />}
          onPress={() => navigation.navigate("MyAccount")}
        />
        {/* Setting */}
        <ListItem
          size="medium"
          title="Setting"
          renderIcon={() => (
            <CircularIcon name="settings" variant="primary" size={12} />
          )}
          renderActionIcon={() => <NextActionIcon />}
          onPress={() => navigation.navigate("Setting")}
        />
        {/* Terms and Conditions */}
        <ListItem
          size="medium"
          title="Terms and Conditions"
          renderIcon={() => (
            <CircularIcon name="document" variant="primary" size={12} />
          )}
          renderActionIcon={() => <NextActionIcon />}
          onPress={() => navigation.navigate("TermsAndConditions")}
        />
        {/* Privacy Policy */}
        <ListItem
          size="medium"
          title="Privacy Policy"
          renderIcon={() => (
            <CircularIcon name="shield-checkmark" variant="primary" size={12} />
          )}
          renderActionIcon={() => <NextActionIcon />}
          onPress={() => navigation.navigate("PrivacyPolicy")}
        />

        {/* Sign Out */}
        {/* When logout button is pressed, show confirmation dialog */}
        <ListItem
          size="medium"
          title="Sign Out"
          renderIcon={() => (
            <CircularIcon name="exit" variant="primary" size={12} />
          )}
          renderActionIcon={() => <NextActionIcon />}
          onPress={() => logoutDialogRef.current.showDialog()}
        />
        <ConfirmationDialog
          ref={logoutDialogRef}
          title="Are you sure you want to Sign Out?"
          buttons={[
            { label: "Sign out", onPress: handleLogout, mode: "contained" },
            {
              label: "Cancel",
              onPress: () => logoutDialogRef.current.hideDialog(),
              mode: "text",
            },
          ]}
        />
      </View>

      <StatusBar />
    </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  listItems: {
    marginTop: 20,
    rowGap: 7,
  },
});
