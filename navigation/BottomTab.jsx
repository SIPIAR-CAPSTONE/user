import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "../screen/home/HomeScreen";
import BroadcastScreen from "../screen/broadcast/BroadcastScreen";
import CprScreen from "../screen/CPR/CprScreen";
import LearnScreen from "../screen/learn/LearnScreen";
import ProfileScreen from "../screen/profile/ProfileScreen";

import CircularIcon from "../components/ui/CircularIcon";
import LogoTitle from "../components/navigation/LogoTitle";
import TabBarIcon from "../components/navigation/TabBarIcon";
import CprTabBarIcon from "../components/navigation/CprTabBarIcon";
import { useStyles, createStyleSheet } from "../hooks/useStyles";

const Tab = createBottomTabNavigator();

const Tabs = ({ navigation }) => {
  const { styles, theme } = useStyles(stylesheet);

  const screenOptions = {
    tabBarStyle: styles.tabBar,
    tabBarActiveTintColor: theme.colors.primary,
    tabBarLabelStyle: styles.tabBarLabel,
    headerStyle: styles.header,
    headerTitleStyle: styles.headerTitle,
    headerRightContainerStyle: styles.headerRightContainer,
  };

  return (
    <Tab.Navigator
      sceneContainerStyle={styles.sceneContainer}
      screenOptions={screenOptions}
    >
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          headerTitle: (props) => <LogoTitle {...props} />,
          headerRight: () => (
            <CircularIcon
              name="notifications"
              onPress={() => navigation.navigate("Notification")}
            />
          ),
        }}
      />
      <Tab.Screen
        name="BroadcastScreen"
        component={BroadcastScreen}
        options={{
          title: "Broadcast",
          tabBarIcon: ({ color }) => <TabBarIcon name="bell" color={color} />,
          headerRight: () => (
            <CircularIcon name="filter" pressable onPress={() => {}} />
          ),
        }}
      />
      <Tab.Screen
        name="CPRScreen"
        component={CprScreen}
        options={{
          title: "",
          tabBarIcon: () => <CprTabBarIcon />,
        }}
      />
      <Tab.Screen
        name="LearnScreen"
        component={LearnScreen}
        options={{
          title: "Learn",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="book-open" color={color} />
          ),
          headerRight: () => (
            <CircularIcon name="search" pressable onPress={() => {}} />
          ),
        }}
      />
      <Tab.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          headerTitleAlign: "center",
          title: "Profile",
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;

const stylesheet = createStyleSheet((theme) => ({
  sceneContainer: {
    backgroundColor: theme.colors.background,
  },
  tabBar: {
    height: 46,
    backgroundColor: theme.colors.background,
    paddingTop: 2,
  },
  tabBarLabel: {
    fontSize: 12,
    fontWeight: "500",
    paddingBottom: 2,
  },
  header: {
    elevation: 0,
    backgroundColor: theme.colors.background,
  },
  headerTitle: {
    fontWeight: "bold",
    fontSize: 22,
    color: theme.colors.typography.primary,
  },
  headerRightContainer: {
    marginEnd: 14,
  },
}));
