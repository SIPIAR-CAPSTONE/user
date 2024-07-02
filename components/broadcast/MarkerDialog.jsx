import { StyleSheet, View } from "react-native";
import { Text, Dialog, Portal, Button, useTheme } from "react-native-paper";
import { Feather } from "@expo/vector-icons";

import { getDistanceGap, getTimeGap } from "../../utils/dateAndDistanceGap";

const EMPTY_PLACEHOLDER = " - ";

const MarkerDialog = ({
  visible,
  hideDialog,
  selectedMarker,
  userLocation,
}) => {
  const name =
    selectedMarker?.first_name || selectedMarker?.last_name
      ? `${selectedMarker?.first_name} ${selectedMarker?.last_name}`
      : EMPTY_PLACEHOLDER;

  const timeGap = selectedMarker?.createdAt
    ? getTimeGap(selectedMarker?.createdAt)
    : EMPTY_PLACEHOLDER;

  const dateRequested = selectedMarker?.createdAt
    ? new Date(selectedMarker?.createdAt)
        .toString()
        .split(" ")
        .slice(0, 4)
        .join(" ")
    : EMPTY_PLACEHOLDER;

  const distanceGap = getDistanceGap(userLocation, selectedMarker?.coordinate);

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={hideDialog}>
        <Dialog.Title numberOfLines={2} style={styles.title}>
          {selectedMarker?.address}
        </Dialog.Title>
        <Dialog.Content style={styles.infoFieldsContainer}>
          <InfoField
            icon="user"
            label="User"
            value={name}
            colors={{ background: "#FBF2DD", color: "#D2BD84" }}
          />
          <InfoField
            icon="map-pin"
            label="Distance"
            value={distanceGap}
            colors={{ background: "#c3ffcc", color: "#53a661" }}
          />
          <InfoField
            icon="clock"
            label="Time Requested"
            value={timeGap}
            colors={{ background: "#D9E8FE", color: "#688CA9" }}
          />
          <InfoField
            icon="calendar"
            label="Date Requested"
            value={dateRequested}
            colors={{ background: "#FFD8CC", color: "#BB655D" }}
          />
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={hideDialog} mode="text" textColor="">
            Close
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

const InfoField = ({ icon, label, value, colors }) => {
  const theme = useTheme();

  return (
    <View style={styles.infoField}>
      <View
        style={[
          styles.iconContainer,
          {
            backgroundColor: colors.background,
            borderRadius: theme.borderRadius.full,
          },
        ]}
      >
        <Feather name={icon} size={18} color={colors.color} />
      </View>
      <View>
        <Text
          style={[
            styles.fieldValue,
            { color: theme.colors.typography.primary },
          ]}
          variant="titleMedium"
        >
          {value}
        </Text>
        <Text
          style={[
            styles.fieldLabel,
            { color: theme.colors.typography.secondary },
          ]}
          variant="bodySmall"
        >
          {label}
        </Text>
      </View>
    </View>
  );
};

export default MarkerDialog;

const styles = StyleSheet.create({
  title: {
    fontWeight: "bold",
  },
  infoFieldsContainer: {
    marginTop: 10,
    rowGap: 12,
  },
  infoField: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 12,
  },
  iconContainer: {
    backgroundColor: "red",
    padding: 14,
  },
  fieldValue: {
    height: 25,
  },
  fieldLabel: {
    height: 22,
  },
});
