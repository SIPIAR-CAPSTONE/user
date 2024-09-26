import React, { useState } from "react";
import { View, Image, FlatList, StyleSheet, Dimensions } from "react-native";
import { Text } from "react-native-paper";
import { createStyleSheet, useStyles } from "../../hooks/useStyles";
import Button from "../../components/ui/Button";
import Layout from "../../components/common/Layout";

const { width, height } = Dimensions.get("window");

const DocumentMaterial = ({ route }) => {
  const { data } = route.params;
  const { styles } = useStyles(stylesheet);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < data.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const renderStep = ({ item }) => (
    <View style={styles.stepContainer}>
      <View style={styles.header}>
        <Text variant="titleMedium" style={styles.title}>
          How to Perform CPR - Adult CPR Steps
        </Text>
        <Text variant="bodySmall" style={styles.sourceReference}>
          Source: American Red Cross
        </Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.stepNumber}>
          {item.number ? `Step ${item.number}` : ""}
        </Text>
        {item.message.map((msg, index) => (
          <Text key={index} style={styles.stepMessage}>
            {msg}
          </Text>
        ))}
      </View>
      {item.imageSource && (
        <Image
          source={item.imageSource}
          style={styles.stepImage}
          resizeMode="contain"
        />
      )}
    </View>
  );

  return (
    <Layout>
      <FlatList
        data={[data[currentIndex]]}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        pagingEnabled
        renderItem={renderStep}
      />

      <View style={styles.pagination}>
        {data.map((_, i) => (
          <View
            key={i}
            style={[
              styles.dot,
              i === currentIndex ? styles.activeDot : styles.inactiveDot,
            ]}
          />
        ))}
      </View>

      <View style={styles.navigationContainer}>
        <Button
          label="Previous"
          onPress={handlePrevious}
          disabled={currentIndex === 0}
          style={styles.navButton}
        />
        <Button
          label="Next"
          onPress={handleNext}
          disabled={currentIndex === data.length - 1}
          style={styles.navButton}
        />
      </View>
    </Layout>
  );
};

const stylesheet = createStyleSheet((theme) =>
  StyleSheet.create({
    header: {
      marginVertical: theme.spacing.base,
    },
    title: {
      color: theme.colors.primary,
      textAlign: "center",
    },
    sourceReference: {
      color: theme.colors.text2,
      textAlign: "center",
    },
    stepContainer: {
      width: width * 0.94,
      alignItems: "center",
    },
    stepNumber: {
      fontSize: theme.fontSize.lg,
      fontWeight: "bold",
      textAlign: "center",
    },
    stepMessage: {
      marginVertical: theme.spacing.xxxs,
      fontSize: theme.fontSize.sm,
    },
    stepImage: {
      marginTop: theme.spacing.xs,
      maxHeight: "40%",
      width: "100%",
      backgroundColor: "#f9f8f8",
    },
    pagination: {
      flexDirection: "row",
      marginTop: 10,
      justifyContent: "center",
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
      backgroundColor: "#D3D3D3",
    },
    navigationContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      columnGap: theme.spacing.xxs,
      marginTop: theme.spacing.base,
      marginBottom: theme.spacing.sm,
    },
    navButton: {
      flex: 1,
    },
  })
);

export default DocumentMaterial;
