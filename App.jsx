import "expo-dev-client";
import "react-native-gesture-handler";
import { PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { lightTheme, darkTheme } from "./utils/theme";
import { SignedInStack, SignedOutStack } from "./navigation/ScreenStack";
import CircularIcon from "./components/ui/CircularIcon";
import useBoundStore from "./zustand/useBoundStore";
import useInitializeTheme from "./hooks/useInitializeTheme";

const Stack = createNativeStackNavigator();

export default function App() {
  const currentThemeScheme = useBoundStore((state) => state.currentThemeScheme);
  const selectedTheme = currentThemeScheme == "light" ? lightTheme : darkTheme;
  const globalStateEncryptedSession = useBoundStore((state) => state.session);
  useInitializeTheme();

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
