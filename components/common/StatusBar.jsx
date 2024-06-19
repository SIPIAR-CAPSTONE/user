import { StatusBar as ExpoStatusBar } from "expo-status-bar";

const StatusBar = ({ style }) => {
  const theme = false ? "light" : "dark"; //adjust this later when theme is global or in Context
  const selectedStatusStyle = style ? style : theme;

  return <ExpoStatusBar style={selectedStatusStyle} />;
};

export default StatusBar;
