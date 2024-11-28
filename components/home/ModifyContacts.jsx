import { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import {
  Modal,
  Portal,
  Text,
  Button as RNButton,
  SegmentedButtons,
  Divider,
} from "react-native-paper";
import Feather from "@expo/vector-icons/Feather";

import { createStyleSheet, useStyles } from "../../hooks/useStyles";
import ModifyContactsEditContent from "./ModifyContactsEditContent";
import ModifyContactsAddContent from "./ModifyContactsAddContent";

export default function ModifyContact() {
  const { styles, theme } = useStyles(stylesheet);
  const [visible, setVisible] = useState(false);
  const [modifyMode, setModifyMode] = useState("Edit");

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  return (
    <>
      <TriggerButton onPress={showModal} />

      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={styles.containerStyle}
        >
          <View style={styles.header}>
            <Text variant="titleLarge">Emergency Contacts</Text>
          </View>
          <SegmentedButtons
            value={modifyMode}
            onValueChange={setModifyMode}
            style={styles.segmentedButtons}
            buttons={[
              {
                value: "Edit",
                label: "Edit",
                icon: "book-edit-outline",
              },
              {
                value: "Add",
                label: "Add",
                icon: "book-plus-outline",
              },
            ]}
          />
          <Divider />

          {modifyMode === "Edit" ? (
            <ModifyContactsEditContent />
          ) : (
            <ModifyContactsAddContent hideModal={hideModal} />
          )}

          <View style={styles.actions}>
            <RNButton onPress={hideModal}>Close</RNButton>
          </View>
        </Modal>
      </Portal>
    </>
  );
}

function TriggerButton({ onPress }) {
  const { styles, theme } = useStyles(stylesheet);

  return (
    <TouchableOpacity onPress={onPress} style={styles.editButton}>
      <Feather name="edit-3" size={22} color={theme.colors.primary} />
    </TouchableOpacity>
  );
}

const stylesheet = createStyleSheet((theme) => ({
  containerStyle: {
    minHeight: 460,
    maxHeight: "90%",
    margin: theme.spacing.base,
    paddingVertical: theme.spacing.base,
    backgroundColor: theme.colors.elevation.level3,
    borderRadius: theme.borderRadius.curve,
    justifyContent: "flex-start",
  },
  header: {
    paddingVertical: theme.spacing.xs,
    paddingHorizontal: theme.spacing.xl,
  },
  segmentedButtons: {
    paddingHorizontal: theme.spacing.xl,
    paddingTop: theme.spacing.xxs,
    paddingBottom: theme.spacing.lg,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingTop: 8,
    paddingHorizontal: theme.spacing.xl,
  },
  editButton: {
    padding: 3,
    borderRadius: theme.borderRadius.full,
  },
}));
