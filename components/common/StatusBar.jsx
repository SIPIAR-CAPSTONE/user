import { StatusBar as ExpoStatusBar } from "expo-status-bar";

import useBoundStore from "../../zustand/useBoundStore";
import { memo } from "react";

const StatusBar = ({ style = null, ...props }) => {
  const currentThemeScheme = useBoundStore((state) => state.currentThemeScheme);
  let selectedSchemeStyle = currentThemeScheme;

  // If there is a custom style, use it.
  if (style) {
    selectedSchemeStyle = style;
  }

  // If the current theme Scheme is light then use the dark Scheme bar style.
  else if (currentThemeScheme == "light") {
    selectedSchemeStyle = "dark";
  } else {
    selectedSchemeStyle = "light";
  }

  return <ExpoStatusBar style={selectedSchemeStyle} {...props} />;
};

export default memo(StatusBar);
