import React, { useState } from 'react'
import { View, Image, FlatList, Dimensions } from 'react-native'
import { Text } from 'react-native-paper'
import { createStyleSheet, useStyles } from '../../hooks/useStyles'
import Button from '../../components/ui/Button'
import Layout from '../../components/common/Layout'
import { useNavigation, StackActions } from '@react-navigation/native'

const { width } = Dimensions.get('window')

const DocumentMaterialScreen = ({ route }) => {
  const { data } = route.params
  const navigation = useNavigation()
  const { styles, theme } = useStyles(stylesheet)
  const [currentIndex, setCurrentIndex] = useState(0)

  const handleNext = () => {
    if (currentIndex < data.length - 1) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  const handleExitViewing = () => {
    navigation.dispatch(StackActions.replace('FinishedView', { id: 1 }))
  }

  const paginationDots = data.map((page, index) => (
    <View
      key={page.id}
      style={[
        styles.dot,
        index === currentIndex ? styles.activeDot : styles.inactiveDot,
      ]}
    />
  ))

  const renderStep = ({ item }) => (
    <>
      <View style={styles.textContainer}>
        <Text style={styles.stepNumber}>
          {item.number ? `Step ${item.number}` : ''}
        </Text>
        {/* For headers side by side */}
        <View style={styles.headerContainer}>
          {item.headerOne &&
            item.headerOne.map((msg, index) => (
              <Text key={`headerOne-${index}`} style={styles.headerOne}>
                {msg}
              </Text>
            ))}
          {item.headerTwo &&
            item.headerTwo.map((msg, index) => (
              <Text key={`headerTwo-${index}`} style={styles.headerTwo}>
                {msg}
              </Text>
            ))}
        </View>
      </View>

      {item.imageSource && (
        <Image
          source={item.imageSource}
          style={styles.stepImage}
          resizeMode="contain"
        />
      )}
      {item.description &&
        item.description.map((msg, index) => (
          <Text key={index} style={styles.description}>
            {msg}
          </Text>
        ))}
    </>
  )

  return (
    <Layout>
      <View style={styles.stepContainer}>
        <FlatList
          data={[data[currentIndex]]}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          bounces={false}
          renderItem={renderStep}
          ListHeaderComponent={() => (
            <View style={styles.header}>
              <Text variant="titleMedium" style={styles.title}>
                How to Perform CPR - Adult CPR Steps
              </Text>
              <Text variant="bodySmall" style={styles.sourceReference}>
                Source: American Heart Association
              </Text>
            </View>
          )}
        />

        <View style={styles.pagination}>{paginationDots}</View>
        <View style={styles.navigationContainer}>
          <Button
            label="Previous"
            onPress={handlePrevious}
            disabled={currentIndex === 0}
            style={styles.navButton}
          />
          {currentIndex === data.length - 1 ? (
            <Button
              label="Finish"
              onPress={handleExitViewing}
              style={[
                styles.navButton,
                { backgroundColor: theme.colors.green },
              ]}
            />
          ) : (
            <Button
              label="Next"
              onPress={handleNext}
              style={styles.navButton}
            />
          )}
        </View>
      </View>
    </Layout>
  )
}

const stylesheet = createStyleSheet((theme) => ({
  header: {
    marginVertical: theme.spacing.base,
  },
  title: {
    color: theme.colors.primary,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  sourceReference: {
    color: theme.colors.text2,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  stepContainer: {
    flex: 1,
    width: width * 0.94,
    alignItems: 'center',
  },
  stepNumber: {
    fontSize: theme.fontSize.lg,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  stepMessage: {
    marginVertical: theme.spacing.xxxs,
    fontSize: theme.fontSize.sm,
  },
  stepImage: {
    marginTop: theme.spacing.xs,
    maxHeight: '40%',
    width: '100%',
    backgroundColor: '#f9f8f8',
  },
  pagination: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: theme.colors.primary,
  },
  inactiveDot: {
    backgroundColor: '#D3D3D3',
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    columnGap: theme.spacing.xxs,
    marginTop: theme.spacing.base,
    marginBottom: theme.spacing.sm,
  },
  navButton: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    marginTop: 15,
  },
  headerOne: {
    color: theme.colors.primary,
    fontWeight: 'bold',
  },
  headerTwo: {
    fontWeight: 'bold',
  },
  description: {
    textAlign: 'justify',
  },
}))

export default DocumentMaterialScreen
