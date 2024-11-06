import { View } from "react-native";
import { Text, TouchableRipple } from "react-native-paper";
import { createStyleSheet, useStyles } from "../../hooks/useStyles";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const AnswerOption = ({ isCorrect = null, onPress, text, disabled }) => {
  const { styles, theme } = useStyles(stylesheet);

  const colorStyle = {
    true: theme.colors.green,
    false: theme.colors.primary,
    null: theme.colors.text,
  };

  return (
    <TouchableRipple
      borderless
      onPress={onPress}
      disabled={disabled}
      style={{ borderRadius: theme.borderRadius.lg }}
    >
      <View
        style={[
          styles.container,
          {
            borderColor: colorStyle[isCorrect],
            backgroundColor: disabled
              ? theme.colors.secondary
              : theme.colors.elevation.level3,
          },
        ]}
      >
        <Text style={[styles.answer, { color: colorStyle[isCorrect] }]}>
          {text}
        </Text>
        {isCorrect && (
          <MaterialCommunityIcons
            name="checkbox-marked-circle-outline"
            size={24}
            color={theme.colors.green}
            style={styles.checkIcon}
          />
        )}
      </View>
    </TouchableRipple>
  );
};

export default AnswerOption;

const stylesheet = createStyleSheet((theme) => ({
  container: {
    borderWidth: 1.5,
    borderRadius: theme.borderRadius.lg,
    minHeight: 52,
    padding: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  answer: {
    textAlign: "center",
    paddingHorizontal: 20,
  },
  checkIcon: {
    position: "absolute",
    right: 10,
    top: "50%",
  },
}));
