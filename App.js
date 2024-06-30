import "expo-dev-client";
import "react-native-gesture-handler";
import { PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import { useEffect } from "react";

import { lightTheme, darkTheme } from "./utils/theme";
import { SignedInStack, SignedOutStack } from "./navigation/ScreenStack";
import CircularIcon from "./components/ui/CircularIcon";
import useStore from "./zustand/useStore";

const Stack = createStackNavigator();

export default function App() {
  const isAuthenticated = true; //TODO: Replace with your actual authentication logic
  const initThemeStatus = useStore((state) => state.initThemeStatus);
  const currentThemeStatus = useStore((state) => state.currentThemeStatus);
  const selectedTheme = currentThemeStatus == "light" ? lightTheme : darkTheme;

  /**
   *
   * Initialize Theme by checking
   * if there is a theme stored locally
   */
  useEffect(() => {
    initThemeStatus();
  }, []);

  //configuration to make transition between screen much faster
  const androidFastTransition = {
    gestureDirection: "horizontal",
    transitionSpec: {
      open: {
        animation: "timing",
        config: {
          duration: 100,
        },
      },
      close: {
        animation: "timing",
        config: {
          duration: 50,
        },
      },
    },
    cardStyleInterpolator: CardStyleInterpolators.forFade, // No sliding animation, just fade in/out
  };

  // Add a default header to all screens
  const screenOptions = ({ navigation }) => ({
    ...androidFastTransition,
    presentation: "transparentModal",
    cardStyle: { backgroundColor: selectedTheme.colors.background },
    headerStyle: {
      elevation: 0,
      backgroundColor: selectedTheme.colors.background,
    },
    headerTitleAlign: "center",
    headerTitleStyle: {
      fontWeight: "bold",
      color: selectedTheme.colors.typography.primary,
    },
    headerLeftContainerStyle: { marginStart: 14 },
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
          {isAuthenticated ? SignedInStack : SignedOutStack}
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
