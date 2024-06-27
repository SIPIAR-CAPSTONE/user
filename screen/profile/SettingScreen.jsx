import { ScrollView, StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";

import ListItem from "../../components/ui/ListItem";
import CircularIcon from "../../components/ui/CircularIcon";
import { useNavigation } from "@react-navigation/native";
import RadioDialog from "../../components/ui/RadioDialog";
import { useState } from "react";

const SettingScreen = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const [notificationStatus, setNotificationStatus] = useState("On");
  const [themeStatus, setThemeStatus] = useState("Light");

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
        renderActionIcon={() => <Ionicons name="chevron-forward" size={24} />}
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
        renderActionIcon={() => <Ionicons name="chevron-forward" size={24} />}
        onPress={() => showDialog("appearance")}
      />
      <RadioDialog
        title="Theme"
        visible={visible.appearance}
        hideDialog={() => hideDialog("appearance")}
        data={["Light", "Dark"]}
        selectedValue={themeStatus}
        setSelectedValue={setThemeStatus}
      />

      {/* Delete Account */}
      <ListItem
        size="medium"
        title="Delete Account"
        renderIcon={() => (
          <CircularIcon name="trash" variant="primary" size={14} />
        )}
        renderActionIcon={() => <Ionicons name="chevron-forward" size={24} />}
        onPress={() => navigation.navigate("DeleteAccount")}
      />
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
