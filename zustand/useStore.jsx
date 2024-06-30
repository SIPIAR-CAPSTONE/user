import { create } from "zustand";
import { setItem, deleteItem } from "../utils/LocalStorage";

const useStore = create((set) => ({
  currentThemeStatus: "dark",
  userToken: null,
  appIsReady: false,
  signupFormOne: {
    firstName: "",
    middleName: "",
    lastName: "",
    suffix: "",
    birthday: new Date(),
    phone: 0,
  },
  signupFormTwo: {
    barangay: "",
    street: "",
    houseNumber: "",
  },
  signupFormThree: {
    email: "",
    password: "",
    confirmPassword: "",
  },
  setSignupFormOne: (key, newValue) =>
    set((state) => ({
      signupFormOne: { ...state.signupFormOne, [key]: newValue },
    })),
  setSignupFormTwo: (key, newValue) =>
    set((state) => ({
      signupFormTwo: { ...state.signupFormTwo, [key]: newValue },
    })),
  setSignupFormThree: (key, newValue) =>
    set((state) => ({
      signupFormThree: { ...state.signupFormThree, [key]: newValue },
    })),
  setThemeStatus: (newThemeStatus) => {
    const defaultTheme = "light";
    if (newThemeStatus == null) {
      set({ currentThemeStatus: defaultTheme });
    } else {
      //set new theme in state
      set({ currentThemeStatus: newThemeStatus });
      //set new theme in localStorage
      setItem("theme", newThemeStatus);
    }
  },
  setUserToken: (givenToken) => {
    set({ userToken: givenToken });
    setItem("userToken", givenToken);
  },
  removeUserToken: () => {
    set({ userToken: null });
    deleteItem("userToken");
  },
  setAppIsReady: (value) => set({ appIsReady: value }),
}));

export default useStore;
