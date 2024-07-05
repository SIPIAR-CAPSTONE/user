import { StyleSheet, View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { Feather } from "@expo/vector-icons";

const DistanceIcon = ({ distance, status }) => {
  const theme = useTheme();

  const iconColor = status ? theme.colors.green : theme.colors.primary;

  return (
    <View style={styles.container}>
      <Feather name="map-pin" size={22} color={iconColor} />
      <Text
        style={[styles.distance, { color: theme.colors.typography.secondary }]}
      >
        {distance}
      </Text>
    </View>
  );
};

export default DistanceIcon;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    rowGap: 2,
    marginHorizontal: 3,
  },
  distance: {
    fontSize: 8,
  },
});
