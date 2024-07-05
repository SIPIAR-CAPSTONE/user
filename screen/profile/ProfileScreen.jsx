import { View, StyleSheet, ScrollView } from 'react-native'
import { useTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { useState } from 'react'
import StatusBar from '../../components/common/StatusBar'
import ListItem from '../../components/ui/ListItem'
import VerifiedIndicator from '../../components/profile/VerifiedIndicator'
import CircularIcon from '../../components/ui/CircularIcon'
import UserProfileCard from '../../components/profile/UserProfileCard'
import ConfirmationDialog from '../../components/ui/ConfirmationDialog'
import NextActionIcon from '../../components/common/NextActionIcon'
import { supabase } from '../../utils/supabase/config'

const ProfileScreen = () => {
  const theme = useTheme()
  const navigation = useNavigation()

  // handling logout confirmation dialog
  const [dialogVisible, setDialogVisible] = useState(false)
  const showDialog = () => setDialogVisible(true)
  const hideDialog = () => setDialogVisible(false)


  const handleLogout = async () => {
    await supabase.auth.signOut()
  }

  return (
    <ScrollView
      contentContainerStyle={{
        paddingVertical: theme.padding.body.vertical,
        paddingHorizontal: theme.padding.body.horizontal,
      }}
      showsVerticalScrollIndicator={false}
    >
      <UserProfileCard
        name="John Doe"
        email="j.doe@gmail.com"
        renderFooter={() => <VerifiedIndicator isVerified={false} />}
      />
      {/*
       *
       * Profile screen
       * List item
       *
       */}
      <View style={styles.listItems}>
        {/* My Account */}
        <ListItem
          size="medium"
          title="My Account"
          renderIcon={() => (
            <CircularIcon name="person" variant="primary" size={14} />
          )}
          renderActionIcon={() => <NextActionIcon />}
          onPress={() => navigation.navigate('MyAccount')}
        />
        {/* Setting */}
        <ListItem
          size="medium"
          title="Setting"
          renderIcon={() => (
            <CircularIcon name="settings" variant="primary" size={14} />
          )}
          renderActionIcon={() => <NextActionIcon />}
          onPress={() => navigation.navigate('Setting')}
        />
        {/* Terms and Conditions */}
        <ListItem
          size="medium"
          title="Terms and Conditions"
          renderIcon={() => (
            <CircularIcon name="document" variant="primary" size={14} />
          )}
          renderActionIcon={() => <NextActionIcon />}
          onPress={() => navigation.navigate('TermsAndConditions')}
        />
        {/* Privacy Policy */}
        <ListItem
          size="medium"
          title="Privacy Policy"
          renderIcon={() => (
            <CircularIcon name="shield-checkmark" variant="primary" size={14} />
          )}
          renderActionIcon={() => <NextActionIcon />}
          onPress={() => navigation.navigate('PrivacyPolicy')}
        />

        {/* Sign Out */}
        {/* When logout button is pressed, show confirmation */}
        <ConfirmationDialog
          title="Are you sure you want to Sign Out?"
          confirmButtonLabel="Sign Out"
          visible={dialogVisible}
          showDialog={showDialog}
          hideDialog={hideDialog}
          onConfirmed={handleLogout}
          renderButton={() => (
            <ListItem
              size="medium"
              title="Sign Out"
              renderIcon={() => (
                <CircularIcon name="exit" variant="primary" size={14} />
              )}
              renderActionIcon={() => <NextActionIcon />}
              onPress={showDialog}
            />
          )}
        />
      </View>

      <StatusBar />
    </ScrollView>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
  listItems: {
    marginTop: 20,
    rowGap: 10,
  },
})
