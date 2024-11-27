const ACCELERATION_THRESHOLD = 0.4; // if z is greater than the thershold, then compression is started and if its lower, then compression is ended
const ACCELERATION_BASELINE = 1.0;
const INCHES_PER_METER = 39.37;
const SENSITIVITY = 0.025; //* (0.025) for tuning accuracy, the greater the number the more sensitive the calculation of gap is

//* FOR CPR CALIBRATION PURPOSE: adjust only the ACCELERATION_THERSHOLD and SENSITIVITY value *//

export const calculateDepth = (currentZ) => {
  const zAccelerationPeakGap = ACCELERATION_BASELINE - currentZ;
  const depthInInches = Math.abs(
    zAccelerationPeakGap * INCHES_PER_METER * SENSITIVITY
  );
  return Number(depthInInches.toFixed(1));
};

export const isCompressionStarted = (prevZ, currentZ) => {
  return prevZ - currentZ > ACCELERATION_THRESHOLD;
};

export const isCompressionEnded = (prevZ, currentZ, isCompressing) => {
  return currentZ - prevZ > ACCELERATION_THRESHOLD && isCompressing;
};

export const getcompressionTimer = (previousTime, currentTime) => {
  const compressionTimer = currentTime - previousTime;
  const compressionTimerInSeconds = compressionTimer / 1000;

  return compressionTimerInSeconds;
};

export const getTimingScore = (compressionTimer) => {
  if (compressionTimer >= 400 && compressionTimer <= 600) {
    return "Perfect";
  } else if (compressionTimer < 400) {
    return "Too Early";
  }

  return "Missed";
};

export const getDepthScore = (depth) => {
  if (depth === null) return null;

  if (depth >= 2 && depth <= 2.5) {
    return "Perfect";
  } else if (depth < 2) {
    return "Too Shallow";
  } else if (depth > 2.5) {
    return "Too Deep";
  }

  return null;
};

export const getOverallScore = (timingScore, depthScore) => {
  if (timingScore === "Perfect" && depthScore === "Perfect") {
    return "green";
  } else if (timingScore === "Perfect" && depthScore === "Too Shallow") {
    return "yellow";
  } else if (timingScore === "Too Early" && depthScore === "Perfect") {
    return "yellow";
  } else if (timingScore === "Too Early" && depthScore === "Too Shallow") {
    return "yellow";
  } else if (timingScore === "Perfect" && depthScore === "Too Deep") {
    return "red";
  } else if (timingScore === "Too Early" && depthScore === "Too Deep") {
    return "red";
  } else if (timingScore === "Missed") {
    return "red";
  }

  return "gray";
};

export const formatTime = (time) => {
  const totalSeconds = Math.floor(time / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const formattedTime = `${minutes < 10 ? "0" : ""}${minutes}:${
    seconds < 10 ? "0" : ""
  }${seconds}`;

  return formattedTime;
};
