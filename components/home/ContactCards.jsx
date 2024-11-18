import { FlatList, View, Linking } from "react-native";
import { Text } from "react-native-paper";

import ContactCard from "./ContactCard";
import { createStyleSheet, useStyles } from "../../hooks/useStyles";
import ModifyContacts from "./ModifyContacts";
import useBoundStore from "../../zustand/useBoundStore";
import { DEFAULT_CONTACTS } from "./defaultContactsData";

const ContactCards = () => {
  const { styles } = useStyles(stylesheet);
  const contactList = useBoundStore((state) => state.contactList);

  // open phone app of the device and pass the phone Number
  const callNumber = (phoneNumber) => Linking.openURL(`tel:${phoneNumber}`);

  const renderContactCardItem = ({ item }) => (
    <ContactCard
      key={item.id}
      name={item.name}
      contactNumber={item.number}
      onPress={() => callNumber(item.number)}
    />
  );

  return (
    <View>
      <View style={styles.header}>
        <Text variant="titleMedium">Emergency Contacts</Text>
        <ModifyContacts />
      </View>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={[...DEFAULT_CONTACTS, ...contactList]}
        keyExtractor={(item) => item.id}
        renderItem={renderContactCardItem}
        contentContainerStyle={styles.contactCards}
      />
    </View>
  );
};

export default ContactCards;

const stylesheet = createStyleSheet((theme) => ({
  contactCards: {
    columnGap: 14,
    paddingHorizontal: theme.spacing.base,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: theme.spacing.base,
    marginStart: theme.spacing.base,
    marginEnd: theme.spacing.lg,
  },
}));
