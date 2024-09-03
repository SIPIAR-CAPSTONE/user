import { Image, StyleSheet, View } from "react-native";
import { Button, Text, useTheme } from "react-native-paper";

const MaterialCard = ({
  size = "normal",
  direction = "right",
  imageSource,
  onPress,
  title,
  backgroundColor,
  buttonLabel,
}) => {
  const theme = useTheme();

  const directionStyle = {
    right: {
      content: "row",
      item: "flex-start",
    },
    left: {
      content: "row-reverse",
      item: "flex-end",
    },
  };

  const sizeStyle = {
    large: {
      width: "100%",
      height: 155,
      title: 22,
      button: { borderRadius: 10, width: 150 },
      buttonLabel: { fontSize: 14 },
      cardPadding: 18,
      cardBorderRadius: 16,
    },
    normal: {
      width: 300,
      height: 145,
      title: 20,
      button: { borderRadius: 10, width: 120 },
      buttonLabel: { fontSize: 12 },
      cardPadding: 14,
      cardBorderRadius: 12,
    },
  };
  return (
    <View
      style={{
        padding: sizeStyle[size].cardPadding,
        borderRadius: sizeStyle[size].cardBorderRadius,
        backgroundColor: backgroundColor,
        height: sizeStyle[size].height,
        width: sizeStyle[size].width,
        flexDirection: directionStyle[direction].content,
      }}
    >
      {/* Text content side */}
      <View
        style={[
          styles.textContainer,
          { alignItems: directionStyle[direction].item },
        ]}
      >
        <Text
          numberOfLines={2}
          style={{
            fontSize: sizeStyle[size].title,
            color: theme.colors.onPrimary,
          }}
        >
          {title}
        </Text>
        <Button
          mode="contained"
          compact
          buttonColor={theme.colors.black}
          textColor={theme.colors.onBlack}
          style={sizeStyle[size].button}
          labelStyle={sizeStyle[size].buttonLabel}
          onPress={onPress}
        >
          {buttonLabel}
        </Button>
      </View>
      {/* Image content side */}
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={imageSource} />
      </View>
    </View>
  );
};

export default MaterialCard;

const styles = StyleSheet.create({
  imageContainer: {
    width: "40%",
  },
  image: {
    height: "100%",
    width: "100%",
    objectFit: "contain",
  },
  textContainer: {
    flex: 1,
    justifyContent: "space-between",
  },
});
