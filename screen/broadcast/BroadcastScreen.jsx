import { View, FlatList, StyleSheet, RefreshControl } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState, useCallback } from "react";

import ListItem from "../../components/ui/ListItem";
import DistanceIcon from "../../components/common/DistanceIcon";
import { getTimeGap, getDistanceGap } from "../../utils/dateAndDistanceGap";
import NextActionIcon from "../../components/common/NextActionIcon";
import useLocation from "../../hooks/useLocation";

const BroadcastScreen = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const dataSize = data?.length > 0 ? data?.length : 0;

  //location of the user of the device
  const { userLocation } = useLocation();

  //For refreshing the list functionality
  const [refreshing, setRefreshing] = useState(false);
  //!sample only
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      fetchEmergencyAlerts();
      setRefreshing(false);
    }, 2000);
  }, []);

  //first screen load
  //fetch emergency alerts
  useEffect(() => {
    //!sample
    fetchEmergencyAlerts();
  }, []);

  const fetchEmergencyAlerts = async () => {
    //fetch data
    setData(EmergencyAlertsDataSample); //!just change this
  };

  const Header = ({ count }) => {
    return (
      <View
        style={[
          styles.header,
          { marginVertical: theme.margin.heading.vertical },
        ]}
      >
        <Text variant="titleMedium">EMERGENCY ALERTS</Text>
        <View
          style={[
            styles.countContainer,
            {
              backgroundColor: theme.colors.primary,
              borderRadius: theme.borderRadius.full,
            },
          ]}
        >
          <Text variant="labelSmall" style={{ color: theme.colors.onPrimary }}>
            {count}
          </Text>
        </View>
      </View>
    );
  };

  const renderEmergencyAlertsItem = ({ item }) => (
    <ListItem
      key={item.id}
      title={`${item.first_name} ${item.last_name}`}
      titleSize={14}
      subTitle={getTimeGap(item.createdAt)}
      desc={item.address}
      descSize={11}
      onPress={() =>
        navigation.navigate("Mapview", {
          intialCoordinate: item.coordinate,
          selectedEmergencyAlertId: item.id,
        })
      }
      renderIcon={() => (
        <DistanceIcon
          distance={getDistanceGap(userLocation, item.coordinate)}
          status={item.condition}
        />
      )}
      renderActionIcon={() => <NextActionIcon />}
    />
  );

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={renderEmergencyAlertsItem}
      ListHeaderComponent={<Header count={dataSize} />}
      ItemSeparatorComponent={() => <View style={{ height: 6 }} />}
      contentContainerStyle={{
        paddingVertical: theme.padding.body.vertical,
        paddingHorizontal: theme.padding.body.horizontal,
      }}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor="#F8852D"
        />
      }
    />
  );
};

export default BroadcastScreen;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  countContainer: {
    height: 24,
    width: 24,
    marginEnd: 6,
    alignItems: "center",
    justifyContent: "center",
  },
});

//Temporary data
//!remove this after applying fetching
const EmergencyAlertsDataSample = [
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
