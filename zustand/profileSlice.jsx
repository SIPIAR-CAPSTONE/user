import { setItem } from '../utils/LocalStorage'

const DEFAULT_VERIFICATION_FORM = {
  firstName: '',
  middleName: '',
  lastName: '',
  suffix: '',
  birthday: new Date(),
  phone: 0,
  barangay: '',
  street: '',
  houseNumber: '',
  selectedIdType: '',
}

export const createProfileSlice = (set) => ({
  currentThemeStatus: "light",
  verificationForm: DEFAULT_VERIFICATION_FORM,
  profilePicturePath: null,
  setVerificationForm: (key, newValue) =>
    set((state) => ({
      verificationForm: { ...state.verificationForm, [key]: newValue },
    })),
  resetVerification: () => set({ verificationForm: DEFAULT_VERIFICATION_FORM }),
  setThemeStatus: (newThemeStatus) => {
    if (newThemeStatus == null) {
      //if given new theme is null set current theme with light theme as default
      set({ currentThemeStatus: "light" })
    } else {
      //set new theme in state
      set({ currentThemeStatus: newThemeStatus })
      //set new theme in localStorage
      setItem('theme', newThemeStatus)
    }
  },
  setProfilePicturePath: (state) => set({ profilePicturePath: state }),
  removeProfilePicturePath: () => set({ profilePicturePath: null }),
})
