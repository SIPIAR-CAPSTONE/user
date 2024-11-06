import { Audio, AVPlaybackSource } from "expo-av";

export type AudioCue = "push" | "pushFaster" | "pushHarder" | "pushSoftly" | "pushSlowly";

export type TSoundRef = Record<AudioCue, Audio.Sound>;

export type SoundFile = {
  name: AudioCue;
  file: AVPlaybackSource;
};

export type TimingScore = "Perfect" | "Too Early" | "Missed";

export type DepthScore = "Perfect" | "Too Deep" | "Too Shallow";

export type OverallScore = "green" | "yellow" | "red" | "gray";

export type Compression = {
  compressionDepth: number | null;
  depthScore: DepthScore | null;
  timingScore:  TimingScore | null;
  overallScore: OverallScore | null;
};
export type CompressionRecord = {
  scores: Compression,
  time: number 
} 

export type CompressionScore = Omit<Compression, "compressionDepth">;