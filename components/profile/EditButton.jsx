import { useNavigation } from "@react-navigation/native";
import { StyleSheet, View } from "react-native";
import { Text, TouchableRipple } from "react-native-paper";
import { Feather } from "@expo/vector-icons";
import { useStyles, createStyleSheet } from "../../hooks/useStyles";

const EditButton = () => {
  const { styles, theme } = useStyles(stylesheet);
  const navigation = useNavigation();

  return (
    <TouchableRipple
      borderless
      onPress={() => navigation.navigate("EditProfile")}
      style={styles.touchableRipple}
    >
      <View style={styles.editButton}>
        <Feather name="edit-3" size={18} color={theme.colors.onPrimary} />
        <Text style={styles.label}> Edit Profile</Text>
      </View>
    </TouchableRipple>
  );
};

export default EditButton;

const stylesheet = createStyleSheet((theme) =>
  StyleSheet.create({
    touchableRipple: {
      borderRadius: theme.borderRadius.full,
      marginTop: 12,
    },
    editButton: {
      flexDirection: "row",
      alignItems: "center",
      columnGap: 4,
      paddingVertical: 7,
      paddingHorizontal: 16,
      backgroundColor: theme.colors.primary,
      borderRadius: theme.borderRadius.full,
    },
    label: {
      color: theme.colors.onPrimary,
    },
  })
);
