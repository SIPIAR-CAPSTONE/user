import { StyleSheet, View } from 'react-native'
import { Text, useTheme, TouchableRipple } from 'react-native-paper'
import { Ionicons } from '@expo/vector-icons'
import useBoundStore from '../../zustand/useBoundStore'
import { useEffect, useState } from 'react'
import { supabase } from '../../utils/supabase/config'

const VerifiedIndicator = ({ isVerified, onPress }) => {
  const theme = useTheme()

  if (isVerified) {
    return (
      <View style={styles.verifyIndicatorContainer}>
        <Ionicons
          name="checkmark-circle"
          size={16}
          color={theme.colors.primary}
        />
        <Text style={{ color: theme.colors.primary }} variant="labelSmall">
          Fully Verified
        </Text>
      </View>
    )
  }

  return (
    <TouchableRipple style={styles.buttonWrapper} borderless onPress={onPress}>
      <View style={[styles.button, { borderColor: theme.colors.primary }]}>
        <Text style={{ color: theme.colors.primary }}>Verify Now</Text>
      </View>
    </TouchableRipple>
  )
}

export default VerifiedIndicator

const styles = StyleSheet.create({
  verifyIndicatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 6,
    marginVertical: 10,
  },
  buttonWrapper: {
    marginVertical: 10,
    borderRadius: 20,
  },
  button: {
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 3,
    paddingHorizontal: 24,
  },
})
