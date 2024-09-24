import { ScrollView, View } from "react-native";
import { useTheme } from "react-native-paper";

import StatusBar from "./StatusBar";
import NotInternetAlert from "./NoInternetAlert";
import NoInternetBar from "./NoInternetBar";

const Layout = ({
  removeDefaultStatusBar = false,
  statusBarTheme,
  statusBarHidden,
  addNoInternetAlert = false,
  addNoInternetBar = false,
  removeDefaultPaddingHorizontal = false,
  scrollable = false,
  style,
  contentContainerStyle,
  children,
  ...props
}) => {
  const theme = useTheme();

  const paddingHorizontalStyle = !removeDefaultPaddingHorizontal && {
    paddingHorizontal: theme.spacing.base,
  };

  if (scrollable) {
    return (
      <>
        <ScrollView
          style={style}
          contentContainerStyle={[
            contentContainerStyle,
            paddingHorizontalStyle,
          ]}
          {...props}
        >
          {children}
        </ScrollView>
        {!removeDefaultStatusBar && (
          <StatusBar style={statusBarTheme} hidden={statusBarHidden} />
        )}
        {addNoInternetAlert && <NotInternetAlert />}
        {addNoInternetBar && <NoInternetBar />}
      </>
    );
  }

  return (
    <>
      <View style={[{ flex: 1 }, style, paddingHorizontalStyle]}>
        {children}
      </View>

      {!removeDefaultStatusBar && (
        <StatusBar style={statusBarTheme} hidden={statusBarHidden} />
      )}
      {addNoInternetAlert && <NotInternetAlert />}
      {addNoInternetBar && <NoInternetBar />}
    </>
  );
};

export default Layout;
