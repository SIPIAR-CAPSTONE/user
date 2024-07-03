import { createNativeStackNavigator } from "@react-navigation/native-stack";

import NotificationScreen from "../screen/home/NotificationScreen";
import StartingScreen from "../screen/auth/StartingScreen";
import LoginScreen from "../screen/auth/LoginScreen";
import SignupScreen from "../screen/auth/SignupScreen";
import ForgotPasswordScreen from "../screen/auth/ForgotPasswordScreen";
import TokenVerification from "../screen/auth/TokenVerification";
import ResetPasswordScreen from "../screen/auth/ResetPasswordScreen";
import SuccessConfirmationScreen from "../screen/auth/SuccessConfirmationScreen";
import Tabs from "./BottomTab";
import AccountVerificationScreen from "../screen/profile/accountVerification/AccountVerificationScreen";
import SelectAnIdScreen from "../screen/profile/accountVerification/SelectAnIdScreen";
import DeleteAccountScreen from "../screen/profile/setting/DeleteAccountScreen";
import EditProfileScreen from "../screen/profile/myAccount/EditProfileScreen";
import MyAccountScreen from "../screen/profile/myAccount/MyAccountScreen";
import PrivacyAndPolicyScreen from "../screen/profile/PrivacyPolicy/PrivacyAndPolicyScreen";
import TermsAndConditionsScreen from "../screen/profile/termsAndCondition/TermsAndConditionScreen";
import SettingScreen from "../screen/profile/setting/SettingScreen";
import MapviewScreen from "../screen/broadcast/MapviewScreen";

const Stack = createNativeStackNavigator();

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
      component={ResetPasswordScreen}
      options={{ headerLeft: () => null, headerTitle: "" }}
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
    <Stack.Screen
      name="Mapview"
      options={{ headerTitle: "Map View" }}
      component={MapviewScreen}
    />
    <Stack.Screen
      name="MyAccount"
      options={{ headerTitle: "My Account" }}
      component={MyAccountScreen}
    />
    <Stack.Screen
      name="EditProfile"
      options={{ headerTitle: "Edit Profile" }}
      component={EditProfileScreen}
    />
    <Stack.Screen
      name="AccountVerification"
      options={{ headerTitle: "Account Verification" }}
      component={AccountVerificationScreen}
    />
    <Stack.Screen
      name="SelectAnId"
      options={{
        headerTitle: "Select an ID",
        presentation: "transparentModal",
        contentStyle: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
      }}
      component={SelectAnIdScreen}
    />
    <Stack.Screen name="Setting" component={SettingScreen} />
    <Stack.Screen
      name="DeleteAccount"
      options={{ headerTitle: "Delete Account" }}
      component={DeleteAccountScreen}
    />
    <Stack.Screen
      name="TermsAndConditions"
      options={{ headerTitle: "Terms and Condition" }}
      component={TermsAndConditionsScreen}
    />
    <Stack.Screen
      name="PrivacyPolicy"
      options={{ headerTitle: "Privacy and Policy" }}
      component={PrivacyAndPolicyScreen}
    />
  </>
);
