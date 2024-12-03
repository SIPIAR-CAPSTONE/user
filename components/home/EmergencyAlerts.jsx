import { ToastAndroid, View } from "react-native";
import { Button as NPButton, Text } from "react-native-paper";
import { useEffect, useMemo, useState } from "react";
import { useNavigation } from "@react-navigation/native";

import ListItem from "../ui/ListItem";
import DistanceIcon from "../common/DistanceIcon";
import NextActionIcon from "../common/NextActionIcon";
import { getDistanceGap, getTimeGap } from "../../utils/calculateGap";
import useLocation from "../../hooks/useLocation";
import { createStyleSheet, useStyles } from "../../hooks/useStyles";
import { supabase } from "../../utils/supabase/config";
import EmptyLabel from "../ui/EmptyLabel";

const ALERTS_LIMIT = 5;

const EmergencyAlerts = () => {
  const navigation = useNavigation();
  const { styles } = useStyles(stylesheet);
  const { userLocation } = useLocation();
  const [emergencyAlerts, setEmergencyAlerts] = useState([]);
  const recentEmergencyAlerts = useMemo(
    () =>
      emergencyAlerts
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        .slice(0, ALERTS_LIMIT),
    [emergencyAlerts]
  );

  useEffect(() => {
    const channels = supabase
      .channel("broadcast-all-channel")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "broadcast" },
        async (payload) => {
          const { data: user, error } = await supabase
            .from("bystander")
            .select("first_name, last_name")
            .eq("id", payload.new.user_id)
            .single();

          if (error) {
            ToastAndroid.show(
              `Error fetching user name: ${error.message}`,
              ToastAndroid.SHORT
            );
          }

          if (user) {
            const newEmergencyAlert = { ...payload.new, user };

            setEmergencyAlerts((prevEmergencyAlerts) => [
              ...prevEmergencyAlerts,
              newEmergencyAlert,
            ]);
          }
        }
      )
      .subscribe();

    return () => {
      channels.unsubscribe();
    };
  }, []);

  const EmergencyAlertsList = recentEmergencyAlerts.map((item) => {
    const id = item?.broadcast_id;
    const userFullName = `${item?.user?.first_name} ${item?.user?.last_name}`;
    const coordinate = {
      latitude: item?.latitude,
      longitude: item?.longitude,
    };
    const distanceGap = getDistanceGap(userLocation, coordinate);
    const timeGap = getTimeGap(item?.created_at);

    return (
      <ListItem
        key={id}
        title={userFullName}
        titleSize={14}
        subTitle={timeGap}
        desc={item.address}
        onPress={() =>
          navigation.navigate("Mapview", {
            initialCoordinate: coordinate,
            selectedAlertId: item.id,
          })
        }
        renderIcon={() => (
          <DistanceIcon distance={distanceGap} status={item.condition} />
        )}
        renderActionIcon={() => <NextActionIcon />}
      />
    );
  });

  return (
    <View style={styles.emergencyAlerts}>
      <View style={styles.header}>
        <Text variant="titleMedium" style={styles.listLabel}>
          Recent Emergency Alerts
        </Text>
        {EmergencyAlertsList && EmergencyAlertsList.length > 0 && (
          <NPButton
            mode="text"
            rippleColor={"rgba(255,255,255,50)"}
            compact
            style={styles.seeAllButton}
            onPress={() => navigation.navigate("BroadcastScreen")}
          >
            See all
          </NPButton>
        )}
      </View>
      {EmergencyAlertsList && EmergencyAlertsList.length > 0 ? (
        <View style={styles.list}>{EmergencyAlertsList}</View>
      ) : (
        <EmptyLabel label="No Recent Alerts" />
      )}
    </View>
  );
};

export default EmergencyAlerts;

const stylesheet = createStyleSheet((theme) => ({
  emergencyAlerts: {
    marginTop: 10,
    paddingHorizontal: theme.spacing.base,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  listLabel: {
    marginVertical: theme.spacing.base,
  },
  seeAllButton: {
    borderRadius: 12,
  },
  list: {
    rowGap: 10,
  },
}));
