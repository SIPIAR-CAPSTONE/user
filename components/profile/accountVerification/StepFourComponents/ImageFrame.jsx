import { Image, View } from "react-native";
import { TouchableRipple, Text } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { createStyleSheet, useStyles } from "../../../../hooks/useStyles";

const ImageFrame = ({ label, image, onPress, isLoading, error }) => {
  const { styles, theme } = useStyles(stylesheet);

  return (
    <View style={styles.imageFrameContainer}>
      <Text style={styles.label}>{label}</Text>
      <TouchableRipple onPress={onPress} disabled={isLoading}>
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
              <Text variant="titleMedium" style={styles.placeholder}>
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

const stylesheet = createStyleSheet((theme) => ({
  imageFrameContainer: {
    rowGap: 10,
    alignItems: "center",
  },
  label: {
    fontSize: theme.fontSize.lg,
    textAlign: "center",
    color: "gray",
  },
  imageFrame: {
    borderWidth: 2,
    borderStyle: "dashed",
    borderRadius: 10,
    width: 267,
    height: 200,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
    objectFit: "contain",
  },
  errorLabel: {
    paddingStart: 14,
    paddingTop: 4,
    marginBottom: 4,
  },
  placeholder: {
    color: theme.colors.primary,
  },
}));
