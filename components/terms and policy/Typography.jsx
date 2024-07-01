import { StyleSheet, View } from "react-native";
import { Text, useTheme } from "react-native-paper";

const Title = ({ children }) => {
  const theme = useTheme();

  return (
    children && (
      <Text
        variant="displaySmall"
        style={[styles.title, { color: theme.colors.primary }]}
      >
        {children}
      </Text>
    )
  );
};

const H1 = ({ children }) => {
  return (
    children && (
      <Text style={styles.h1} variant="titleMedium">
        {children}
      </Text>
    )
  );
};

const H2 = ({ children }) => {
  return children && <Text variant="titleSmall">{children}</Text>;
};

const P = ({ children }) => {
  return children && <Text variant="bodySmall">{children}</Text>;
};

const OL = ({ children }) => {
  return (
    children && (
      <View style={styles.ol}>
        <Text style={styles.olDot}>{`\u2022`}</Text>
        <Text variant="bodySmall">{children}</Text>
      </View>
    )
  );
};

const Strong = ({ children }) => {
  return (
    children && (
      <Text variant="labelSmall" style={styles.strong}>
        {children}
      </Text>
    )
  );
};

const Time = ({ children, style: customStyle }) => {
  return (
    children && (
      <Text variant="labelSmall" style={[styles.time, customStyle]}>
        {children}
      </Text>
    )
  );
};

export { H1, H2, P, OL, Title, Strong, Time };

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
    fontWeight: "bold",
    marginVertical: 26,
  },
  h1: {
    marginTop: 20,
    marginBottom: 4,
    fontWeight: "bold",
  },
  ol: {
    flexDirection: "row",
    marginStart: 10,
    marginTop: 2,
  },
  olDot: {
    marginEnd: 6,
  },
  strong: {
    fontWeight: "bold",
  },
  time: {
    fontStyle: "italic",
  },
});
