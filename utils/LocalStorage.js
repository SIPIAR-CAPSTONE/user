import AsyncStorage from "@react-native-async-storage/async-storage";
import { ToastAndroid } from "react-native";

const setItem = async (key, value) => {
  try {
    if (typeof value === "object") {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } else {
      await AsyncStorage.setItem(key, value);
    }
  } catch (e) {
    ToastAndroid.show(`${e.message}`, ToastAndroid.SHORT);
  }
};

const getItem = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value == null) {
      return null;
    }
    if (typeof value === "object") {
      return JSON.parse(value);
    } else {
      return value;
    }
  } catch (e) {
    ToastAndroid.show(`${e.message}`, ToastAndroid.SHORT);
  }
};

const deleteItem = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    ToastAndroid.show(`${e.message}`, ToastAndroid.SHORT);
  }
};

export { setItem, getItem, deleteItem };
