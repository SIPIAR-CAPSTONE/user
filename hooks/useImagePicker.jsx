import { Alert, Linking, ToastAndroid } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import useBoundStore from "../zustand/useBoundStore";

const useImagePicker = () => {
  const navigation = useNavigation();
  const setBase64ImageFormat = useBoundStore(
    (state) => state.setBase64ImageFormat
  );
  const setBase64VerOne = useBoundStore((state) => state.setBase64VerOne);
  const setBase64VerTwo = useBoundStore((state) => state.setBase64VerTwo);
  const setBase64BugReport = useBoundStore((state) => state.setBase64BugReport);

  // On first screen load ask user permision to access their camera
  useEffect(() => {
    (async () => {
      // Ask for camera permissions
      const { status } = await ImagePicker.requestCameraPermissionsAsync();

      if (status !== "granted") {
        Alert.alert(
          "Permission Denied",
          "You cannot access this feature because you denied the permision request. Please go to the app setting and change the Camera, Files and Media permision to access this feature.",
          [
            {
              text: "Open Settings",
              onPress: () => {
                navigation.navigate("ProfileScreen");
                Linking.openSettings();
              },
            },
            {
              text: "back",
              onPress: () => navigation.navigate("ProfileScreen"),
              style: "cancel",
            },
          ]
        );
        return;
      }
    })();
  }, []);

  const takePicture = async (setImageCallBack) => {
    // Launch the camera
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });
    setBase64ImageFormat(result.assets[0].base64);
    if (!result.canceled) {
      setImageCallBack(result.assets[0].uri);
    }
  };

  const pickImage = async (setImageCallBack) => {
    try {
      // No permissions request is necessary for launching the image library
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        base64: true,
      });
      setBase64ImageFormat(result.assets[0].base64);
      if (!result.canceled) {
        setImageCallBack(result.assets[0].uri);
      }
    } catch (error) {
      if (error.message === "Cannot convert null value to object") {
        ToastAndroid.show("Please select an image", ToastAndroid.SHORT);
      } else {
        console.log(error.message);
      }
    }
  };

  const verificationIdCapturerOne = async (setImageCallBack) => {
    try {
      // Launch the camera
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        base64: true,
      });
      setBase64VerOne(result.assets[0].base64);
      if (!result.canceled) {
        setImageCallBack(result.assets[0].uri);
      }
    } catch (error) {
      if (error.message === "Cannot convert null value to object") {
        ToastAndroid.show("Please select an image", ToastAndroid.SHORT);
      } else {
        console.log(error.message);
      }
    }
  };

  const verificationIdCapturerTwo = async (setImageCallBack) => {
    try {
      // Launch the camera
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        base64: true,
      });
      setBase64VerTwo(result.assets[0].base64);
      if (!result.canceled) {
        setImageCallBack(result.assets[0].uri);
      }
    } catch (error) {
      if (error.message === "Cannot convert null value to object") {
        ToastAndroid.show("Please select an image", ToastAndroid.SHORT);
      } else {
        console.log(error.message);
      }
    }
  };

  const bugReportCapture = async (setImageCallBack) => {
    try {
      // No permissions request is necessary for launching the image library
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        base64: true,
      });
      setBase64BugReport(result.assets[0].base64);
      if (!result.canceled) {
        setImageCallBack(result.assets[0].uri);
      }
    } catch (error) {
      if (error.message === "Cannot convert null value to object") {
        ToastAndroid.show("Please select an image", ToastAndroid.SHORT);
      } else {
        console.log(error.message);
      }
    }
  };

  return {
    takePicture,
    pickImage,
    verificationIdCapturerOne,
    verificationIdCapturerTwo,
    bugReportCapture,
  };
};

export default useImagePicker;
