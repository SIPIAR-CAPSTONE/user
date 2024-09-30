import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

import { createStyleSheet, useStyles } from "../../hooks/useStyles";

const CprPracticeScores = () => {
  const { styles } = useStyles(stylesheet);

  const PracticeScores = TEMP_SCORES_DATA.map((item) => {
    const totalCompression = item.totalCompression;
    const createdAtDate = new Date(item.createdAt);
    const formattedDate = createdAtDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    });

    const score = `${item.perfectOverallScore}/${totalCompression}`;

    return (
      <View key={item.id} style={styles.listItem}>
        <View style={styles.listItemCard}>
          <Text style={styles.cardLabel}>DATE</Text>
          <Text style={[styles.cardValue, styles.date]}>
            {formattedDate ? formattedDate : "-"}
          </Text>
        </View>
        <View style={styles.listItemCard}>
          <Text style={styles.cardLabel}>SCORE</Text>
          <Text style={[styles.cardValue, styles.score]}>{score}</Text>
        </View>
        <View style={styles.listItemCard}>
          <Text style={styles.cardLabel}>DURATION</Text>
          <Text style={[styles.cardValue, styles.duration]}>
            {item.totalDuration ? `${item.totalDuration}s` : "0"}
          </Text>
        </View>
      </View>
    );
  });

  return (
    <View style={styles.cprPracticeScores}>
      <View style={styles.header}>
        <Text variant="titleMedium" style={styles.listLabel}>
          Recent Practice Scores
        </Text>
      </View>
      <View style={styles.list}>{PracticeScores}</View>
    </View>
  );
};

export default CprPracticeScores;

const stylesheet = createStyleSheet((theme) =>
  StyleSheet.create({
    cprPracticeScores: {
      marginTop: 10,
      paddingHorizontal: theme.spacing.base,
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    listLabel: {
      marginVertical: theme.spacing.base,
    },
    list: {
      rowGap: theme.spacing.sm,
    },
    listItem: {
      height: 80,
      flexDirection: "row",
      padding: theme.spacing.sm,
      columnGap: theme.spacing.sm,
      borderRadius: theme.borderRadius.lg,
      backgroundColor: theme.colors.secondary,
    },
    listItemCard: {
      flex: 1,
      borderRadius: theme.borderRadius.md,
      backgroundColor: theme.colors.background,
      alignItems: "center",
      paddingVertical: theme.spacing.xs,
    },
    cardLabel: {
      fontSize: theme.fontSize.xxs,
      fontWeight: "bold",
      color: theme.colors.primary,
    },
    cardValue: {
      color: theme.colors.text,
      fontWeight: "bold",
    },
    date: {
      marginTop: 4,
      fontSize: theme.fontSize.xs,
    },
    score: {
      marginTop: 2,
      fontSize: theme.fontSize.sm,
    },
    duration: {
      marginTop: 2,
      fontSize: theme.fontSize.sm,
    },
  })
);

const TEMP_SCORES_DATA = [
  {
    id: 1,
    totalCompression: 12,
    perfectOverallScore: 0,
    totalDuration: 60,
    createdAt: "2024-07-01T06:12:45.569Z",
  },
  {
    id: 2,
    totalCompression: 12,
    perfectOverallScore: 0,
    totalDuration: 60,
    createdAt: "2024-07-01T06:12:45.569Z",
  },
  {
    id: 3,
    totalCompression: 12,
    perfectOverallScore: 0,
    totalDuration: 60,
    createdAt: "2024-07-01T06:12:45.569Z",
  },
  {
    id: 4,
    totalCompression: 12,
    perfectOverallScore: 0,
    totalDuration: 60,
    createdAt: "2024-07-01T06:12:45.569Z",
  },
  {
    id: 5,
    totalCompression: 12,
    perfectOverallScore: 0,
    totalDuration: 60,
    createdAt: "2024-07-01T06:12:45.569Z",
  },
];
