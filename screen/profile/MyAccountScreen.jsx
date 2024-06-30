import { SectionList, StyleSheet } from "react-native";
import { Divider, useTheme } from "react-native-paper";

import UserProfileCard from "../../components/profile/UserProfileCard";
import SectionHeader from "../../components/profile/SectionHeader";
import SectionItem from "../../components/profile/SectionItem";
import EditButton from "../../components/profile/EditButton";
import StatusBar from "../../components/common/StatusBar";

const DATA = [
  {
    title: "Personal Information",
    data: [
      { label: "First Name", value: "John" },
      { label: "Middle Name", value: "-" },
      { label: "Last Name", value: "Doe" },
      { label: "Suffix", value: "-" },
      { label: "Birthday", value: "20 Jan 2022" },
      { label: "Phone", value: "091231123123" },
    ],
  },
  {
    title: "Address",
    data: [
      { label: "Barangay", value: "Oakwood Court" },
      { label: "Street", value: "Block 16, Zone 3" },
      { label: "House Number", value: "28" },
    ],
  },
];

const MyAccountScreen = () => {
  const theme = useTheme();

  const renderItem = ({ item }) => (
    <SectionItem label={item.label} value={item.value} />
  );

  const renderSectionHeader = ({ section: { title } }) => (
    <SectionHeader title={title} />
  );

  const renderItemSeperator = () => (
    <Divider style={{ marginHorizontal: theme.padding.body.horizontal }} />
  );

  return (
    <>
      <SectionList
        sections={DATA}
        keyExtractor={(item, index) => item + index}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        ListHeaderComponentStyle={styles.listHeaderContainer}
        ListHeaderComponent={
          <UserProfileCard
            name="John Doe"
            email="j.doe@gmail.com"
            renderFooter={() => <EditButton />}
          />
        }
        ItemSeparatorComponent={renderItemSeperator}
        contentContainerStyle={{ paddingVertical: theme.padding.body.vertical }}
      />

      <StatusBar />
    </>
  );
};

const styles = StyleSheet.create({
  listHeaderContainer: {
    marginBottom: 16,
  },
});

export default MyAccountScreen;
