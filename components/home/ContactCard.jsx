import { View } from "react-native";
import { Text, TouchableRipple } from "react-native-paper";

import CircularIcon from "../ui/CircularIcon";
import { createStyleSheet, useStyles } from "../../hooks/useStyles";

const ContactCard = ({ name, contactNumber, onPress }) => {
  const { styles } = useStyles(stylesheet);

  return (
    <TouchableRipple borderless onPress={onPress} style={{ borderRadius: 20 }}>
      <View style={styles.card}>
        <Text variant="labelSmall" style={styles.name}>
          {name}
        </Text>
        <Text style={styles.contactNumber}>
          {contactNumber}
        </Text>
        <View style={styles.icon}>
          <CircularIcon name="call" variant="onPrimary" size={18} />
        </View>
      </View>
    </TouchableRipple>
  );
};

export default ContactCard;

const stylesheet = createStyleSheet((theme) => ({
  card: {
    paddingVertical: 16,
    paddingHorizontal: 10,
    borderRadius: 20,
    height: 110,
    width: 240,
    backgroundColor: theme.colors.primary,
  },
  name: {
    textAlign: "center",
    color: theme.colors.onPrimary,
  },
  contactNumber: {
    fontSize: theme.fontSize.xl,
    fontWeight: "bold",
    marginVertical: 5,
    textAlign: "center",
    color: theme.colors.onPrimary,
  },
  icon: {
    position: "absolute",
    bottom: 10,
    end: 14,
    transform: [{ scaleX: -1 }], //to flip the icon vertically
  },
}));
