import "expo-dev-client";
import { useEffect } from "react";
import "react-native-gesture-handler";
import { PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { lightTheme, darkTheme } from "./utils/theme";
import { SignedInStack, SignedOutStack } from "./navigation/ScreenStack";
import CircularIcon from "./components/ui/CircularIcon";
import useBoundStore from "./zustand/useBoundStore";

const Stack = createNativeStackNavigator();

export default function App() {
  const currentThemeScheme = useBoundStore((state) => state.currentThemeScheme);
  const setThemeScheme = useBoundStore((state) => state.setThemeScheme);
  const selectedTheme = currentThemeScheme == "light" ? lightTheme : darkTheme;
  const globalStateEncryptedSession = useBoundStore((state) => state.session);

  /**
   * Initialize the theme based on the stored value in AsyncStorage.
   */
  useEffect(() => {
    const initThemeCheck = async () => {
      setThemeScheme(await AsyncStorage.getItem("theme"));
    };
    initThemeCheck();
  }, []);

  /*
   *
   * Native Stack Navigator Default Screen Configuration
   *
   * It adds a header to all screens and configures the
   * appearance of the screen.
   *
   */
  const screenOptions = ({ navigation }) => ({
    presentation: "containedTransparentModal",
    animation: "fade",
    contentStyle: { backgroundColor: selectedTheme.colors.background },
    headerStyle: { backgroundColor: selectedTheme.colors.background },
    headerShadowVisible: false,
    headerTitleAlign: "center",
    headerTitleStyle: {
      fontWeight: "bold",
      color: selectedTheme.colors.text,
    },
    headerLeft: () => (
      <CircularIcon name="arrow-back" onPress={() => navigation.goBack()} />
    ),
  });

  return (
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
  );
}
