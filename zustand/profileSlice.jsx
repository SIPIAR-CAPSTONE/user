import { themeStatus } from "../utils/theme";
import { setItem } from "../utils/LocalStorage";

export const createProfileSlice = (set) => ({
  currentThemeStatus: themeStatus.light,
  verificationForm: {
    firstName: "",
    middleName: "",
    lastName: "",
    suffix: "",
    birthday: new Date(),
    phone: 0,
    barangay: "",
    street: "",
    houseNumber: "",
    selectedIdType: "",
  },
  verificationCurrentStep: 0,
  goVerificationNextStep: () =>
    set((state) => ({
      verificationCurrentStep: state.verificationCurrentStep + 1,
    })),
  setVerificationForm: (key, newValue) =>
    set((state) => ({
      verificationForm: { ...state.verificationForm, [key]: newValue },
    })),
  setThemeStatus: (newThemeStatus) => {
    if (newThemeStatus == null) {
      //if given new theme is null set current theme with light theme as default
      set({ currentThemeStatus: themeStatus.light });
    } else {
      //set new theme in state
      set({ currentThemeStatus: newThemeStatus });
      //set new theme in localStorage
      setItem("theme", newThemeStatus);
    }
  },
});
