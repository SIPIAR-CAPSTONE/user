import { Image, View, StyleSheet } from "react-native";
import { TouchableRipple, Text, useTheme } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";

const ImageFrame = ({ label, image, onPress, disabled, error }) => {
  const theme = useTheme();

  return (
    <View style={styles.imageFrameContainer}>
      <Text style={[styles.label, { fontSize: theme.fontSize.lg }]}>
        {label}
      </Text>
      <TouchableRipple onPress={onPress} disabled={disabled}>
        <View
          style={[
            styles.imageFrame,
            { borderColor: error ? theme.colors.primary : "darkgray" },
          ]}
        >
          {image ? (
            <Image source={{ uri: image }} style={styles.image} />
          ) : (
            <>
              <Ionicons name="camera" size={50} color={theme.colors.primary} />
              <Text
                variant="titleMedium"
                style={{ color: theme.colors.primary }}
              >
                Take a picture
              </Text>
            </>
          )}
        </View>
      </TouchableRipple>

      {error && (
        <Text
          variant="bodySmall"
          style={[styles.errorLabel, { color: theme.colors.primary }]}
        >
          {error}
        </Text>
      )}
    </View>
  );
};

export default ImageFrame;

const styles = StyleSheet.create({
  imageFrameContainer: {
    rowGap: 10,
    alignItems: "center",
  },
  label: {
    textAlign: "center",
    color: "gray",
  },
  imageFrame: {
    borderWidth: 2,
    borderStyle: "dashed",
    borderRadius: 10,
    width: 296,
    height: 222,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 293,
    height: 220,
    borderRadius: 10,
    objectFit: "contain",
  },
  errorLabel: {
    paddingStart: 14,
    paddingTop: 4,
    marginBottom: 4,
  },
});
