import { View, Modal, FlatList } from 'react-native'
import { Text, Searchbar, Portal, TouchableRipple } from 'react-native-paper'
import { useState } from 'react'

import MaterialCard from '../../components/learn/MaterialCard'
import { createStyleSheet, useStyles } from '../../hooks/useStyles'
import Layout from '../../components/common/Layout'
import AppBar from '../../components/ui/AppBar'
import CircularIcon from '../../components/ui/CircularIcon'
import NextActionIcon from '../../components/common/NextActionIcon'
import AppBarTitle from '../../components/ui/AppBarTitle'
import { CPR_STEPS_DATA } from './cprStepsData'
import { SEARCH_DATA } from './searchItemsData'
import useCheckVerification from '../../hooks/cpr/useCheckVerification'
import useBoundStore from '../../zustand/useBoundStore'

const LearnScreen = ({ navigation }) => {
  const { styles, theme } = useStyles(stylesheet)
  const [isModalVisible, setModalVisible] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredData, setFilteredData] = useState(SEARCH_DATA)
  const { userIsVerified } = useCheckVerification()

  const handleSearch = (query) => {
    setSearchQuery(query)
    setFilteredData(
      SEARCH_DATA.filter((item) =>
        item.title.toLowerCase().includes(query.toLowerCase()),
      ),
    )
  }

  const openModal = () => setModalVisible(true)
  const closeModal = () => setModalVisible(false)
  const handleNavigate = (route, params) => {
    closeModal()
    navigation.navigate(route, params)
  }

  const globalModalCloser = useBoundStore((state) => state.globalModalCloser)
  const setGlobalSetter = useBoundStore((state) => state.setGlobalSetter)

  const handleButtonPress = (route, params, requireValidation = false) => {
    if (requireValidation && !userIsVerified) {
      setGlobalSetter(true)
      return;
    } else {
      setGlobalSetter(false)
    }
    navigation.navigate(route, params)
  }

  const CustomAppBar = () => (
    <AppBar>
      <AppBarTitle>Learn</AppBarTitle>
      <CircularIcon name="search" onPress={openModal} />
    </AppBar>
  )

  return (
    <Layout
      scrollable
      requiredValidatedAccount={globalModalCloser}
      AppbarComponent={CustomAppBar}
    >
      <View style={styles.section}>
        <Text variant="titleMedium" style={styles.sectionLabel}>
          Practice
        </Text>
        <MaterialCard
          size="large"
          title="Hands-on CPR Guide Training"
          backgroundColor={theme.colors.primary}
          buttonLabel="Practice CPR"
          imageSource={require('../../assets/images/hand-white.png')}
          onPress={() => handleButtonPress('LearnCpr', {}, true)}
        />
      </View>
      <View style={styles.section}>
        <Text variant="titleMedium" style={styles.sectionLabel}>
          Learning Materials
        </Text>
        <View style={styles.materialCards}>
          <MaterialCard
            size="large"
            title="How to Perform CPR"
            backgroundColor="#B6A4F8"
            buttonLabel="View Tutorial"
            imageSource={require('../../assets/images/learningMaterials/howToPerformCpr/howToPerformCprCover.png')}
            onPress={() =>
              handleButtonPress('DocumentMaterial', { data: CPR_STEPS_DATA })
            }
          />
          <MaterialCard
            size="large"
            title="QUIZ: How to Perform CPR"
            backgroundColor="#99DBCD"
            buttonLabel="Answer Quiz"
            imageSource={require('../../assets/images/learningMaterials/howToPerformCpr/howToPerformCprQuizCover.png')}
            onPress={() => handleButtonPress('Quiz', { id: '1' }, true)}
          />
        </View>
      </View>

      <Portal>
        <Modal
          visible={isModalVisible}
          animationType="slide"
          onRequestClose={closeModal}
          transparent
        >
          <TouchableRipple style={{ flex: 1 }} onPress={closeModal}>
            <View style={styles.modalContainer}>
              <Searchbar
                onIconPress={closeModal}
                value={searchQuery}
                onChangeText={handleSearch}
                style={styles.searchInput}
                rippleColor={theme.colors.elevation.level5}
              />
              <FlatList
                data={filteredData}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <TouchableRipple
                    style={styles.searchResultItem}
                    onPress={() => handleNavigate(item.route, item.params)}
                  >
                    <>
                      <Text style={styles.searchResult}>{item.title}</Text>
                      <NextActionIcon styles={styles.nextAction} />
                    </>
                  </TouchableRipple>
                )}
              />
            </View>
          </TouchableRipple>
        </Modal>
      </Portal>
    </Layout>
  )
}

export default LearnScreen

const stylesheet = createStyleSheet((theme) => ({
  section: {
    marginBottom: theme.spacing.xl,
  },
  sectionLabel: {
    marginVertical: theme.spacing.md,
    fontWeight: 'bold',
  },
  materialCards: {
    rowGap: theme.spacing.md,
  },
  modalContainer: {
    flex: 1,
    padding: theme.spacing.base,
    justifyContent: 'center',
    backgroundColor: 'rgba(1,1,1,0.6)',
  },
  searchInput: {
    marginBottom: 20,
    backgroundColor: theme.colors.elevation.level3,
  },
  searchResult: {
    padding: 20,
  },
  searchResultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.elevation.level3,
    paddingRight: theme.spacing.sm,
  },
  nextAction: {
    marginLeft: 'auto',
  },
}))
