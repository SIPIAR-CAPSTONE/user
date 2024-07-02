import "expo-dev-client";
import "react-native-gesture-handler";
import { PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
// import {
//   createStackNavigator,
//   CardStyleInterpolators,
// } from "@react-navigation/stack";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { lightTheme, darkTheme } from "./utils/theme";
import { SignedInStack, SignedOutStack } from "./navigation/ScreenStack";
import CircularIcon from "./components/ui/CircularIcon";
import useStore from "./zustand/useStore";

const Stack = createNativeStackNavigator();

export default function App() {
  const userToken = useStore((state) => state.userToken);
  const currentThemeStatus = useStore((state) => state.currentThemeStatus);
  const setThemeStatus = useStore((state) => state.setThemeStatus);
  const selectedTheme = currentThemeStatus == "light" ? lightTheme : darkTheme;

  useEffect(() => {
    const initThemeCheck = async () => {
      setThemeStatus(await AsyncStorage.getItem("theme"));
    };

    initThemeCheck();
  }, []);

  /*
   *
   *
   * Native Stack Navigator Default Screen Configuration
   *
   */

  // Add a default header to all screens
  const screenOptions = ({ navigation }) => ({
    presentation: "containedTransparentModal",
    animation: "fade",
    contentStyle: { backgroundColor: selectedTheme.colors.background },
    headerStyle: { backgroundColor: selectedTheme.colors.background },
    headerShadowVisible: false,
    headerTitleAlign: "center",
    headerTitleStyle: {
      fontWeight: "bold",
      color: selectedTheme.colors.typography.primary,
    },
    // headerLeftContainerStyle: { marginStart: 14 },
    headerLeft: () => (
      <CircularIcon
        name="arrow-back"
        pressable
        onPress={() => navigation.goBack()}
      />
    ),
  });

  return (
    <PaperProvider theme={selectedTheme}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={screenOptions}>
          {!userToken ? SignedInStack : SignedOutStack}
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
