import { create } from "zustand";
import { setItem, getItem } from "../utils/LocalStorage";

const useStore = create((set) => ({
  currentThemeStatus: "dark",
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
    //set new theme in state
    set({ currentThemeStatus: newThemeStatus });
    //set new theme in localStorage
    setItem("theme", newThemeStatus);
  },
  initThemeStatus: async () => {
    const defaultTheme = "light";
    const locallyStoredTheme = await getItem("theme");
    console.log(locallyStoredTheme);
    if (!null) {
      set({ currentThemeStatus: locallyStoredTheme });
    } else {
      set({ currentThemeStatus: defaultTheme });
    }
  },
}));

export default useStore;
