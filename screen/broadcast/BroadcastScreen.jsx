import { View, FlatList, RefreshControl } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useState, useCallback, useRef, lazy } from "react";

import useLocation from "../../hooks/useLocation";
import ListItem from "../../components/ui/ListItem";
import DistanceIcon from "../../components/common/DistanceIcon";
import { getDistanceGap, getTimeGap } from "../../utils/calculateGap";
import NextActionIcon from "../../components/common/NextActionIcon";
import { createStyleSheet, useStyles } from "../../hooks/useStyles";
import AppBar from "../../components/ui/AppBar";
import CircularIcon from "../../components/ui/CircularIcon";
import Header from "../../components/broadcast/Header";
import AppBarTitle from "../../components/ui/AppBarTitle";
import useBroadcast from "../../hooks/useBroadcast";
import EmptyAlertsPlaceHolder from "../../components/broadcast/EmptyAlertsPlaceholder";
import { ActivityIndicator } from "react-native-paper";
const NotInternetAlert = lazy(() =>
  import("../../components/common/NoInternetAlert")
);
const SortBottomSheet = lazy(() =>
  import("../../components/broadcast/SortBottomSheet")
);

const BroadcastScreen = () => {
  const { userLocation } = useLocation();
  const { styles } = useStyles(stylesheet);
  const navigation = useNavigation();
  const bottomSheetRef = useRef(null);
  const [showSortSheet, setShowSortSheet] = useState(false);
  const [selectedSort, setSelectedSort] = useState("timeRequested");
  const [refreshing, setRefreshing] = useState(false);
  const { emergencyAlerts, emergencyAlertsLength, refecthAlerts, loading } =
    useBroadcast();
  const closeSortSheet = () => setShowSortSheet(false);

  const sortedAlerts = emergencyAlerts.sort((a, b) => {
    if (selectedSort === "name") {
      return a.USER.first_name.localeCompare(b.USER.first_name);
    } else if (selectedSort === "address") {
      return String(a.address).localeCompare(b.address);
    } else if (selectedSort === "timeRequested") {
      return String(b.date).localeCompare(a.date);
    } else if (selectedSort === "distance") {
      //split to remove the distance unit like m and km
      const bDistance = getDistanceGap(userLocation, {
        latitude: b.latitude,
        longitude: b.longitude,
      }).split(" ")[0];
      const aDistance = getDistanceGap(userLocation, {
        latitude: a.latitude,
        longitude: a.longitude,
      }).split(" ")[0];
      return aDistance - bDistance;
    }
  });

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refecthAlerts();

    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  const renderAlertItem = ({ item }) => {
    const userFullName = `${item?.USER?.first_name} ${item?.USER?.last_name}`;
    const alertCoordinate = {
      latitude: item.latitude,
      longitude: item.longitude,
    };
    const distanceGap = getDistanceGap(userLocation, alertCoordinate);
    const timeGap = getTimeGap(item.date);

    return (
      <ListItem
        key={item.broadcast_id}
        title={item.address}
        titleSize={14}
        subTitle={timeGap}
        desc={userFullName}
        descSize={11}
        onPress={() =>
          navigation.navigate("Mapview", {
            initialCoordinate: alertCoordinate,
            selectedAlertId: item.broadcast_id,
          })
        }
        renderTrailerIcon={() => <DistanceIcon distance={distanceGap} />}
        trailerIconStyle={{ width: 47 }}
        renderActionIcon={() => <NextActionIcon />}
        actionIconStyle={{ marginStart: 75 }}
      />
    );
  };

  //* when screen is focus refecth alerts
  useFocusEffect(
    useCallback(() => {
      refecthAlerts();
    }, [])
  );

  return (
    <>
      <AppBar>
        <AppBarTitle>Broadcast</AppBarTitle>
        <CircularIcon
          name="filter"
          onPress={() => setShowSortSheet((prevState) => !prevState)}
        />
      </AppBar>
      <FlatList
        data={sortedAlerts}
        keyExtractor={(item) => item.broadcast_id}
        renderItem={renderAlertItem}
        ListHeaderComponent={<Header count={emergencyAlertsLength} />}
        ItemSeparatorComponent={() => <View style={{ height: 6 }} />}
        contentContainerStyle={styles.contentContainer}
        ListEmptyComponent={
          loading ? (
            <ActivityIndicator style={styles.loading} />
          ) : (
            <EmptyAlertsPlaceHolder />
          )
        }
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#F8852D"
          />
        }
      />

      <SortBottomSheet
        ref={bottomSheetRef}
        isVisible={showSortSheet}
        close={closeSortSheet}
        selectedOption={selectedSort}
        setSelectedOption={setSelectedSort}
      />
      <NotInternetAlert />
    </>
  );
};

export default BroadcastScreen;

const stylesheet = createStyleSheet((theme) => ({
  contentContainer: {
    paddingHorizontal: theme.spacing.base,
  },
  loading: {
    marginTop: 100,
  },
}));
