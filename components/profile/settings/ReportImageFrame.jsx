import { Image, View, Text } from "react-native";
import { TouchableRipple } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";

import { createStyleSheet, useStyles } from "../../../hooks/useStyles";
import useImagePicker from "../../../hooks/useImagePicker";

const ReportImageFrame = ({
  label,
  image,
  setImage,
  onPress,
  isLoading,
  error,
}) => {
  const { styles, theme } = useStyles(stylesheet);
  const { pickImage } = useImagePicker();

  const handleOnPress = () => {
    if (onPress) {
      onPress();
    } else {
      pickImage(setImage);
    }
  };

  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <TouchableRipple
        onPress={handleOnPress}
        disabled={isLoading}
        style={{ width: "100%" }}
      >
        <View
          style={[
            styles.imageFrame,
            { borderColor: error ? theme.colors.primary : theme.colors.text3 },
          ]}
        >
          {image ? (
            <Image source={{ uri: image }} style={styles.image} />
          ) : (
            <>
              <Ionicons name="camera" size={50} color={theme.colors.text3} />
              <Text style={styles.imagePlaceholder}>Upload a picture</Text>
            </>
          )}
        </View>
      </TouchableRipple>

      {error && (
        <Text style={[styles.errorLabel, { color: theme.colors.primary }]}>
          {error}
        </Text>
      )}
    </View>
  );
};

export default ReportImageFrame;

const stylesheet = createStyleSheet((theme) => ({
  label: {
    color: theme.colors.text,
    fontWeight: "500",
    marginBottom: 8,
  },
  imageFrame: {
    borderWidth: 1,
    borderRadius: 10,
    width: "100%",
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
  imagePlaceholder: {
    color: theme.colors.text3,
  },
}));
