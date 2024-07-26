import { StyleSheet, View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { Feather } from "@expo/vector-icons";
import { useMemo } from "react";

const DistanceIcon = ({ distance, status }) => {
  const theme = useTheme();
  const styles = useMemo(() => makeStyles(theme), [theme]);

  const iconColor = status ? theme.colors.green : theme.colors.primary;

  return (
    <View style={styles.container}>
      <Feather name="map-pin" size={22} color={iconColor} />
      <Text style={styles.distance}>{distance}</Text>
    </View>
  );
};

export default DistanceIcon;

const makeStyles = ({ colors }) =>
  StyleSheet.create({
    container: {
      alignItems: "center",
      rowGap: 2,
      marginHorizontal: 3,
    },
    distance: {
      fontSize: 8,
      color: colors.typography.secondary,
    },
  });
