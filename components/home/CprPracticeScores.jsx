import { View } from 'react-native'
import { Text } from 'react-native-paper'

import { createStyleSheet, useStyles } from '../../hooks/useStyles'
import { AnimatedCircularProgress } from 'react-native-circular-progress'
import moment from 'moment'
import Color from '../../utils/Color'
import EmptyLabel from '../ui/EmptyLabel'
import useCheckVerification from '../../hooks/cpr/useCheckVerification'

export default function CprPracticeScores() {
  const { styles } = useStyles(stylesheet)
  const { userIsVerified } = useCheckVerification()

  return (
    <View style={styles.cprPracticeScores}>
      <View style={styles.header}>
        <Text variant="titleMedium" style={styles.listLabel}>
          Recent Practice Scores
        </Text>
      </View>
      <View style={styles.list}>
        {userIsVerified ? (
          <PracticeScores />
        ) : (
          <View style={styles.notVerified}>
            <Text variant="titleMedium" style={styles.notVerifiedText}>
              Not verified
            </Text>
          </View>
        )}
      </View>
    </View>
  )
}

function PracticeScores() {
  const { styles, theme } = useStyles(stylesheet)

  if (TEMP_SCORES_DATA.length === 0) return <EmptyLabel label="No Scores" />

  return TEMP_SCORES_DATA.map((item) => {
    const totalCompression = item.totalCompression
    const formattedDate = moment(item.createdAt).format('LL')
    const score = `${item.perfectOverallScore}/${totalCompression}`
    const progress = (item.perfectOverallScore / totalCompression) * 100
    const progressColor =
      progress >= 75 ? Color.green : progress >= 40 ? Color.yellow : Color.red

    const Content = () => (
      <View>
        <Text>{progress}%</Text>
      </View>
    )

    return (
      <View key={item.id} style={styles.listItem}>
        <View style={styles.leftContent}>
          <AnimatedCircularProgress
            size={75}
            width={7}
            fill={progress ? progress : 0}
            tintColor={progressColor}
            backgroundColor={theme.colors.text3}
            rotation={0}
          >
            {Content}
          </AnimatedCircularProgress>
        </View>
        <View style={styles.rightContent}>
          <Text style={styles.date}>{formattedDate ? formattedDate : '-'}</Text>
          <View style={styles.listItemCards}>
            <View style={styles.listItemCard}>
              <Text style={styles.cardLabel}>Score</Text>
              <Text style={styles.cardValue}>{score}</Text>
            </View>
            <View style={styles.listItemCard}>
              <Text style={styles.cardLabel}>Duration</Text>
              <Text style={styles.cardValue}>
                {item.totalDuration ? `${item.totalDuration}s` : '0'}
              </Text>
            </View>
          </View>
        </View>
      </View>
    )
  })
}

const stylesheet = createStyleSheet((theme) => ({
  cprPracticeScores: {
    marginTop: 10,
    paddingHorizontal: theme.spacing.base,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  listLabel: {
    marginVertical: theme.spacing.base,
  },
  list: {
    rowGap: theme.spacing.sm,
  },
  listItem: {
    height: 100,
    flexDirection: 'row',
    paddingVertical: theme.spacing.xs,
    paddingHorizontal: theme.spacing.lg,
    columnGap: theme.spacing.xxl,
    borderRadius: theme.borderRadius.lg,
    backgroundColor: theme.colors.secondary,
  },
  leftContent: {
    justifyContent: 'center',
  },
  rightContent: {
    flex: 1,
    rowGap: theme.spacing.xxs,
  },
  date: {
    fontWeight: 'bold',
    color: theme.colors.text2,
    marginStart: 6,
  },
  listItemCards: {
    flexDirection: 'row',
    columnGap: theme.spacing.base,
  },
  listItemCard: {
    flex: 1,
    borderRadius: theme.borderRadius.base,
    backgroundColor: theme.colors.elevation.level3,
    alignItems: 'center',
    paddingVertical: theme.spacing.xxs,
    minWidth: 80,
  },
  cardLabel: {
    fontSize: theme.fontSize.xxs,
    fontWeight: 'semibold',
    color: theme.colors.primary,
  },
  cardValue: {
    color: theme.colors.text,
    marginTop: 2,
    fontSize: theme.fontSize.sm,
  },
  notVerified: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 100, // or another height that fits your layout
    color: 'gray', // you can also use a theme color like theme.colors.text3
  },
  notVerifiedText: {
    color: 'gray', // Ensure this matches your gray color
  },
}))

const TEMP_SCORES_DATA = [
  {
    id: 1,
    totalCompression: 12,
    perfectOverallScore: 12,
    totalDuration: 60,
    createdAt: '2024-07-01T06:12:45.569Z',
  },
  {
    id: 2,
    totalCompression: 12,
    perfectOverallScore: 9,
    totalDuration: 60,
    createdAt: '2024-07-01T06:12:45.569Z',
  },
  {
    id: 3,
    totalCompression: 12,
    perfectOverallScore: 6,
    totalDuration: 60,
    createdAt: '2024-07-01T06:12:45.569Z',
  },
  {
    id: 4,
    totalCompression: 12,
    perfectOverallScore: 3,
    totalDuration: 60,
    createdAt: '2024-07-01T06:12:45.569Z',
  },
  {
    id: 5,
    totalCompression: 12,
    perfectOverallScore: 0,
    totalDuration: 60,
    createdAt: '2024-07-01T06:12:45.569Z',
  },
]
