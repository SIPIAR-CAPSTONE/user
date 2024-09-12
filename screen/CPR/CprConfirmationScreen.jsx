import { StyleSheet, Text } from "react-native";
import React from "react";
import Button from "../../components/ui/Button";
import { useStyles, createStyleSheet } from "../../hooks/useStyles";
import { useNavigation } from "@react-navigation/native";
import Layout from "../../components/common/Layout";

const CprConfirmationScreen = () => {
  const { styles, theme } = useStyles(stylesheet);
  const navigation = useNavigation();

  return (
    <Layout>
      <Text>CprConfirmationScreen</Text>
      <Button label="Proceed" onPress={() => navigation.navigate("Cpr")} />
    </Layout>
  );
};

export default CprConfirmationScreen;

const stylesheet = createStyleSheet((theme) =>
  StyleSheet.create({
    container: {
      paddingBottom: 70,
    },
  })
);
