import { DepthScore, OverallScore, TimingScore } from "./useCpr.types";

const ACCELERATION_THRESHOLD = 0.3;

export const isCompressionStarted = (prevZ: number, currentZ: number): boolean => {
  return prevZ - currentZ > ACCELERATION_THRESHOLD;
};

export const isCompressionEnded = (prevZ: number, currentZ: number, isCompressing: boolean): boolean => {
  return currentZ - prevZ > ACCELERATION_THRESHOLD && isCompressing;
};


export const getcompressionTimer = (previousTime: number, currentTime: number): number => {
  const compressionTimer: number = currentTime - previousTime;
  const compressionTimerInSeconds: number = compressionTimer / 1000;

  return compressionTimerInSeconds;
};

export const getLowestZ = (lowestZ: number, currentZ: number): number => {
  const lowestZValue: number = Math.min(lowestZ, currentZ);
  return lowestZValue;
};


export const getTimingScore = (compressionTimer: number): TimingScore => {
  if (compressionTimer >= 400 && compressionTimer <= 600) {
    return "Perfect"
  } else if (compressionTimer < 400) {
    return "Too Early"
  }

  return "Missed";
}

export const getDepthScore = (depth: number | null): DepthScore | null => {
  if (null === depth) return null;

  if (depth >= 2 && depth <= 2.5) {
    return "Perfect"
  } else if (depth < 2) {
    return "Too Shallow"
  } else if (depth > 2.5) {
    return "Too Deep"
  }

  return null;
}

export const getOverallScore = (timingScore: TimingScore | null, depthScore: DepthScore | null): OverallScore => {
  if (timingScore === "Perfect" && depthScore === "Perfect") {
    return "green"
  }
  else if (timingScore === "Perfect" && depthScore === "Too Shallow") {
    return "yellow"
  }
  else if (timingScore === "Too Early" && depthScore === "Perfect") {
    return "yellow"
  }
  else if (timingScore === "Too Early" && depthScore === "Too Shallow") {
    return "yellow"
  }
  else if (timingScore === "Perfect" && depthScore === "Too Deep") {
    return "red"
  }
  else if (timingScore === "Too Early" && depthScore === "Too Deep") {
    return "red"
  }
  else if (timingScore === "Missed") {
    return "red"
  }

  return "gray";
}

export const formatTime = (time: number): string => {
  const totalSeconds: number = Math.floor(time / 1000);
  const minutes: number = Math.floor(totalSeconds / 60);
  const seconds: number = totalSeconds % 60;

  return `${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""
    }${seconds}`;
};