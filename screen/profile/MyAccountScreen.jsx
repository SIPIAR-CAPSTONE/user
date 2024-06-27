import { SectionList, StyleSheet, View } from "react-native";
import {
  Button,
  Divider,
  Text,
  TouchableRipple,
  useTheme,
} from "react-native-paper";
import UserProfileCard from "../../components/profile/UserProfileCard";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

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
    <View
      style={[
        styles.sectionHeader,
        {
          backgroundColor: theme.colors.secondary,
          paddingHorizontal: theme.padding.body.horizontal,
        },
      ]}
    >
      <Text
        variant="titleSmall"
        style={{ color: theme.colors.typography.secondary }}
      >
        {title}
      </Text>
    </View>
  );

  const renderItemSeperator = () => (
    <Divider style={{ marginHorizontal: theme.padding.body.horizontal }} />
  );

  return (
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
  );
};

/*
 *
 * Related Compontents
 *
 */
const SectionItem = ({ label, value }) => {
  const theme = useTheme();

  return (
    <View
      style={[
        styles.itemContainer,
        { paddingHorizontal: theme.padding.body.horizontal },
      ]}
    >
      <Text
        variant="bodyMedium"
        style={{ color: theme.colors.typography.tertiary }}
      >
        {label}
      </Text>
      <Text variant="bodyMedium">{value}</Text>
    </View>
  );
};

const EditButton = () => {
  const theme = useTheme();
  const navigation = useNavigation();

  return (
    <TouchableRipple
      borderless
      onPress={() => navigation.navigate("EditProfile")}
      style={{ borderRadius: theme.borderRadius.full, marginTop: 12 }}
    >
      <View
        style={[
          styles.editButton,
          {
            backgroundColor: theme.colors.primary,
            borderRadius: theme.borderRadius.full,
          },
        ]}
      >
        <Feather name="edit-3" size={18} color={theme.colors.onPrimary} />
        <Text style={{ color: theme.colors.onPrimary }}> Edit Profile</Text>
      </View>
    </TouchableRipple>
  );
};

const styles = StyleSheet.create({
  sectionHeader: {
    paddingVertical: 8,
    marginVertical: 12,
  },
  listHeaderContainer: {
    marginBottom: 16,
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 14,
  },
  editButton: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 4,
    paddingVertical: 7,
    paddingHorizontal: 16,
  },
});

export default MyAccountScreen;
