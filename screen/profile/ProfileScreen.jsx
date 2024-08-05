import { View, ScrollView } from "react-native";
import { Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useRef, useState } from "react";
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
import useUserMetadata from "../../hooks/useUserMetadata";
import * as FileSystem from "expo-file-system";
import useImageReader from "../../hooks/useImageReader";
import { useStyles, createStyleSheet } from "../../hooks/useStyles";

/**
 * Profile screen component
 * Displays navigation itemsand a user profile card with user profile information
 */
const ProfileScreen = () => {
  const { styles } = useStyles(stylesheet);
  const navigation = useNavigation();
  // Create references for the confirmation dialogs
  const verificationScreenConfirmationDialogRef = useRef(null);
  const logoutDialogRef = useRef(null);

  const userMetaData = useBoundStore((state) => state.userMetaData);
  const removeSession = useBoundStore((state) => state.removeSession);
  const largeSecureStore = new LargeSecureStore();
  const { removeState } = useUserMetadata();
  const removeProfilePicturePath = useBoundStore(
    (state) => state.removeProfilePicturePath
  );
  const globalStateProfilePath = useBoundStore(
    (state) => state.profilePicturePath
  );

  //* retrieve profile picture upon screen load
  const [profilePictureUri, setProfilePictureUri] = useState(null);
  useImageReader(setProfilePictureUri);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (!error) {
      //* remove encrypted session from secure local storage
      await largeSecureStore.removeItem("session");
      //* remove encrypted session as a global state
      removeSession();

      //* remove global state variable
      removeState();

      //* remove profile picture in local storage
      await FileSystem.deleteAsync(globalStateProfilePath);

      //* remove profile picture global variable
      removeProfilePicturePath();
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
    verificationScreenConfirmationDialogRef.current.hideDialog();
    setTimeout(() => {
      navigation.navigate("AccountVerification");
    }, 10);
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <UserProfileCard
        name={`${userMetaData["firstName"]} ${userMetaData["middleName"]} ${userMetaData["lastName"]} ${userMetaData["suffix"]}`}
        email={userMetaData["email"]}
        imageSource={profilePictureUri}
        renderFooter={() => (
          <VerifiedIndicator
            isVerified={false}
            onPress={() =>
              verificationScreenConfirmationDialogRef.current.showDialog()
            }
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
          title="Setting"
          renderIcon={() => (
            <CircularIcon name="settings" variant="primary" size={12} />
          )}
          renderActionIcon={() => <NextActionIcon />}
          onPress={() => navigation.navigate("Setting")}
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
          onPress={() => logoutDialogRef.current.showDialog()}
        />
        {/* Confirmation dialog for the sign out action */}
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

        {/* Confirmation dialog for starting the verification process */}
        <ConfirmationDialog
          ref={verificationScreenConfirmationDialogRef}
          title="Here are the steps to verify your account:"
          content={<EnteringVerificationConfirmationContent />}
          buttons={[
            {
              label: "GetStarted",
              onPress: handleNavigateToVerification,
              mode: "contained",
            },
            {
              label: "Cancel",
              onPress: () =>
                verificationScreenConfirmationDialogRef.current.hideDialog(),
              mode: "text",
            },
          ]}
        />
      </View>

      <StatusBar />
    </ScrollView>
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
  container: {
    paddingVertical: theme.padding.body.vertical,
    paddingHorizontal: theme.padding.body.horizontal,
  },
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
