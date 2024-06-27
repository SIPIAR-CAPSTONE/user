import { View, StyleSheet, ScrollView } from "react-native";
import { useTheme } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import ListItem from "../../components/ui/ListItem";
import VerifiedIndicator from "../../components/profile/VerifiedIndicator";
import CircularIcon from "../../components/ui/CircularIcon";
import UserProfileCard from "../../components/profile/UserProfileCard";

const ProfileScreen = () => {
  const theme = useTheme();
  const navigation = useNavigation();

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
            <CircularIcon name="person" variant="primary" size={14} />
          )}
          renderActionIcon={() => <Ionicons name="chevron-forward" size={24} />}
          onPress={() => navigation.navigate("MyAccount")}
        />
        {/* Setting */}
        <ListItem
          size="medium"
          title="Setting"
          renderIcon={() => (
            <CircularIcon name="settings" variant="primary" size={14} />
          )}
          renderActionIcon={() => <Ionicons name="chevron-forward" size={24} />}
          onPress={() => navigation.navigate("Setting")}
        />
        {/* Terms and Conditions */}
        <ListItem
          size="medium"
          title="Terms and Conditions"
          renderIcon={() => (
            <CircularIcon name="document" variant="primary" size={14} />
          )}
          renderActionIcon={() => <Ionicons name="chevron-forward" size={24} />}
          onPress={() => navigation.navigate("TermsAndConditions")}
        />
        {/* Privacy Policy */}
        <ListItem
          size="medium"
          title="Privacy Policy"
          renderIcon={() => (
            <CircularIcon name="shield-checkmark" variant="primary" size={14} />
          )}
          renderActionIcon={() => <Ionicons name="chevron-forward" size={24} />}
          onPress={() => navigation.navigate("PrivacyPolicy")}
        />
        {/* Sign Out */}
        <ListItem
          size="medium"
          title="Sign Out"
          renderIcon={() => (
            <CircularIcon name="exit" variant="primary" size={14} />
          )}
          renderActionIcon={() => <Ionicons name="chevron-forward" size={24} />}
          onPress={() => {}}
        />
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  listItems: {
    marginTop: 20,
    rowGap: 10,
  },
});
