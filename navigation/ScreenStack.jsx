import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NotificationScreen from "../screen/home/NotificationScreen";
import StartingScreen from "../screen/auth/StartingScreen";
import LoginScreen from "../screen/auth/LoginScreen";
import SignupScreen from "../screen/auth/SignupScreen";
import ForgotPasswordScreen from "../screen/auth/ForgotPasswordScreen";
import TokenVerification from "../screen/auth/TokenVerification";
import ResetPasswordScreen from "../screen/auth/ResetPasswordScreen";
import Tabs from "./BottomTab";
import AccountVerificationScreen from "../screen/profile/accountVerification/AccountVerificationScreen";
import DeleteAccountScreen from "../screen/profile/setting/DeleteAccountScreen";
import EditProfileScreen from "../screen/profile/myAccount/EditProfileScreen";
import MyAccountScreen from "../screen/profile/myAccount/MyAccountScreen";
import PrivacyAndPolicyScreen from "../screen/profile/privacyPolicy/PrivacyAndPolicyScreen";
import TermsAndConditionsScreen from "../screen/profile/termsAndCondition/TermsAndConditionScreen";
import SettingsScreen from "../screen/profile/setting/SettingsScreen";
import MapviewScreen from "../screen/broadcast/MapviewScreen";
import EditPasswordScreen from "../screen/profile/myAccount/EditPasswordScreen";
import LearnCprScreen from "../screen/learn/LearnCprScreen";
import LearnCourseScreen from "../screen/learn/LearnCourseScreen";
import VideoPlayerScreen from "../screen/learn/VideoPlayerScreen";
import LearnCprScoreScreen from "../screen/learn/LearnCprScoreScreen";
import CprScreen from "../screen/CPR/CprScreen";
import DocumentMaterialScreen from "../screen/learn/DocumentMaterialScreen";
import ReportIssueScreen from "../screen/profile/setting/ReportIssueScreen";

const Stack = createNativeStackNavigator();

/**
 * SignedOutStack: A stack of screens that are displayed to unauthenticated users.
 */
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
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="ForgotPassword"
      component={ForgotPasswordScreen}
      options={{ headerTitle: "" }}
    />
  </>
);

/**
 * SignedInStack: A stack of screens that are displayed to authenticated users.
 */
export const SignedInStack = (
  <>
    <Stack.Screen
      name="Tabs"
      component={Tabs}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Notification"
      options={{ headerShown: false }}
      component={NotificationScreen}
    />
    <Stack.Screen
      name="Mapview"
      options={{ headerTitle: "Map View" }}
      component={MapviewScreen}
    />
    <Stack.Screen
      name="MyAccount"
      options={{ headerShown: false }}
      component={MyAccountScreen}
    />
    <Stack.Screen
      name="EditProfile"
      options={{ headerShown: false }}
      component={EditProfileScreen}
    />
    <Stack.Screen
      name="EditPassword"
      options={{ headerShown: false }}
      component={EditPasswordScreen}
    />
    <Stack.Screen
      name="AccountVerification"
      options={{ headerShown: false }}
      component={AccountVerificationScreen}
    />
    <Stack.Screen
      name="Settings"
      options={{ headerShown: false }}
      component={SettingsScreen}
    />
    <Stack.Screen
      name="DeleteAccount"
      options={{ headerShown: false }}
      component={DeleteAccountScreen}
    />
    <Stack.Screen
      name="ReportIssue"
      options={{ headerShown: false }}
      component={ReportIssueScreen}
    />
    <Stack.Screen
      name="TermsAndConditions"
      options={{ headerShown: false }}
      component={TermsAndConditionsScreen}
    />
    <Stack.Screen
      name="PrivacyPolicy"
      options={{ headerShown: false }}
      component={PrivacyAndPolicyScreen}
    />
    <Stack.Screen
      name="Cpr"
      component={CprScreen}
      options={{
        headerShown: false,
        orientation: "landscape",
      }}
    />
    <Stack.Screen
      name="LearnCpr"
      component={LearnCprScreen}
      options={{
        headerShown: false,
        orientation: "landscape",
      }}
    />
    <Stack.Screen
      name="LearnCprScore"
      options={{ headerShown: false }}
      component={LearnCprScoreScreen}
    />
    <Stack.Screen name="LearnCourse" component={LearnCourseScreen} />
    <Stack.Screen
      name="VideoPlayer"
      options={{ orientation: "landscape" }}
      component={VideoPlayerScreen}
    />
    <Stack.Screen
      name="DocumentMaterial"
      options={{ headerTitle: " " }}
      component={DocumentMaterialScreen}
    />
  </>
);
