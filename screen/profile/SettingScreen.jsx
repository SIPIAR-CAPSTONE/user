import { ScrollView, StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

import ListItem from "../../components/ui/ListItem";
import CircularIcon from "../../components/ui/CircularIcon";
import RadioDialog from "../../components/ui/RadioDialog";
import useStore from "../../zustand/useStore";
import StatusBar from "../../components/common/StatusBar";
import NextActionIcon from "../../components/common/NextActionIcon";

const SettingScreen = () => {
  const theme = useTheme();
  const currentThemeStatus = useStore((state) => state.currentThemeStatus);
  const setCurrentThemeStatus = useStore((state) => state.setThemeStatus);
  const navigation = useNavigation();
  const [notificationStatus, setNotificationStatus] = useState("On");

  const [visible, setVisible] = useState({
    notification: false,
    appearance: false,
  });

  const showDialog = (type) =>
    setVisible((prevVisible) => {
      return { ...prevVisible, [type]: true };
    });

  const hideDialog = (type) =>
    setVisible((prevVisible) => {
      return { ...prevVisible, [type]: false };
    });

  return (
    <ScrollView
      contentContainerStyle={[
        styles.listItems,
        {
          paddingVertical: theme.padding.body.vertical,
          paddingHorizontal: theme.padding.body.horizontal,
        },
      ]}
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
        setSelectedValue={setNotificationStatus}
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
        data={["light", "dark"]}
        selectedValue={currentThemeStatus}
        setSelectedValue={setCurrentThemeStatus}
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

export default SettingScreen;

const styles = StyleSheet.create({
  listItems: {
    marginTop: 20,
    rowGap: 10,
  },
});
