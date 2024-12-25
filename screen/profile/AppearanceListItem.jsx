import { useState, lazy } from "react";
import switchTheme from "react-native-theme-switch-animation";

import ListItem from "../../components/ui/ListItem";
import CircularIcon from "../../components/ui/CircularIcon";
import useBoundStore from "../../zustand/useBoundStore";
import NextActionIcon from "../../components/common/NextActionIcon";
const RadioDialog = lazy(() => import("../../components/ui/RadioDialog"));

export default function AppearanceListItem() {
  const currentThemeScheme = useBoundStore((state) => state.currentThemeScheme);
  const setCurrentThemeScheme = useBoundStore((state) => state.setThemeScheme);

  // Set initial state for dialog visibility and notification status
  const [themeDialogIsVisible, setThemeDialogIsVisible] = useState(false);

  // Function to show or hide dialogs
  const showThemeDialog = () => setThemeDialogIsVisible(true);
  const hideThemeDialog = () => setThemeDialogIsVisible(false);

  const handleChangeTheme = (value) => {
    switchTheme({
      switchThemeFunction: () => {
        setCurrentThemeScheme(value);
      },
      animationConfig: {
        type: "circular",
        duration: 500,
        startingPoint: {
          cxRatio: 0.3,
          cyRatio: 0.5,
        },
      },
    });
  };

  return (
    <>
      <ListItem
        size="medium"
        title="Appearance"
        renderTrailerIcon={() => (
          <CircularIcon name="color-palette" variant="primary" size={14} />
        )}
        renderActionIcon={() => <NextActionIcon />}
        onPress={showThemeDialog}
      />
      <RadioDialog
        title="Theme"
        visible={themeDialogIsVisible}
        hideDialog={hideThemeDialog}
        data={["light", "dark"]}
        selectedValue={currentThemeScheme}
        setSelectedValue={handleChangeTheme}
      />
    </>
  );
}
