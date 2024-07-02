import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

import MarkerDialog from "../../components/broadcast/MarkerDialog";
import useLocation from "../../hooks/useLocation";

const MapviewScreen = ({ route }) => {
  const { intialCoordinate, selectedEmergencyAlertId } = route.params;
  //list of emergency alerts that will be use in the mapview in a form of marker
  const [emergencyAlerts, setEmergencyAlerts] = useState(fetchedData);
  //region where current screen is position or located
  //it also serve as initial region or position when mapview first reload
  const [region, setRegion] = useState({
    latitude: Number(intialCoordinate.latitude),
    longitude: Number(intialCoordinate.longitude),
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  //location of the user of the device
  const { userLocation } = useLocation();

  //states that handle if markerDialog is visible or not
  const [visible, setVisible] = useState(false);
  //states that holds the values of the selectedMarker
  //these values will be used in markerDialog
  const [selectedMarker, setSelectedMarker] = useState(null);
  const showDialog = (marker) => {
    setSelectedMarker(marker);
    setVisible(true);
  };

  const hideDialog = () => {
    setVisible(false);
    setSelectedMarker(null);
  };

  //generate markers for each emergency alerts
  const EmergencyAlertMarkers = emergencyAlerts.map((emergencyAlert) => {
    const pinColor =
      emergencyAlert.id == selectedEmergencyAlertId ? "green" : "red";
    return (
      <Marker
        key={emergencyAlert.id}
        onPress={() => showDialog(emergencyAlert)}
        coordinate={{ ...emergencyAlert.coordinate }}
        pinColor={pinColor}
      ></Marker>
    );
  });

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        region={region}
        showsUserLocation={true}
        showsMyLocationButton={true}
        followsUserLocation={true}
        showsScale={true}
        showsBuildings
        showsCompass
      >
        {EmergencyAlertMarkers}
      </MapView>

      <MarkerDialog
        visible={visible}
        hideDialog={hideDialog}
        selectedMarker={selectedMarker}
        userLocation={userLocation}
      />
    </View>
  );
};

export default MapviewScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});

//!sample data
//!remove this later
const fetchedData = [
  {
    id: 1,
    distance: 500,
    createdAt: "2024-07-01T05:22:31.269Z",
    address: "Elmwood Park, 24 Oak Street",
    condition: true,
    first_name: "Alex",
    last_name: "Smith",
    coordinate: { latitude: 8.424359, longitude: 124.637703 },
  },
  {
    id: 2,
    distance: 520,
    createdAt: "2024-07-01T07:12:45.569Z",
    address: "Greenwood, 18 Pine Avenue",
    condition: true,
    first_name: "Maria",
    last_name: "Johnson",
    coordinate: { latitude: 8.43456, longitude: 124.64 },
  },
  {
    id: 3,
    distance: 480,
    createdAt: "2024-07-01T08:25:10.849Z",
    address: "Riverside, 35 Maple Street",
    condition: true,
    first_name: "John",
    last_name: "Doe",
    coordinate: { latitude: 8.41, longitude: 124.63 },
  },
  {
    id: 4,
    distance: 510,
    createdAt: "2024-07-01T09:45:23.123Z",
    address: "Lakeside, 22 Willow Road",
    condition: false,
    first_name: "Emma",
    last_name: "Brown",
    coordinate: { latitude: 8.42, longitude: 124.62 },
  },
  {
    id: 5,
    distance: 530,
    createdAt: "2024-07-01T11:15:33.647Z",
    address: "Springfield, 40 Cedar Lane",
    condition: true,
    first_name: "Michael",
    last_name: "Wilson",
    coordinate: { latitude: 8.444444, longitude: 124.65 },
  },
  {
    id: 6,
    distance: 470,
    createdAt: "2024-07-01T12:30:49.512Z",
    address: "Hillcrest, 50 Elm Street",
    condition: false,
    first_name: "Sophia",
    last_name: "Lee",
    coordinate: { latitude: 8.46, longitude: 124.67 },
  },
];
