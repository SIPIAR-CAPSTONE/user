import { View } from "react-native";
import { useState, memo } from "react";
import { Menu, TouchableRipple } from "react-native-paper";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import { createStyleSheet, useStyles } from "../../hooks/useStyles";

function CprHeader({ handleEnd, onOpenInfoDialog }) {
  const { styles } = useStyles(stylesheet);
  const [visibleActionMenu, setVisibleActionMenu] = useState(false);
  const openActionMenu = () => setVisibleActionMenu(true);
  const closeActionMenu = () => setVisibleActionMenu(false);

  

  return (
    <View style={styles.header}>
      <Menu
        visible={visibleActionMenu}
        onDismiss={closeActionMenu}
        anchor={<MoreOptionActionButton onPress={openActionMenu} />}
        contentStyle={styles.menu}
      >
        <Menu.Item onPress={onOpenInfoDialog} title="CPR Guide Info" />
        <Menu.Item onPress={handleEnd} title="End" />
      </Menu>
    </View>
  );
}

function MoreOptionActionButton({ onPress }) {
  const { styles } = useStyles(stylesheet);

  return (
    <TouchableRipple borderless onPress={onPress} style={styles.optionButton}>
      <MaterialCommunityIcons name="dots-vertical" size={24} color="black" />
    </TouchableRipple>
  );
}

export default memo(CprHeader);

const stylesheet = createStyleSheet((theme) => ({
  header: {
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    justifyContent: "flex-end",
  },
  menu: {
    backgroundColor: theme.colors.elevation.level3,
  },
  optionButton: {
    width: 33,
    height: 33,
    borderRadius: 33,
    backgroundColor: "lightgray",
    alignItems: "center",
    justifyContent: "center",
  },
}));
