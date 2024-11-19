import { lazy } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Tabs from "./BottomTab";
import StartingScreen from "../screen/auth/StartingScreen";
const NotificationScreen = lazy(() =>
  import("../screen/home/NotificationScreen")
);
const LoginScreen = lazy(() => import("../screen/auth/LoginScreen"));
const SignupScreen = lazy(() => import("../screen/auth/SignupScreen"));
const ForgotPasswordScreen = lazy(() =>
  import("../screen/auth/ForgotPasswordScreen")
);
const TokenVerification = lazy(() =>
  import("../screen/auth/TokenVerification")
);
const ResetPasswordScreen = lazy(() =>
  import("../screen/auth/ResetPasswordScreen")
);
const AccountVerificationScreen = lazy(() =>
  import("../screen/profile/accountVerification/AccountVerificationScreen")
);
const EditProfileScreen = lazy(() =>
  import("../screen/profile/myAccount/EditProfileScreen")
);
const MyAccountScreen = lazy(() =>
  import("../screen/profile/myAccount/MyAccountScreen")
);
const PrivacyAndPolicyScreen = lazy(() =>
  import("../screen/profile/privacyPolicy/PrivacyAndPolicyScreen")
);
const TermsAndConditionsScreen = lazy(() =>
  import("../screen/profile/termsAndCondition/TermsAndConditionScreen")
);
const SettingsScreen = lazy(() =>
  import("../screen/profile/setting/SettingsScreen")
);
const MapviewScreen = lazy(() => import("../screen/broadcast/MapviewScreen"));
const EditPasswordScreen = lazy(() =>
  import("../screen/profile/myAccount/EditPasswordScreen")
);
const LearnCprScreen = lazy(() => import("../screen/learn/LearnCprScreen"));
const LearnCourseScreen = lazy(() =>
  import("../screen/learn/LearnCourseScreen")
);
const VideoPlayerScreen = lazy(() =>
  import("../screen/learn/VideoPlayerScreen")
);
const LearnCprScoreScreen = lazy(() =>
  import("../screen/learn/LearnCprScoreScreen")
);
const CprScreen = lazy(() => import("../screen/CPR/CprScreen"));
const DocumentMaterialScreen = lazy(() =>
  import("../screen/learn/DocumentMaterialScreen")
);
const ReportIssueScreen = lazy(() =>
  import("../screen/profile/setting/ReportIssueScreen")
);
const QuizScreen = lazy(() => import("../screen/learn/QuizScreen"));
const FinishedViewScreen = lazy(() =>
  import("../screen/learn/FinishedViewScreen")
);
const QuizScoreScreen = lazy(() => import("../screen/learn/QuizScoreScreen"));

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
    <Stack.Screen
      name="FinishedView"
      options={{ headerShown: false }}
      component={FinishedViewScreen}
    />
    <Stack.Screen
      name="Quiz"
      options={{ headerShown: false }}
      component={QuizScreen}
    />
    <Stack.Screen
      name="QuizScore"
      options={{ headerShown: false }}
      component={QuizScoreScreen}
    />
  </>
);
