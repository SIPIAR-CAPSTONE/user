import { View, StyleSheet } from "react-native";
import { useState, memo } from "react";
import { Divider, Menu, TouchableRipple } from "react-native-paper";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MenuItem from "react-native-paper/lib/typescript/components/Menu/MenuItem";
import { createStyleSheet, useStyles } from "../../hooks/useStyles";
import { MD3Theme } from "react-native-paper";

type CprHeaderProps = {
  handleEnd: () => void;
};

function Header({ handleEnd }: CprHeaderProps) {
  const { styles } = useStyles(stylesheet);
  const [visibleActionMenu, setVisibleActionMenu] = useState(false);

  const openActionMenu = (): void => setVisibleActionMenu(true);
  const closeActionMenu = (): void => setVisibleActionMenu(false);

  return (
    <View style={styles.header}>
      <Menu
        visible={visibleActionMenu}
        onDismiss={closeActionMenu}
        anchor={<MoreOptionActionButton onPress={openActionMenu} />}
        contentStyle={styles.menu}
      >
        <Menu.Item onPress={handleEnd} title="End" />
      </Menu>
    </View>
  );
}

type MoreOptionActionButtonProps = {
  onPress: () => void;
};

function MoreOptionActionButton({ onPress }: MoreOptionActionButtonProps) {
  const { styles } = useStyles(stylesheet);

  return (
    <TouchableRipple borderless onPress={onPress} style={styles.optionButton}>
      <MaterialCommunityIcons name="dots-vertical" size={24} color="black" />
    </TouchableRipple>
  );
}

export const CprHeader = memo(Header);

const stylesheet = createStyleSheet((theme: MD3Theme) =>
  StyleSheet.create({
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
  })
);
