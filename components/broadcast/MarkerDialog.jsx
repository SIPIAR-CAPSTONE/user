import { Dialog, Portal, Button } from "react-native-paper";
import { useMemo } from "react";

import { getDistanceGap, getTimeGap } from "../../utils/calculateGap";
import { useStyles, createStyleSheet } from "../../hooks/useStyles";
import InfoField from "./InfoField";
import moment from "moment";

const EMPTY_PLACEHOLDER = " - ";

const MarkerDialog = ({
  visible,
  hideDialog,
  selectedMarker,
  userLocation,
}) => {
  const { styles } = useStyles(stylesheet);

  const selectedAlertCoordinate = {
    latitude: selectedMarker?.latitude,
    longitude: selectedMarker?.longitude,
  };

  const FULL_NAME = `${selectedMarker?.USER?.first_name} ${selectedMarker?.USER?.last_name}`;
  const name = useMemo(
    () =>
      selectedMarker?.USER?.first_name || selectedMarker?.USER?.last_name
        ? FULL_NAME
        : EMPTY_PLACEHOLDER,
    [selectedMarker?.USER?.first_name, selectedMarker?.USER?.last_name]
  );

  const distanceGap = useMemo(
    () =>
      selectedAlertCoordinate
        ? getDistanceGap(userLocation, selectedAlertCoordinate)
        : EMPTY_PLACEHOLDER,
    [userLocation, selectedAlertCoordinate]
  );

  const timeGap = useMemo(
    () =>
      selectedMarker?.date
        ? getTimeGap(selectedMarker?.date)
        : EMPTY_PLACEHOLDER,
    [selectedMarker?.date]
  );

  const dateRequested = useMemo(
    () =>
      selectedMarker?.date
        ? moment(selectedMarker?.date).format("LL")
        : EMPTY_PLACEHOLDER,
    [selectedMarker?.date]
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
            label="Bystander"
            value={name}
            iconBackgroundColor="#FBF2DD"
            iconColor="#D2BD84"
          />

          <InfoField
            icon="map-pin"
            label="Distance"
            value={distanceGap}
            iconBackgroundColor="#c3ffcc"
            iconColor="#53a661"
          />

          <InfoField
            icon="clock"
            label="Time Requested"
            value={timeGap}
            iconBackgroundColor="#D9E8FE"
            iconColor="#688CA9"
          />
          <InfoField
            icon="calendar"
            label="Date Requested"
            value={dateRequested}
            iconBackgroundColor="#FFD8CC"
            iconColor="#BB655D"
          />
          <InfoField
            icon="calendar"
            label="Status"
            value={selectedMarker?.status}
            iconBackgroundColor="#dddae4"
            iconColor="#7A288A"
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

export default MarkerDialog;

const stylesheet = createStyleSheet((theme) => ({
  title: {
    fontWeight: "bold",
    fontSize: theme.fontSize.lg,
  },
  infoFieldsContainer: {
    marginTop: theme.spacing.xxs,
    rowGap: theme.spacing.xs,
  },
}));
