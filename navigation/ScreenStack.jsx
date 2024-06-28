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
import AccountVerificationScreen from "../screen/profile/AccountVerificationScreen";
import DeleteAccountScreen from "../screen/profile/DeleteAccountScreen";
import EditProfileScreen from "../screen/profile/EditProfileScreen";
import MyAccountScreen from "../screen/profile/MyAccountScreen";
import PrivacyPolicyScreen from "../screen/profile/PrivacyAndPolicyScreen";
import TermsAndConditionsScreen from "../screen/profile/TermsAndConditionScreen";
import SettingScreen from "../screen/profile/SettingScreen";

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
    <Stack.Screen name="MyAccount" component={MyAccountScreen} />
    <Stack.Screen
      name="EditProfile"
      options={{ headerTitle: "Edit Profile" }}
      component={EditProfileScreen}
    />
    <Stack.Screen
      name="AccountVerification"
      component={AccountVerificationScreen}
    />
    <Stack.Screen name="Setting" component={SettingScreen} />
    <Stack.Screen name="DeleteAccount" component={DeleteAccountScreen} />
    <Stack.Screen
      name="TermsAndConditions"
      options={{ headerTitle: "Terms and Condition" }}
      component={TermsAndConditionsScreen}
    />
    <Stack.Screen
      name="PrivacyPolicy"
      options={{ headerTitle: "Privacy and Policy" }}
      component={PrivacyPolicyScreen}
    />
  </>
);
