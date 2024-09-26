export const createCprSlice = (set) => ({
  compressionHistory: [],
  setCompressionHistory: (newCompressionHistory) =>
    set({ compressionHistory: newCompressionHistory }),
  clearCompressionHistory: () => set({ compressionHistory: [] }),
});
