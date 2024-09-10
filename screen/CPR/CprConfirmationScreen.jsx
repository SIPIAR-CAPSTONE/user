import { StyleSheet, Text, View } from "react-native";
import React from "react";
import StatusBar from "../../components/common/StatusBar";
import PrimaryButton from "../../components/ui/PrimaryButton";
import { useStyles, createStyleSheet } from "../../hooks/useStyles";
import { useNavigation } from "@react-navigation/native";

const CprConfirmationScreen = () => {
  const { styles, theme } = useStyles(stylesheet);
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text>CprConfirmationScreen</Text>
      <PrimaryButton
        label="Proceed"
        onPress={() => navigation.navigate("Cpr")}
      />
      <StatusBar />
    </View>
  );
};

export default CprConfirmationScreen;

const stylesheet = createStyleSheet((theme) =>
  StyleSheet.create({
    container: {
      paddingBottom: 70,
      paddingHorizontal: theme.padding.body.horizontal,
    },
  })
);
