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

const H1 = ({ children, ...props }) => {
  return (
    children && (
      <Text style={styles.h1} variant="titleLarge" {...props}>
        {children}
      </Text>
    )
  );
};

const H2 = ({ children, ...props }) => {
  return (
    children && (
      <Text variant="titleMedium" {...props}>
        {children}
      </Text>
    )
  );
};

const P = ({ children }) => {
  return children && <Text variant="bodyMedium">{children}</Text>;
};

const OL = ({ children }) => {
  return (
    children && (
      <View style={styles.ol}>
        <Text style={styles.olDot}>{`\u2022`}</Text>
        <Text variant="bodyMedium" style={styles.olText}>
          {children}
        </Text>
      </View>
    )
  );
};

const Strong = ({ children, ...props }) => {
  return (
    children && (
      <Text variant="bodyMedium" style={styles.strong} {...props}>
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
  olText: {
    flex: 1,
  },
  strong: {
    fontWeight: "bold",
  },
  time: {
    fontStyle: "italic",
  },
});
