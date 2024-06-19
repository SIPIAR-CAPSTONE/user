import { createStackNavigator } from "@react-navigation/stack";

import NotificationScreen from "../screen/home/NotificationScreen";
import StartingScreen from "../screen/StartingScreen";
import LoginScreen from "../screen/auth/LoginScreen";
import SignupScreen from "../screen/auth/SignupScreen";

const Stack = createStackNavigator();

//Screens for authenticated users
export const SignedOutStack = (
  <>
    <Stack.Screen
      name="StartingScreen"
      component={StartingScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Signup" component={SignupScreen} />
  </>
);

//Screens for unauthenticated users
export const SignedInStack = (
  <>
    <Stack.Screen name="Notification" component={NotificationScreen} />
  </>
);
