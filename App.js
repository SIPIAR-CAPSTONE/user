import 'expo-dev-client'
import 'react-native-gesture-handler'
import { PaperProvider } from 'react-native-paper'
import { NavigationContainer } from '@react-navigation/native'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { lightTheme, darkTheme, themeStatus } from './utils/theme'
import { SignedInStack, SignedOutStack } from './navigation/ScreenStack'
import CircularIcon from './components/ui/CircularIcon'
import useBoundStore from './zustand/useBoundStore'
import { supabase } from './utils/supabase/config'

const Stack = createNativeStackNavigator()

export default function App() {
  const currentThemeStatus = useBoundStore((state) => state.currentThemeStatus)
  const setThemeStatus = useBoundStore((state) => state.setThemeStatus)
  const selectedTheme =
    currentThemeStatus == themeStatus.light ? lightTheme : darkTheme
  const globalStateEncryptedSession = useBoundStore((state) => state.session)
  const setUserMetaData = useBoundStore((state) => state.setUserMetaData)

  // const { data } = supabase.auth.onAuthStateChange((event, session) => {

  supabase.auth.onAuthStateChange((event, session) => {
    if (event === 'INITIAL_SESSION') {
      //! handle initial session
      try {
        setUserMetaData({
          firstName: session['user']['user_metadata']['first_name'],
          middleName: session['user']['user_metadata']['middle_name'],
          lastName: session['user']['user_metadata']['last_name'],
          suffix: session['user']['user_metadata']['suffix'],
          birthday: session['user']['user_metadata']['birth_date'],
          phone: session['user']['user_metadata']['phone_number'],
          barangay: session['user']['user_metadata']['barangay'],
          street: session['user']['user_metadata']['street'],
          houseNumber: session['user']['user_metadata']['house_number'],
          email: session['user']['user_metadata']['email'],
        })
      } catch (error) {
        console.log(error)
      }
    } else if (event === 'USER_UPDATED') {
      //! handle initial session
      try {
        setUserMetaData({
          firstName: session['user']['user_metadata']['first_name'],
          middleName: session['user']['user_metadata']['middle_name'],
          lastName: session['user']['user_metadata']['last_name'],
          suffix: session['user']['user_metadata']['suffix'],
          birthday: session['user']['user_metadata']['birth_date'],
          phone: session['user']['user_metadata']['phone_number'],
          barangay: session['user']['user_metadata']['barangay'],
          street: session['user']['user_metadata']['street'],
          houseNumber: session['user']['user_metadata']['house_number'],
          email: session['user']['user_metadata']['email'],
        })
      } catch (error) {
        console.log(error)
      }
    }
  })

  // // call unsubscribe to remove the callback
  // data.subscription.unsubscribe()

  useEffect(() => {
    const initThemeCheck = async () => {
      setThemeStatus(await AsyncStorage.getItem('theme'))
    }

    initThemeCheck()
  }, [])

  /*
   *
   *
   * Native Stack Navigator Default Screen Configuration
   *
   */

  // Add a default header to all screens
  const screenOptions = ({ navigation }) => ({
    presentation: 'containedTransparentModal',
    animation: 'fade',
    contentStyle: { backgroundColor: selectedTheme.colors.background },
    headerStyle: { backgroundColor: selectedTheme.colors.background },
    headerShadowVisible: false,
    headerTitleAlign: 'center',
    headerTitleStyle: {
      fontWeight: 'bold',
      color: selectedTheme.colors.typography.primary,
    },
    headerLeft: () => (
      <CircularIcon
        name="arrow-back"
        pressable
        onPress={() => navigation.goBack()}
      />
    ),
  })

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
  )
}
