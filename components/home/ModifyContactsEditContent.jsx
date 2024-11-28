import { Divider, List, Text } from "react-native-paper";
import { useState } from "react";
import { ScrollView, View } from "react-native";

import useBoundStore from "../../zustand/useBoundStore";
import { DEFAULT_CONTACTS } from "./defaultContactsData";
import ModifyContactForm from "./ModifyContactForm";
import { createStyleSheet, useStyles } from "../../hooks/useStyles";

export default function ModifyContactsEditContent() {
  const { styles } = useStyles(stylesheet);
  const [editMode, setEditMode] = useState(false);
  const contactList = useBoundStore((state) => state.contactList);
  const editEmergencyContact = useBoundStore((state) => state.editContact);
  const removeContact = useBoundStore((state) => state.removeContact);
  const [selectedContact, setSelectedContact] = useState({
    id: null,
    name: "",
    number: "",
  });

  handleContactNameChange = (value) => {
    setSelectedContact((prevContact) => ({ ...prevContact, name: value }));
  };

  handleContactNumberChange = (value) => {
    setSelectedContact((prevContact) => ({ ...prevContact, number: value }));
  };

  handleSelectContactToEdit = (item) => {
    setEditMode(true);
    setSelectedContact(item);
  };

  handleSave = () => {
    editEmergencyContact(selectedContact);
    setEditMode(false);
  };

  handleDelete = () => {
    removeContact(selectedContact?.id);
    setEditMode(false);
  };

  return (
    <ScrollView style={styles.content}>
      {editMode ? (
        <>
          <Text variant="titleMedium" style={styles.title}>
            Edit Contact
          </Text>
          <ModifyContactForm
            contactName={selectedContact.name}
            onContactNameChange={handleContactNameChange}
            contactNumber={selectedContact.number}
            onContactNumberChange={handleContactNumberChange}
            onSave={handleSave}
            showDeleteButton
            onDelete={handleDelete}
          />
        </>
      ) : (
        <>
          {DEFAULT_CONTACTS.map((item) => (
            <List.Item
              key={item.id}
              title={item.number}
              description={item.name}
              left={(props) => <List.Icon {...props} icon="account-circle" />}
            />
          ))}
          {contactList?.map((item) => (
            <List.Item
              key={item.id}
              title={item.number}
              description={item.name}
              left={(props) => <List.Icon {...props} icon="account-circle" />}
              right={(props) => (
                <List.Icon {...props} icon="square-edit-outline" />
              )}
              onPress={() => handleSelectContactToEdit(item)}
            />
          ))}
        </>
      )}
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
