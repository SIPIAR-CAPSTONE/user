import { SectionList, StyleSheet } from "react-native";
import { Divider } from "react-native-paper";
import UserProfileCard from "../../../components/profile/UserProfileCard";
import SectionHeader from "../../../components/profile/SectionHeader";
import SectionItem from "../../../components/profile/SectionItem";
import EditButton from "../../../components/profile/EditButton";
import StatusBar from "../../../components/common/StatusBar";
import useBoundStore from "../../../zustand/useBoundStore";
import { useState } from "react";
import useImageReader from "../../../hooks/useImageReader";
import { useStyles, createStyleSheet } from "../../../hooks/useStyles";
import ConfirmationDialog from "../../../components/ui/ConfirmationDialog";
import { useNavigation } from "@react-navigation/native";

const MyAccountScreen = () => {
  const navigation = useNavigation();
  const { styles } = useStyles(stylesheet);
  const userMetaData = useBoundStore((state) => state.userMetaData);
  const [isConfirmationDialogVisible, setIsConfirmationDialogVisible] =
    useState(false);

  const showConfirmationDialog = () => setIsConfirmationDialogVisible(true);
  const hideConfirmationDialog = () => setIsConfirmationDialogVisible(false);

  const handleConfirmation = () => {
    hideConfirmationDialog();
    navigation.navigate("EditProfile");
  };

  //* retrieve profile picture upon screen load
  const [profilePictureUri, setProfilePictureUri] = useState(null);
  useImageReader(setProfilePictureUri);

  //* format date to string (ex.july 1, 2024)
  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const date = new Date(userMetaData["birthday"]);
  const formattedDate = formatDate(date);

  //* array template for UI rendering
  const USER_DATA = [
    {
      title: "Personal Information",
      data: [
        { label: "First Name", value: userMetaData["firstName"] },
        { label: "Middle Name", value: userMetaData["middleName"] },
        { label: "Last Name", value: userMetaData["lastName"] },
        { label: "Suffix", value: userMetaData["suffix"] },
        { label: "Birthday", value: formattedDate },
        { label: "Phone", value: userMetaData["phone"] },
      ],
    },
    {
      title: "Address",
      data: [
        { label: "Barangay", value: userMetaData["barangay"] },
        { label: "Street", value: userMetaData["street"] },
        { label: "House Number", value: userMetaData["houseNumber"] },
      ],
    },
  ];

  const renderItem = ({ item }) => (
    <SectionItem label={item.label} value={item.value} />
  );

  const renderSectionHeader = ({ section: { title } }) => (
    <SectionHeader title={title} />
  );

  const renderItemSeperator = () => <Divider style={styles.divider} />;

  return (
    <>
      <SectionList
        sections={USER_DATA}
        keyExtractor={(item, index) => item + index}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        ListHeaderComponentStyle={styles.listHeaderContainer}
        ListHeaderComponent={
          <UserProfileCard
            imageSource={profilePictureUri}
            name={`${userMetaData["firstName"]} ${userMetaData["middleName"]} ${userMetaData["lastName"]} ${userMetaData["suffix"]}`}
            email={userMetaData["email"]}
            renderFooter={() => <EditButton onPress={showConfirmationDialog} />}
          />
        }
        ItemSeparatorComponent={renderItemSeperator}
        contentContainerStyle={styles.contentContainer}
      />

      <ConfirmationDialog
        title="Are you sure you want to edit your account?"
        isVisible={isConfirmationDialogVisible}
        onPressConfirmation={handleConfirmation}
        onPressCancel={hideConfirmationDialog}
      />

      <StatusBar />
    </>
  );
};

export default MyAccountScreen;

const stylesheet = createStyleSheet((theme) =>
  StyleSheet.create({
    contentContainer: {
      paddingBottom: theme.spacing.md,
    },
    divider: {
      marginHorizontal: theme.spacing.base,
    },
    listHeaderContainer: {
      marginBottom: 16,
    },
  })
);
