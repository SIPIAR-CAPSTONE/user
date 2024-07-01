import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import useStore from "../../zustand/useStore";

import { themeStatus } from "../../utils/theme";

const StatusBar = ({ style }) => {
  const currentThemeStatus = useStore((state) => state.currentThemeStatus);
  //initialie statusStyle
  let selectedStatusStyle = currentThemeStatus;
  //if there is a custom style, use it.
  if (style) {
    selectedStatusStyle = style;
  }
  //if currentThemeStatus is light then use dark status bar
  if (currentThemeStatus == themeStatus.light) {
    selectedStatusStyle = themeStatus.dark;
  }
  //if currentThemeStatus is dark then use light status bar
  else {
    selectedStatusStyle = themeStatus.light;
  }

  return <ExpoStatusBar style={selectedStatusStyle} />;
};

export default StatusBar;
