import { useNavigation } from "@react-navigation/native";
import { StyleSheet, View } from "react-native";
import { Text, useTheme, TouchableRipple } from "react-native-paper";
import { Feather } from "@expo/vector-icons";

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

export default EditButton;

const styles = StyleSheet.create({
  editButton: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 4,
    paddingVertical: 7,
    paddingHorizontal: 16,
  },
});
