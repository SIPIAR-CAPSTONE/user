import { useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { Text, useTheme, Avatar } from "react-native-paper";

const UserProfileCard = ({ name, imageSource, email, renderFooter }) => {
  const theme = useTheme();
  const styles = useMemo(() => makeStyles(theme), [theme]);
  const firstNameInitial = name[0];

  const UserAvatar = imageSource ? (
    <Avatar.Image
      size={120}
      source={{ uri: imageSource }}
      style={styles.avatar}
    />
  ) : (
    <Avatar.Text size={120} label={firstNameInitial} style={styles.avatar} />
  );

  return (
    <View style={styles.header}>
      {UserAvatar}

      <Text variant="titleMedium">{name}</Text>
      <Text style={styles.email} variant="bodySmall">
        {email}
      </Text>
      {renderFooter && renderFooter()}
    </View>
  );
};

export default UserProfileCard;

const makeStyles = ({ colors }) =>
  StyleSheet.create({
    avatar: {
      backgroundColor: "#FFDDDD",
    },
    header: {
      alignItems: "center",
      paddingVertical: 8,
    },
    email: {
      color: colors.typography.tertiary,
    },
  });
