import { View, StyleSheet } from "react-native";
import { useTheme, TouchableRipple, Avatar } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import useImagePicker from "../../hooks/useImagePicker";

const EditUserProfileCard = ({ name, image, setImage }) => {
  const theme = useTheme();
  const firstNameInitial = name[0];

  const { pickImage } = useImagePicker();

  // The button for opening image library to select image
  // it is the camera icon button
  const SelectImageButton = () => {
    return (
      <TouchableRipple
        borderless
        style={{
          borderRadius: theme.borderRadius.full,
          position: "absolute",
          bottom: 5,
          right: 5,
        }}
        onPress={() => pickImage(setImage)}
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
    );
  };

  // If image is provided use avatar.image else use avatar.text
  const UserProfileAvatar = () => {
    if (image) {
      return (
        <View>
          <Avatar.Image size={124} source={{ uri: image }} />
          <SelectImageButton />
        </View>
      );
    }

    return (
      <View>
        <Avatar.Text
          size={124}
          label={firstNameInitial}
          style={{ backgroundColor: "#FFDDDD" }}
        />
        <SelectImageButton />
      </View>
    );
  };

  return (
    <View style={styles.header}>
      <UserProfileAvatar />
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
