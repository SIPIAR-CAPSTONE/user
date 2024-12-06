import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { useState } from "react";
import { StyleSheet, Image } from "react-native";

import MarkerDialog from "../../components/broadcast/MarkerDialog";
import useLocation from "../../hooks/useLocation";
import NotInternetAlert from "../../components/common/NoInternetAlert";
import useBroadcast from "../../hooks/useBroadcast";

const MapviewScreen = ({ route }) => {
  const { initialCoordinate, selectedAlertId } = route.params;

  const [region, setRegion] = useState({
    latitude: initialCoordinate?.latitude,
    longitude: initialCoordinate?.longitude,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const { emergencyAlerts } = useBroadcast();

  //location of the user of the device
  const { userLocation } = useLocation();
  const [selectedAlert, setSelectedAlert] = useState({});
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const showDialog = (alert) => {
    setIsDialogVisible(true);
    setSelectedAlert(alert);
  };

  const hideDialog = () => {
    setIsDialogVisible(false);
    setSelectedAlert(null);
  };

  const alertMarkers = emergencyAlerts.map((alert) => {
    return (
      <Marker
        key={alert.broadcast_id}
        onPress={() => showDialog(alert)}
        coordinate={{ latitude: alert.latitude, longitude: alert.longitude }}
      >
        {alert.broadcast_id === selectedAlertId ? (
          <Image
            source={require("../../assets/images/MapPinActive.png")}
            style={styles.pin}
          />
        ) : (
          <Image
            source={require("../../assets/images/MapPin.png")}
            style={styles.pin}
          />
        )}
      </Marker>
    );
  });

  return (
    <>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        region={region}
        showsUserLocation
        showsMyLocationButton
        followsUserLocation
        showsScale
        showsBuildings
        showsCompass
        showsTraffic
      >
        {alertMarkers}
      </MapView>
      {isDialogVisible && (
        <MarkerDialog
          visible={isDialogVisible}
          hideDialog={hideDialog}
          selectedMarker={selectedAlert}
          userLocation={userLocation}
        />
      )}
      <NotInternetAlert />
    </>
  );
};

export default MapviewScreen;

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
    flex: 1,
  },
  pin: {
    width: 40,
    height: 40,
  },
});
