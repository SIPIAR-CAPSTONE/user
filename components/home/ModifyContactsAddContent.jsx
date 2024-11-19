import { useId, useState } from "react";
import { Text } from "react-native-paper";
import { ScrollView } from "react-native";

import ModifyContactForm from "./ModifyContactForm";
import { createStyleSheet, useStyles } from "../../hooks/useStyles";
import useBoundStore from "../../zustand/useBoundStore";

export default function ModifyContactsAddContent({ hideModal }) {
  const { styles } = useStyles(stylesheet);
  const randomId = useId();

  const addNewEmergencyContact = useBoundStore((state) => state.addContact);
  const [newContact, setNewContact] = useState({
    id: randomId,
    name: "",
    number: "",
  });

  handleContactNameChange = (value) => {
    setNewContact((prevContact) => ({ ...prevContact, name: value }));
  };

  handleContactNumberChange = (value) => {
    setNewContact((prevContact) => ({ ...prevContact, number: value }));
  };

  handleSave = () => {
    addNewEmergencyContact(newContact);
    hideModal();
  };

  return (
    <ScrollView style={styles.content}>
      <Text variant="titleMedium" style={styles.title}>
        Add New Contact
      </Text>
      <ModifyContactForm
        contactName={newContact.name}
        onContactNameChange={handleContactNameChange}
        contactNumber={newContact.number}
        onContactNumberChange={handleContactNumberChange}
        onSave={handleSave}
      />
    </ScrollView>
  );
}

const stylesheet = createStyleSheet((theme) => ({
  title: {
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.xs,
  },
  content: {
    flex: 1,
    paddingTop: theme.spacing.base,
    paddingStart: theme.spacing.xxxs,
  },
}));
