import { StyleSheet, View } from "react-native";
import { Text, useTheme, TouchableRipple } from "react-native-paper";

const ListItem = ({
  title,
  titleVariant = "titleMedium",
  subTitle,
  subTitleVariant = "bodySmall",
  desc,
  descVariant = "bodyMedium",
  renderIcon,
  renderActionIcon,
  size = "small",
  onPress,
  contentContainerStyle,
  roundness,
}) => {
  const theme = useTheme();

  const sizeStyle = {
    large: {
      height: 96,
      maxHeight: 120,
      padding: 18,
      borderRadius: 14,
    },
    medium: {
      height: 76,
      maxHeight: 90,
      padding: 16,
      borderRadius: 12,
    },
    small: {
      height: 46,
      maxHeight: 64,
      padding: 14,
      borderRadius: 10,
    },
  };

  const ROUNDNESS_STYLE =
    roundness != null ? roundness : sizeStyle[size].borderRadius;

  return (
    <TouchableRipple
      borderless
      onPress={onPress ? onPress : null}
      style={{ borderRadius: ROUNDNESS_STYLE }}
    >
      <View
        style={[
          styles.container,
          {
            backgroundColor: theme.colors.secondary,
            borderRadius: ROUNDNESS_STYLE,
            padding: sizeStyle[size].padding,
            columnGap: sizeStyle[size].padding,
            maxHeight: sizeStyle[size].maxHeight,
            minHeight: sizeStyle[size].height,
          },
          contentContainerStyle,
        ]}
      >
        {/* Right Side: Leading Icon */}
        {renderIcon && <View style={styles.icon}>{renderIcon()}</View>}
        {/* Center to last Side: Text content */}
        <View style={styles.content}>
          {/* Title and subtitle */}
          <View style={styles.header}>
            <Text numberOfLines={1} variant={titleVariant}>
              {title}
            </Text>
            {subTitle && (
              <Text
                variant={subTitleVariant}
                style={[
                  styles.subTitle,
                  { color: theme.colors.typography.tertiary },
                ]}
              >
                {subTitle}
              </Text>
            )}
          </View>
          {/* Description */}
          {desc && (
            <Text
              variant={descVariant}
              numberOfLines={2}
              style={[
                styles.desc,
                {
                  color: theme.colors.typography.secondary,
                },
              ]}
            >
              {desc}
            </Text>
          )}
        </View>
        {/* Left Side: action icon */}
        {renderActionIcon && (
          <View style={styles.icon}>{renderActionIcon()}</View>
        )}
      </View>
    </TouchableRipple>
  );
};

export default ListItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "baseline",
    columnGap: 6,
  },
  icon: {
    alignSelf: "center",
  },
});
