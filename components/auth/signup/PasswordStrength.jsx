import React from "react";
import { View, Text } from "react-native";
import { createStyleSheet, useStyles } from "../../../hooks/useStyles";
import { ProgressBar } from "react-native-paper";

export default function PasswordStrength({ password }) {
  const { styles } = useStyles(stylesheet);

  if (password.length === 0) return;

  const score = getPasswordStrength(password);
  const strengthLabel = getStrengthLabel(score);
  const progress = score / 5;

  return (
    <View>
      <ProgressBar
        progress={progress}
        color={strengthColors[strengthLabel]}
        style={styles.bar}
      />
      <Text
        style={[styles.strengthLabel, { color: strengthColors[strengthLabel] }]}
      >
        {strengthLabel}
      </Text>
    </View>
  );
}

const stylesheet = createStyleSheet((theme) => ({
  bar: {
    backgroundColor: theme.colors.secondary,
  },
  strengthLabel: {
    fontSize: theme.fontSize.sm,
    fontWeight: "500",
    textAlign: "right",
  },
}));

const getPasswordStrength = (password) => {
  let score = 0;

  if (password.length > 0) score++;
  if (password.length >= 8) score++;
  if (/\d/.test(password)) score++;
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  return score;
};

const getStrengthLabel = (score) => {
  if (score === 1) return "Too Weak";
  if (score === 2) return "Weak";
  if (score === 3) return "Moderate";
  if (score === 4) return "Strong";
  if (score === 5) return "Very Strong";

  return; //if 0
};

const strengthColors = {
  "Too Weak": "#ff4d4d",
  Weak: "#ff884d",
  Moderate: "#ffd24d",
  Strong: "#85b117",
  "Very Strong": "#2CB117",
};
