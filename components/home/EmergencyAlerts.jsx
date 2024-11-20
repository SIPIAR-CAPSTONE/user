import { View } from 'react-native';
import { Button as NPButton, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import ListItem from '../ui/ListItem';
import DistanceIcon from '../common/DistanceIcon';
import NextActionIcon from '../common/NextActionIcon';
import { getDistanceGap, getTimeGap } from '../../utils/calculateGap';
import useLocation from '../../hooks/useLocation';
import { createStyleSheet, useStyles } from '../../hooks/useStyles';
import { supabase } from '../../utils/supabase/config';
import { useEffect, useState, useCallback } from 'react';

const EmergencyAlerts = () => {
  const navigation = useNavigation();
  const { styles } = useStyles(stylesheet);

  const { userLocation } = useLocation();
  const [realTime, setRealTime] = useState([]);

  useEffect(() => {
    const channels = supabase
      .channel('broadcast-all-channel')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'broadcast' },
        async (payload) => {
          console.log('Change received!', payload.new);

          const { data: userData, error } = await supabase
            .from('bystander')
            .select('first_name, last_name')
            .eq('id', payload.new.user_id)
            .single();

          if (!error) {
            setRealTime(prevState => [...prevState, { ...payload.new, userData }]);
          } else {
            console.error('Error fetching user name:', error);
          }
        }
      )
      .subscribe();

    return () => {
      channels.unsubscribe();
    };
  }, []);

  const EmergencyAlertsList = realTime.map((item) => {
    const id = item.broadcast_id;
    const userFullName = `${item.userData.first_name} ${item.userData.last_name}`;
    const distanceGap = getDistanceGap(userLocation, { latitude: item.latitude, longitude: item.longitude });
    const timeGap = getTimeGap(item.created_at);

    return (
      <ListItem
        key={id}
        title={userFullName}
        titleSize={14}
        subTitle={timeGap}
        desc={item.address}
        onPress={() =>
          navigation.navigate('Mapview', {
            initialCoordinate: item.coordinate,
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
        <NPButton
          mode="text"
          compact
          style={styles.seeAllButton}
          onPress={() => navigation.navigate('BroadcastScreen')}
        >
          See all
        </NPButton>
      </View>
      <View style={styles.list}>{EmergencyAlertsList}</View>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
