import { ToastAndroid } from "react-native";
import useBoundStore from "../zustand/useBoundStore";

const useUserMetadata = () => {
  const setUserMetaData = useBoundStore((state) => state.setUserMetaData);
  const removeUserMetaData = useBoundStore((state) => state.removeUserMetaData);

  //! setter and remover for global state variables
  const setState = (session) => {
    try {
      setUserMetaData({
        bystanderId: session['user']['id'],
        firstName: session['user']['user_metadata']['first_name'],
        middleName: session['user']['user_metadata']['middle_name'],
        lastName: session['user']['user_metadata']['last_name'],
        suffix: session['user']['user_metadata']['suffix'],
        birthday: session['user']['user_metadata']['birth_date'],
        phone: session['user']['user_metadata']['phone_number'],
        barangay: session['user']['user_metadata']['barangay'],
        street: session['user']['user_metadata']['street'],
        houseNumber: session['user']['user_metadata']['house_number'],
        email: session['user']['user_metadata']['email'],
      })
    } catch (error) {
      ToastAndroid.show(`${error.message}`, ToastAndroid.SHORT);
    }
  };

  const removeState = () => {
    try {
      removeUserMetaData();
    } catch (error) {
      ToastAndroid.show(`${error.message}`, ToastAndroid.SHORT);
    }
  };
  return { setState, removeState };
};

export default useUserMetadata;
