import { View, ToastAndroid } from "react-native";
import { Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { lazy, useEffect, useState } from "react";
import * as FileSystem from "expo-file-system";

import ListItem from "../../components/ui/ListItem";
import VerifiedIndicator from "../../components/profile/VerifiedIndicator";
import CircularIcon from "../../components/ui/CircularIcon";
import NextActionIcon from "../../components/common/NextActionIcon";
import { supabase } from "../../utils/supabase/config";
import useBoundStore from "../../zustand/useBoundStore";
import useUserMetadata from "../../hooks/useUserMetadata";
import { useStyles, createStyleSheet } from "../../hooks/useStyles";
import Layout from "../../components/common/Layout";
import AppBar from "../../components/ui/AppBar";
import AppBarTitle from "../../components/ui/AppBarTitle";
import useCheckVerification from "../../hooks/cpr/useCheckVerification";
const ConfirmationDialog = lazy(() =>
  import("../../components/ui/ConfirmationDialog")
);
const UserProfileCard = lazy(() =>
  import("../../components/profile/UserProfileCard")
);

const ProfileScreen = () => {
  const { styles } = useStyles(stylesheet);
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);
  const [isLogoutDialogVisible, setIsLogoutDialogVisible] = useState(false);
  const [isNavConfirmationDialogVisible, setIsNavConfirmationDialogVisible] =
    useState(false);
  const hideLogoutDialog = () => setIsLogoutDialogVisible(false);
  const showLogoutDialog = () => setIsLogoutDialogVisible(true);

  useCheckVerification();
  const userIsVerified = useBoundStore((state) => state.userIsVerified);

  const hideNavConfirmationDialog = () =>
    setIsNavConfirmationDialogVisible(false);
  const showNavConfirmationDialog = () =>
    setIsNavConfirmationDialogVisible(true);

  const removeSession = useBoundStore((state) => state.removeSession);
  const { removeState } = useUserMetadata();
  const removeProfilePicturePath = useBoundStore(
    (state) => state.removeProfilePicturePath
  );
  const globalStateProfilePath = useBoundStore(
    (state) => state.profilePicturePath
  );

  const handleLogout = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();

      if (!error) {
        //* remove encrypted session as a global state
        await removeSession();

        //* remove global state variable
        removeState();

        //* remove profile picture in local storage
        if (globalStateProfilePath) {
          try {
            //* remove profile picture in local storage
            await FileSystem.deleteAsync(globalStateProfilePath);
          } catch (error) {
            ToastAndroid.show(`${error.message}`, ToastAndroid.SHORT);
          }
        }

        //* remove profile picture global variable
        removeProfilePicturePath();
      }
    } catch (error) {
      ToastAndroid.show(`${error.message}`, ToastAndroid.SHORT);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Navigate to the verification screen
   * Hides the verification confirmation dialog and navigates to the verification screen after a delay of 10ms
   * a add delay to have smoother transition when navigate
   * because without the delay the dialog still showing for a moment when already
   * navigated to the AccountVerification screen resulting in a laggy transition
   */
  const handleNavigateToVerification = () => {
    hideNavConfirmationDialog();
    setTimeout(() => {
      navigation.navigate("AccountVerification");
    }, 10);
  };

  const handleConfirmLogout = () => {
    handleLogout();
  };

  const CustomAppBar = () => (
    <AppBar centerContent>
      <AppBarTitle>Profile</AppBarTitle>
    </AppBar>
  );

  return (
    <Layout scrollable AppbarComponent={CustomAppBar}>
      <UserProfileCard
        renderFooter={() => (
          <VerifiedIndicator
            isVerified={userIsVerified}
            onPress={showNavConfirmationDialog}
          />
        )}
      />
      {/* Profile screen list items */}
      <View style={styles.listItems}>
        <ListItem
          size="medium"
          title="My Account"
          renderIcon={() => (
            <CircularIcon name="person" variant="primary" size={12} />
          )}
          renderActionIcon={() => <NextActionIcon />}
          onPress={() => navigation.navigate("MyAccount")}
        />
        <ListItem
          size="medium"
          title="Settings"
          renderIcon={() => (
            <CircularIcon name="settings" variant="primary" size={12} />
          )}
          renderActionIcon={() => <NextActionIcon />}
          onPress={() => navigation.navigate("Settings")}
        />
        <ListItem
          size="medium"
          title="Terms and Conditions"
          renderIcon={() => (
            <CircularIcon name="document" variant="primary" size={12} />
          )}
          renderActionIcon={() => <NextActionIcon />}
          onPress={() => navigation.navigate("TermsAndConditions")}
        />
        <ListItem
          size="medium"
          title="Privacy Policy"
          renderIcon={() => (
            <CircularIcon name="shield-checkmark" variant="primary" size={12} />
          )}
          renderActionIcon={() => <NextActionIcon />}
          onPress={() => navigation.navigate("PrivacyPolicy")}
        />
        <ListItem
          size="medium"
          title="Sign Out"
          renderIcon={() => (
            <CircularIcon name="exit" variant="primary" size={12} />
          )}
          renderActionIcon={() => <NextActionIcon />}
          onPress={showLogoutDialog}
        />
        {/* Confirmation dialog for the sign out action */}
        <ConfirmationDialog
          title="Are you sure you want to Sign Out?"
          isVisible={isLogoutDialogVisible}
          onPressConfirmation={handleConfirmLogout}
          onPressCancel={hideLogoutDialog}
          loading={loading}
        />

        {/* Confirmation dialog for starting the verification process */}
        <ConfirmationDialog
          title="Here are the steps to verify your account:"
          content={<EnteringVerificationConfirmationContent />}
          isVisible={isNavConfirmationDialogVisible}
          onPressConfirmation={handleNavigateToVerification}
          onPressCancel={hideNavConfirmationDialog}
        />
      </View>
    </Layout>
  );
};

const EnteringVerificationConfirmationContent = () => {
  const { styles } = useStyles(stylesheet);

  //all instructions in the bottomSheet
  const renderInstructions = InstructionData.map((instruction) => (
    <View key={instruction.id} style={styles.instructionContainer}>
      <View style={styles.circularNumber}>
        <Text style={styles.number}>{instruction.number}</Text>
      </View>
      <Text variant="bodyMedium" style={styles.desc}>
        {instruction.desc}
      </Text>
    </View>
  ));

  return (
    <View>
      <View style={styles.instructionsContainer}>{renderInstructions}</View>
    </View>
  );
};

export default ProfileScreen;

const stylesheet = createStyleSheet((theme) => ({
  listItems: {
    marginTop: 20,
    rowGap: 7,
  },
  instructionsContainer: {
    rowGap: 20,
    marginTop: 10,
  },
  instructionContainer: {
    flexDirection: "row",
    columnGap: 10,
    alignItems: "center",
  },
  circularNumber: {
    height: 22,
    width: 22,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 2,
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.full,
  },
  number: {
    color: theme.colors.onPrimary,
    fontSize: theme.fontSize.xs,
  },
  desc: {
    flex: 1,
    fontSize: 13,
  },
}));

const InstructionData = [
  {
    id: 0,
    number: 1,
    desc: "Provide your correct information",
  },
  {
    id: 1,
    number: 2,
    desc: "Take a front picture with your ID",
  },
  {
    id: 2,
    number: 3,
    desc: "Take a back picture with your ID",
  },
];
