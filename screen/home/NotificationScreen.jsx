import { Text } from "react-native-paper";
import { SectionList, View } from "react-native";

import CircularIcon from "../../components/ui/CircularIcon";
import ListItem from "../../components/ui/ListItem";
import { createStyleSheet, useStyles } from "../../hooks/useStyles";
import Layout from "../../components/common/Layout";
import AppBar from "../../components/ui/AppBar";
import { useNavigation } from "@react-navigation/native";

const NotificationScreen = () => {
  const navigation = useNavigation();
  const { styles } = useStyles(stylesheet);

  const renderItem = ({ item }) => (
    <ListItem
      size="large"
      renderIcon={() => (
        <CircularIcon name="notifications" variant="primary" size={14} />
      )}
      title={item.type}
      desc={item.desc}
    />
  );

  const renderSectionHeader = ({ section: { title } }) => (
    <Text variant="titleMedium" style={styles.header}>
      {title}
    </Text>
  );

  const CustomAppBar = () => (
    <AppBar>
      <CircularIcon
        name="arrow-back"    
        onPress={() => navigation.goBack()}
      />
      <Text style={styles.appBarTitle}>Notification</Text>
      <View style={{ width: 40 }} />
    </AppBar>
  );

  return (
    <Layout removeDefaultPaddingHorizontal AppbarComponent={CustomAppBar}>
      <SectionList
        sections={TEMP_NOTIF_DATA}
        contentContainerStyle={styles.notifications}
        keyExtractor={(item, index) => item + index}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
      />
    </Layout>
  );
};

export default NotificationScreen;

const stylesheet = createStyleSheet((theme) => ({
  appBarTitle: {
    fontSize: 23,
    fontWeight: "bold",
    color: theme.colors.text,
  },
  notifications: {
    paddingHorizontal: theme.spacing.base,
    paddingTop: theme.spacing.base,
  },
  header: {
    marginTop: theme.spacing.base,
    marginBottom: theme.spacing.xxs,
  },
}));

const TEMP_NOTIF_DATA = [
  {
    title: "Today",
    data: [
      {
        type: "Alert",
        desc: "Someone needs helps at Elmwood Park, 24 Oak Street",
      },
      {
        type: "Alert",
        desc: "Someone needs helps at Pine Hill Village, 5 Pinehurst Drive",
      },
    ],
  },
  {
    title: "Yesterday",
    data: [
      {
        type: "Alert",
        desc: "Someone needs helps at Sunset Bay, 36 Sunset Boulevard",
      },
      {
        type: "Alert",
        desc: "Someone needs helps at Abellanosa Cedar Valley, 8 Cedar Grove",
      },
      {
        type: "Alert",
        desc: "Someone needs helps at Maple Grove, 15 Maple Lane",
      },
      {
        type: "Alert",
        desc: "Someone needs helps at Brookside, 42 Brookview Road",
      },
    ],
  },
  {
    title: "Past",
    data: [
      {
        type: "Account",
        desc: "Account successfully verified ",
      },
      {
        type: "Greetings",
        desc: "Welcome to SIPIAR",
      },
    ],
  },
];
