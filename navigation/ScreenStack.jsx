import { createStackNavigator } from "@react-navigation/stack";

import NotificationScreen from "../screen/home/NotificationScreen";
import StartingScreen from "../screen/auth/StartingScreen";
import LoginScreen from "../screen/auth/LoginScreen";
import SignupScreen from "../screen/auth/SignupScreen";
import SuccessConfirmation from "../screen/auth/SuccessConfirmation";
import ForgotPassword from "../screen/auth/ForgotPassword";
import TokenVerification from "../screen/auth/TokenVerification";
import ResetPassword from "../screen/auth/ResetPassword";

const Stack = createStackNavigator();

//Screens for authenticated users
export const SignedOutStack = (
  <>
    <Stack.Screen
      name="StartingScreen"
      component={StartingScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Login"
      component={LoginScreen}
      options={{ headerTitle: "" }}
    />
    <Stack.Screen
      name="TokenVerification"
      component={TokenVerification}
      options={{ headerTitle: "" }}
    />
    <Stack.Screen
      name="ResetPassword"
      component={ResetPassword}
      options={{ headerTitle: "" }}
    />
    <Stack.Screen
      name="Signup"
      component={SignupScreen}
      options={{ headerTitle: "Register" }}
    />
    <Stack.Screen
      name="SuccessConfirmation"
      component={SuccessConfirmation}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="ForgotPassword"
      component={ForgotPassword}
      options={{ headerTitle: "" }}
    />
  </>
);

//Screens for unauthenticated users
export const SignedInStack = (
  <>
    <Stack.Screen name="Notification" component={NotificationScreen} />
  </>
);
