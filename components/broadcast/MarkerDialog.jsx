import { View } from "react-native";
import { Text, Dialog, Portal, Button } from "react-native-paper";
import { Feather } from "@expo/vector-icons";
import { useMemo } from "react";

import { getDistanceGap, getTimeGap } from "../../utils/dateAndDistanceGap";
import { useStyles, createStyleSheet } from "../../hooks/useStyles";

const EMPTY_PLACEHOLDER = " - ";

/**
 * Component that displays a dialog with information about a marker.
 *
 * @param {boolean} props.visible - Whether the dialog should be visible.
 * @param {Function} props.hideDialog - The function to call when the dialog should be hidden.
 * @param {Object} props.selectedMarker - The selected marker to display information about selected alert.
 * @param {Object} props.userLocation - The user's location.
 */
const MarkerDialog = ({
  visible,
  hideDialog,
  selectedMarker,
  userLocation,
}) => {
  const { styles } = useStyles(stylesheet);

  // Get the full name of the selected marker, using the first and last name if available, otherwise use the EMPTY_PLACEHOLDER.
  const FULL_NAME = `${selectedMarker?.first_name} ${selectedMarker?.last_name}`;
  const name = useMemo(
    () =>
      selectedMarker?.first_name || selectedMarker?.last_name
        ? FULL_NAME
        : EMPTY_PLACEHOLDER,
    [selectedMarker?.first_name, selectedMarker?.last_name]
  );

  // Calculate the distance gap between the user's location and the selected marker's location.
  const distanceGap = useMemo(
    () => getDistanceGap(userLocation, selectedMarker?.coordinate),
    [userLocation, selectedMarker?.coordinate]
  );

  // Calculate the time gap between the selected marker's createdAt and the current time.
  const timeGap = useMemo(
    () =>
      selectedMarker?.createdAt
        ? getTimeGap(selectedMarker?.createdAt)
        : EMPTY_PLACEHOLDER,
    [selectedMarker?.createdAt]
  );

  // Get the date requested from the selected marker's createdAt, or use the EMPTY_PLACEHOLDER if unavailable.
  const dateRequested = useMemo(
    () =>
      selectedMarker?.createdAt
        ? new Date(selectedMarker?.createdAt).toLocaleDateString()
        : EMPTY_PLACEHOLDER,
    [selectedMarker?.createdAt]
  );

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
          <Button onPress={hideDialog} mode="text" rippleColor="rgba(0,0,0,0)">
            close
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

/**
 * InfoField component displays a single piece of information with its corresponding icon.
 *
 * @param {string} props.icon - The name of the icon to be displayed.
 * @param {string} props.label - The label of the information field.
 * @param {string} props.value - The value of the information field.
 * @param {Object} props.colors - The background and color of the icon container.
 * @param {string} props.colors.background - The background color of the icon container.
 * @param {string} props.colors.color - The text color of the icon.
 */
const InfoField = ({ icon, label, value, colors }) => {
  const { styles } = useStyles(stylesheet);
 
  return (
    <View style={styles.infoField}>
      <View
        style={[styles.iconContainer, { backgroundColor: colors.background }]}
      >
        <Feather name={icon} size={18} color={colors.color} />
      </View>
      {/* Container for the label and value */}
      <View>
        <Text style={styles.fieldValue} variant="titleMedium">
          {value}
        </Text>
        <Text style={styles.fieldLabel} variant="bodySmall">
          {label}
        </Text>
      </View>
    </View>
  );
};

export default MarkerDialog;

const stylesheet = createStyleSheet((theme) => ({
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
    backgroundColor: theme.colors.background,
    borderRadius: theme.borderRadius.full,
  },
  fieldValue: {
    height: 25,
    color: theme.colors.typography.primary,
  },
  fieldLabel: {
    height: 22,
    color: theme.colors.typography.secondary,
  },
}));
