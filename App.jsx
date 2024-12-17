import "expo-dev-client";
import "react-native-gesture-handler";
import { PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as SplashScreen from "expo-splash-screen";
import { View, ToastAndroid } from "react-native";
import { useCallback, useEffect, useState } from "react";

import { lightTheme, darkTheme } from "./utils/theme";
import { SignedInStack, SignedOutStack } from "./navigation/ScreenStack";
import CircularIcon from "./components/ui/CircularIcon";
import useBoundStore from "./zustand/useBoundStore";
import useInitializeTheme from "./hooks/useInitializeTheme";
import useInternet from "./hooks/useInternet";

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const { hasInternet } = useInternet();
  const currentThemeScheme = useBoundStore((state) => state.currentThemeScheme);
  const selectedTheme = currentThemeScheme == "light" ? lightTheme : darkTheme;
  const globalStateEncryptedSession = useBoundStore((state) => state.session);
  const restoreSession = useBoundStore((state) => state.restoreSession);
  const restoreSessionOffline = useBoundStore(
    (state) => state.restoreSessionOffline
  );
  const restoreAccountIsVerifiedLocally = useBoundStore(
    (state) => state.restoreAccountIsVerifiedLocally
  );
  useInitializeTheme();

  useEffect(() => {
    async function prepare() {
      try {
        await restoreAccountIsVerifiedLocally();

        if (hasInternet) {
          await restoreSession();
        } else {
          await restoreSessionOffline();
        }
      } catch (error) {
        ToastAndroid.show(
          `Initialize App Error: ${error.message}`,
          ToastAndroid.SHORT
        );
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(() => {
    if (appIsReady) {
      SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  /*
   * Default screen configurations:
   * for header default styles and screen transitions
   *
   */
  const screenOptions = ({ navigation }) => {
    const backgroundStyle = {
      backgroundColor: selectedTheme.colors.background,
    };

    return {
      animation: "fade",
      presentation: "containedTransparentModal",
      contentStyle: backgroundStyle,
      headerStyle: backgroundStyle,
      headerShadowVisible: false,
      headerTitleAlign: "center",
      headerTitleStyle: {
        fontWeight: "bold",
        color: selectedTheme.colors.text,
      },
      headerLeft: () => (
        <CircularIcon name="arrow-back" onPress={() => navigation.goBack()} />
      ),
    };
  };

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <GestureHandlerRootView>
        <BottomSheetModalProvider>
          <PaperProvider theme={selectedTheme}>
            <NavigationContainer>
              <Stack.Navigator screenOptions={screenOptions}>
                {globalStateEncryptedSession ? SignedInStack : SignedOutStack}
              </Stack.Navigator>
            </NavigationContainer>
          </PaperProvider>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </View>
  );
}
