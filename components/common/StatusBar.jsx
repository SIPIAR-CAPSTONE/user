import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import useBoundStore from "../../zustand/useBoundStore";

import { themeStatus } from "../../utils/theme";

const StatusBar = ({ style }) => {
  // Get the current theme status from the store.
  const currentThemeStatus = useBoundStore((state) => state.currentThemeStatus);

  // Initialize the status style.
  let selectedStatusStyle = currentThemeStatus;

  // If there is a custom style, use it.
  if (style) {
    selectedStatusStyle = style;
  }

  // If the current theme status is light, use the dark status bar style.
  if (currentThemeStatus == themeStatus.light) {
    selectedStatusStyle = themeStatus.dark;
  }

  // If the current theme status is dark, use the light status bar style.
  else {
    selectedStatusStyle = themeStatus.light;
  }

  return <ExpoStatusBar style={selectedStatusStyle} />;
};

export default StatusBar;
