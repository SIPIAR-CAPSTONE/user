import { create } from "zustand";
import { setItem, getItem, deleteItem } from "../utils/LocalStorage";

const useStore = create((set) => ({
  currentThemeStatus: "dark",
  isUserAuthenticated: false,
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
  // Check if there is a theme stored locally
  initThemeStatus: async () => {
    const defaultTheme = "light";
    const locallyStoredTheme = await getItem("theme");

    if (!null) {
      set({ currentThemeStatus: locallyStoredTheme });
    } else {
      set({ currentThemeStatus: defaultTheme });
    }
  },
  setUserIsAuthenticated: (userToken) => {
    //set isAuthenticated state to true
    set({ isUserAuthenticated: true });

    //store userToken locally
    setItem("userToken", userToken);
  },
  setUserIsNotAuthenticated: () => {
    //set isAuthenticated state to false
    set({ isUserAuthenticated: false });

    //store userToken locally
    deleteItem("userToken");
  },
}));

export default useStore;
