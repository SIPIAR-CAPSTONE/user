const EMPTY_COMPRESSION_HISTORY = [
  {
    score: {
      compressionDepth: null,
      depthScore: null,
      timingScore: null,
      overallScore: null,
    },
    time: "00:00",
  },
];

export const createCprSlice = (set) => ({
  compressionHistory: EMPTY_COMPRESSION_HISTORY,
  setCompressionHistory: (newCompressionHistory) =>
    set({ compressionHistory: newCompressionHistory }),
  clearCompressionHistory: () =>
    set({ compressionHistory: EMPTY_COMPRESSION_HISTORY }),
});
