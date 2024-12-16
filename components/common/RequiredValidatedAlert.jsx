import { View } from 'react-native'
import { Text } from 'react-native-paper'
import { createStyleSheet, useStyles } from '../../hooks/useStyles'
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Button from '../ui/Button'
import useBoundStore from '../../zustand/useBoundStore'

export default function RequiredValidatedAlert() {
  const { styles, theme } = useStyles(stylesheet)
  const setGlobalSetter = useBoundStore((state) => state.setGlobalSetter)

  const handleSubmit = () => {
    setGlobalSetter(false)
  }

  return (
    <View style={styles.modal}>
      <View style={styles.modalContent}>
        <MaterialCommunityIcons
          name="alert"
          size={80}
          color={theme.colors.primary}
        />

        <Text variant="titleLarge" style={styles.title}>
          Access Restricted!
        </Text>
        <Text variant="bodyMedium" style={styles.desc}>
          This feature is available only for validated accounts. Please verify
          your account to proceed and unlock this functionality.
        </Text>
        <Button
          label="Close"
          onPress={handleSubmit}
          marginVertical={theme.spacing.xxl}
        />
      </View>
    </View>
  )
}

const stylesheet = createStyleSheet((theme) => ({
  modal: {
    flex: 1,
    backgroundColor: 'rgba(1,1,1,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
  },
  modalContent: {
    paddingHorizontal: theme.spacing.md,
    paddingTop: theme.spacing.xxl,
    paddingBottom: 33,
    backgroundColor: theme.colors.elevation.level3,
    borderRadius: theme.borderRadius.curve,
    maxWidth: '90%',
    minHeight: 200,
    alignItems: 'center',
    rowGap: theme.spacing.xxxs,
  },
  title: {
    marginTop: theme.spacing.md,
    fontWeight: 'bold',
  },
  desc: {
    textAlign: 'center',
  },
}))
