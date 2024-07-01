import { useTheme } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";

const NextActionIcon = () => {
  const theme = useTheme();
  
  return (
    <Ionicons
      name="chevron-forward"
      size={24}
      color={theme.colors.typography.primary}
    />
  );
};

export default NextActionIcon;

