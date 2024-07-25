import { useNavigation } from "@react-navigation/native";
import { StyleSheet, View } from "react-native";
import { Text, useTheme, TouchableRipple } from "react-native-paper";
import { Feather } from "@expo/vector-icons";
import { useMemo } from "react";

const EditButton = () => {
  const theme = useTheme();
  const styles = useMemo(() => makeStyles(theme), [theme]);
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

const makeStyles = ({ colors, borderRadius }) =>
  StyleSheet.create({
    touchableRipple: {
      borderRadius: borderRadius.full,
      marginTop: 12,
    },
    editButton: {
      flexDirection: "row",
      alignItems: "center",
      columnGap: 4,
      paddingVertical: 7,
      paddingHorizontal: 16,
      backgroundColor: colors.primary,
      borderRadius: borderRadius.full,
    },
    label: {
      color: colors.onPrimary,
    },
  });
