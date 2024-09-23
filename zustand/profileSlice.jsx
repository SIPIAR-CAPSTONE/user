import { setItem } from "../utils/LocalStorage";

const DEFAULT_VERIFICATION_FORM = {
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
};

export const createProfileSlice = (set, get) => ({
  currentThemeStatus: "light",
  verificationForm: DEFAULT_VERIFICATION_FORM, // Initialize with default values
  profilePicturePath: null,

  setVerificationForm: (key, newValue) =>
    set((state) => ({
      verificationForm: { ...state.verificationForm, [key]: newValue },
    })),

  resetVerification: () => {
    const userMetaData = get().userMetaData || {};
    set({
      verificationForm: {
        ...DEFAULT_VERIFICATION_FORM,
        ...userMetaData, // Reset with userMetaData if available
      },
    });
  },

  //!temporary solution
  initializeVerificationForm: () => {
    const userMetaData = get().userMetaData || {};
    set({
      verificationForm: {
        ...DEFAULT_VERIFICATION_FORM,
        ...userMetaData, // Merge userMetaData into verificationForm
      },
    });
  },

  setThemeStatus: (newThemeStatus) => {
    if (newThemeStatus == null) {
      set({ currentThemeStatus: "light" });
    } else {
      set({ currentThemeStatus: newThemeStatus });
      setItem("theme", newThemeStatus);
    }
  },

  setProfilePicturePath: (state) => set({ profilePicturePath: state }),
  removeProfilePicturePath: () => set({ profilePicturePath: null }),
});
