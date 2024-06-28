import { View, StyleSheet, Alert, Image } from "react-native";
import { useTheme, Avatar, TouchableRipple } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";


const EditUserProfileCard = ({ name }) => {
  const theme = useTheme();
  const firstNameInitial = name[0];

  return (
    <View style={styles.header}>
      <View>
        <Avatar.Text
          size={124}
          label={firstNameInitial}
          style={{ backgroundColor: "#FFDDDD" }}
        />
        <TouchableRipple
          borderless
          style={{
            borderRadius: theme.borderRadius.full,
            position: "absolute",
            bottom: 5,
            right: 5,
          }}
          onPress={() => {}}
        >
          <View
            style={{
              backgroundColor: theme.colors.primary,
              borderRadius: theme.borderRadius.full,
              height: 30,
              width: 30,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Ionicons
              name="camera-outline"
              size={20}
              color={theme.colors.onPrimary}
            />
          </View>
        </TouchableRipple>
      </View>
    </View>
  );
};

export default EditUserProfileCard;

const styles = StyleSheet.create({
  header: {
    alignItems: "center",
    paddingVertical: 16,
  },
});
