import { SectionList, View } from "react-native";
import { Divider } from "react-native-paper";
import { lazy, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";

import { useStyles, createStyleSheet } from "../../../hooks/useStyles";
import SectionHeader from "../../../components/profile/SectionHeader";
import SectionItem from "../../../components/profile/SectionItem";
import EditButton from "../../../components/profile/EditButton";
import StatusBar from "../../../components/common/StatusBar";
import useBoundStore from "../../../zustand/useBoundStore";
import AppBar from "../../../components/ui/AppBar";
import CircularIcon from "../../../components/ui/CircularIcon";
import AppBarTitle from "../../../components/ui/AppBarTitle";
const ConfirmationDialog = lazy(() =>
  import("../../../components/ui/ConfirmationDialog")
);
const UserProfileCard = lazy(() =>
  import("../../../components/profile/UserProfileCard")
);

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

  const formattedDate = moment(userMetaData["birthday"]).format("MMMM D, YYYY");

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
      <AppBar>
        <CircularIcon name="arrow-back" onPress={() => navigation.goBack()} />
        <AppBarTitle>My Account</AppBarTitle>
        <View style={{ width: 40 }} />
      </AppBar>
      <SectionList
        sections={USER_DATA}
        keyExtractor={(item, index) => item + index}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        ListHeaderComponentStyle={styles.listHeaderContainer}
        ListHeaderComponent={
          <UserProfileCard
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

const stylesheet = createStyleSheet((theme) => ({
  contentContainer: {
    paddingBottom: theme.spacing.md,
  },
  divider: {
    marginHorizontal: theme.spacing.base,
  },
  listHeaderContainer: {
    marginBottom: 16,
  },
}));
