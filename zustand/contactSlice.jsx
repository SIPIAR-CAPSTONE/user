import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const createContactSlice = persist(
  (set) => ({
    contactList: [],
    addContact: (newContact) =>
      set((state) => ({ contactList: [...state.contactList, newContact] })),
    editContact: (newContact) =>
      set((state) => ({
        contactList: state.contactList.map((c) => {
          return c.id === newContact?.id ? newContact : c;
        }),
      })),
    removeContact: (id) =>
      set((state) => ({
        contactList: state.contactList.filter((c) => c.id !== id),
      })),
  }),
  {
    name: "emergency-contacts",
    storage: createJSONStorage(() => AsyncStorage),
  }
);
