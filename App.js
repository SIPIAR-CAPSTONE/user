import "expo-dev-client";
import "react-native-gesture-handler";
import { useState } from "react";
import { PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { lightTheme } from "./utils/theme";
import { SignedInStack, SignedOutStack } from "./navigation/ScreenStack";
import CircularIcon from "./components/ui/CircularIcon";

const Stack = createStackNavigator();

export default function App() {
  const isAuthenticated = false; //TODO: Replace with your actual authentication logic
  const theme = useState("light"); //TODO: Change this later on as global state or Context
  const selectedTheme = theme == "light" ? lightTheme : lightTheme; //TODO: Change the later lightTheme to darkTheme

  // Add a default header to all screens
  const screenOptionsConfig = ({ navigation }) => ({
    cardStyle: { backgroundColor: selectedTheme.colors.background },
    headerStyle: { elevation: 0 },
    headerTitleAlign: "center",
    headerTitleStyle: { fontWeight: "bold" },
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
        <Stack.Navigator screenOptions={screenOptionsConfig}>
          {isAuthenticated ? SignedInStack : SignedOutStack}
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
