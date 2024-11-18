import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "../screen/home/HomeScreen";
import BroadcastScreen from "../screen/broadcast/BroadcastScreen";
import CprInitialScreen from "../screen/CPR/CprIntialScreen";
import LearnScreen from "../screen/learn/LearnScreen";
import ProfileScreen from "../screen/profile/ProfileScreen";

import TabBarIcon from "../components/navigation/TabBarIcon";
import CprTabBarIcon from "../components/navigation/CprTabBarIcon";
import { useStyles, createStyleSheet } from "../hooks/useStyles";

const Tab = createBottomTabNavigator();

const Tabs = () => {
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
          headerShown: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />
      <Tab.Screen
        name="BroadcastScreen"
        component={BroadcastScreen}
        options={{
          title: "Broadcast",
          headerShown: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="bell" color={color} />,
        }}
      />
      <Tab.Screen
        name="CprInitialScreen"
        component={CprInitialScreen}
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
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="book-open" color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          headerShown: false,
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
    color: theme.colors.text,
  },
  headerRightContainer: {
    marginEnd: 14,
  },
}));
