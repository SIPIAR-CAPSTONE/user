import { StyleSheet, FlatList, View, Linking } from "react-native";
import { Text } from "react-native-paper";

import ContactCard from "./ContactCard";
import { createStyleSheet, useStyles } from "../../hooks/useStyles";

const ContactCardData = [
  { id: 1, name: "National Emergency Number", contactNumber: "911" },
  {
    id: 2,
    name: "Northern Mindanao Medical Center",
    contactNumber: "726-362",
  },
];

const ContactCards = () => {
  const { styles } = useStyles(stylesheet);

  // open phone app of the device and pass the phone Number
  const callNumber = (phoneNumber) => Linking.openURL(`tel:${phoneNumber}`);

  const renderContactCardItem = ({ item }) => (
    <ContactCard
      key={item.id}
      name={item.name}
      contactNumber={item.contactNumber}
      onPress={() => callNumber(item.contactNumber)}
    />
  );

  return (
    <View>
      <Text variant="titleMedium" style={styles.header}>
        Emergency Contacts
      </Text>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={ContactCardData}
        keyExtractor={(item) => item.id}
        renderItem={renderContactCardItem}
        contentContainerStyle={styles.contactCards}
      />
    </View>
  );
};

export default ContactCards;

const stylesheet = createStyleSheet((theme) =>
  StyleSheet.create({
    contactCards: {
      columnGap: 14,
      paddingHorizontal: theme.spacing.base,
    },
    header: {
      marginStart: theme.spacing.base,
      marginVertical: theme.spacing.base,
    },
  })
);
