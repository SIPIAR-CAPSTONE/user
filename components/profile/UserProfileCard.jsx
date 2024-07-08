import { StyleSheet, View } from "react-native";
import { Text, useTheme, Avatar } from "react-native-paper";

const UserProfileCard = ({ name, imageSource, email, renderFooter }) => {
  const theme = useTheme();
  const firstNameInitial = name[0];

  const UserAvatar = imageSource ? (
    <Avatar.Image
      size={120}
      source={{ uri: imageSource }}
      style={{ backgroundColor: "#FFDDDD" }}
    />
  ) : (
    <Avatar.Text
      size={120}
      label={firstNameInitial}
      style={{ backgroundColor: "#FFDDDD" }}
    />
  );

  return (
    <View style={styles.header}>
      {UserAvatar}

      <Text variant="titleMedium">{name}</Text>
      <Text
        style={{ color: theme.colors.typography.tertiary }}
        variant="bodySmall"
      >
        {email}
      </Text>
      {renderFooter && renderFooter()}
    </View>
  );
};

export default UserProfileCard;

const styles = StyleSheet.create({
  header: {
    alignItems: "center",
    paddingVertical: 8,
  },
});
