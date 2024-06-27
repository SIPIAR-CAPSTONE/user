import { createStackNavigator } from "@react-navigation/stack";

import NotificationScreen from "../screen/home/NotificationScreen";
import StartingScreen from "../screen/auth/StartingScreen";
import LoginScreen from "../screen/auth/LoginScreen";
import SignupScreen from "../screen/auth/SignupScreen";
import ForgotPasswordScreen from "../screen/auth/ForgotPasswordScreen";
import OtpVerificationScreen from "../screen/auth/OtpVerificationScreen";
import ResetPasswordScreen from "../screen/auth/ResetPasswordScreen";
import SuccessConfirmationScreen from "../screen/auth/SuccessConfirmationScreen";
import Tabs from "./BottomTab";

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
      name="OtpVerification"
      component={OtpVerificationScreen}
      options={{ headerTitle: "" }}
    />
    <Stack.Screen
      name="ResetPassword"
      component={ResetPasswordScreen}
      options={{ headerTitle: "" }}
    />
    <Stack.Screen
      name="Signup"
      component={SignupScreen}
      options={{ headerTitle: "Register" }}
    />
    <Stack.Screen
      name="SuccessConfirmation"
      component={SuccessConfirmationScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="ForgotPassword"
      component={ForgotPasswordScreen}
      options={{ headerTitle: "" }}
    />
  </>
);

//Screens for unauthenticated users
export const SignedInStack = (
  <>
    <Stack.Screen
      name="Tabs"
      component={Tabs}
      options={{ headerShown: false }}
    />
    <Stack.Screen name="Notification" component={NotificationScreen} />
  </>
);
