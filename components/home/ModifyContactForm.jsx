import { View } from "react-native";

import TextInput from "../ui/TextInput";
import Button from "../ui/Button";
import { createStyleSheet, useStyles } from "../../hooks/useStyles";

export default function ModifyContactForm({
  contactName,
  onContactNameChange,
  contactNumber,
  onContactNumberChange,
  onSave,
  showDeleteButton = false,
  onDelete = () => {},
}) {
  const { styles } = useStyles(stylesheet);

  const fieldsIsEmpty = contactName.length <= 0 || contactNumber.length <= 0;

  return (
    <View style={styles.modifyContactForm}>
      <TextInput
        placeholder="Contact Number"
        variant="outlined"
        type="numeric"
        maxLength={11}
        value={contactNumber}
        onChangeText={(text) => onContactNumberChange(text)}
        style={styles.textInput}
      />
      <TextInput
        placeholder="Contact Name"
        variant="outlined"
        maxLength={32}
        value={contactName}
        onChangeText={(text) => onContactNameChange(text)}
        style={styles.textInput}
      />
      {showDeleteButton ? (
        <View style={[styles.buttonWrapper, styles.rowDirection]}>
          <Button
            label="Delete"
            variant="outlined"
            onPress={onDelete}
            style={[styles.button, styles.deleteButton]}
          />
          <Button label="Save" onPress={onSave} style={styles.button} />
        </View>
      ) : (
        <View style={styles.buttonWrapper}>
          <Button label="Save" onPress={onSave} disabled={fieldsIsEmpty} />
        </View>
      )}
    </View>
  );
}

const stylesheet = createStyleSheet((theme) => ({
  modifyContactForm: {
    paddingStart: theme.spacing.md,
    paddingEnd: theme.spacing.xl,
    paddingVertical: theme.spacing.lg,
    rowGap: theme.spacing.sm,
  },
  buttonWrapper: {
    marginTop: theme.spacing.sm,
  },
  rowDirection: {
    flexDirection: "row",
    columnGap: theme.spacing.sm,
  },
  button: {
    flex: 1,
  },
  deleteButton: {
    backgroundColor: theme.colors.elevation.level3,
  },
  textInput: {
    height: 50,
    paddingHorizontal: 14,
    borderRadius: theme.borderRadius.sm,
    borderWidth: 1,
    borderColor: theme.colors.text3,
    color: theme.colors.text,
    backgroundColor: theme.colors.elevation.level3,
  },
}));
