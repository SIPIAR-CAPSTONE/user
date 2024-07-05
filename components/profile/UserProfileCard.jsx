import { StyleSheet, View } from "react-native";
import { Text, useTheme, Avatar } from "react-native-paper";

const UserProfileCard = ({ variant = "text", name, email, renderFooter }) => {
  const theme = useTheme();
  const firstNameInitial = name[0];

  if (variant == "image") {
    // TODO: avatar.image
  }

  return (
    <View style={styles.header}>
      <Avatar.Text
        size={120}
        label={firstNameInitial}
        style={{ backgroundColor: "#FFDDDD" }}
      />
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
