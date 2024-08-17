import { ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState, lazy } from "react";

import ListItem from "../../../components/ui/ListItem";
import CircularIcon from "../../../components/ui/CircularIcon";
import useBoundStore from "../../../zustand/useBoundStore";
import StatusBar from "../../../components/common/StatusBar";
import NextActionIcon from "../../../components/common/NextActionIcon";
import { themeStatus } from "../../../utils/theme";
import switchTheme from "react-native-theme-switch-animation";
import { useStyles, createStyleSheet } from "../../../hooks/useStyles";
const RadioDialog = lazy(() => import("../../../components/ui/RadioDialog"));

const SettingsScreen = () => {
  const { styles } = useStyles(stylesheet);
  const currentThemeStatus = useBoundStore((state) => state.currentThemeStatus);
  const setCurrentThemeStatus = useBoundStore((state) => state.setThemeStatus);
  const navigation = useNavigation();

  // Set initial state for dialog visibility and notification status
  const [visible, setVisible] = useState({
    notification: false,
    appearance: false,
  });
  const [notificationStatus, setNotificationStatus] = useState("On");

  // Function to show or hide dialogs
  const showDialog = (type) =>
    setVisible((prevVisible) => ({ ...prevVisible, [type]: true }));
  const hideDialog = (type) =>
    setVisible((prevVisible) => ({ ...prevVisible, [type]: false }));

  const handleChangeTheme = (value) => {
    switchTheme({
      switchThemeFunction: () => {
        setCurrentThemeStatus(value);
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

  const handleChangeNotification = (value) => setNotificationStatus(value);

  return (
    <ScrollView
      contentContainerStyle={styles.listItems}
      showsVerticalScrollIndicator={false}
    >
      {/* Notification */}
      <ListItem
        size="medium"
        title="Notification"
        renderIcon={() => (
          <CircularIcon name="notifications" variant="primary" size={14} />
        )}
        renderActionIcon={() => <NextActionIcon />}
        onPress={() => showDialog("notification")}
      />
      <RadioDialog
        title="Notification"
        visible={visible.notification}
        hideDialog={() => hideDialog("notification")}
        data={["On", "Off"]}
        selectedValue={notificationStatus}
        setSelectedValue={handleChangeNotification}
      />

      {/* Appearance */}
      <ListItem
        size="medium"
        title="Appearance"
        renderIcon={() => (
          <CircularIcon name="color-palette" variant="primary" size={14} />
        )}
        renderActionIcon={() => <NextActionIcon />}
        onPress={() => showDialog("appearance")}
      />
      <RadioDialog
        title="Theme"
        visible={visible.appearance}
        hideDialog={() => hideDialog("appearance")}
        data={[themeStatus.light, themeStatus.dark]}
        selectedValue={currentThemeStatus}
        setSelectedValue={handleChangeTheme}
      />

      {/* Delete Account */}
      <ListItem
        size="medium"
        title="Delete Account"
        renderIcon={() => (
          <CircularIcon name="trash" variant="primary" size={14} />
        )}
        renderActionIcon={() => <NextActionIcon />}
        onPress={() => navigation.navigate("DeleteAccount")}
      />

      <StatusBar />
    </ScrollView>
  );
};

export default SettingsScreen;

const stylesheet = createStyleSheet((theme) => ({
  listItems: {
    marginTop: 20,
    rowGap: 10,
    paddingVertical: theme.padding.body.vertical,
    paddingHorizontal: theme.padding.body.horizontal,
  },
}));
