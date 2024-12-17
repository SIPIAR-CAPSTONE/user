import { Feedback, Score } from "./cprEnum";

const COMPRESSION_THRESHOLD = 1.15;
const TARGET_INTERVAL_MS = 500;
const TOLERANCE_MS = 50;
const GRAVITY = 9.81; // Gravity constant in m/s^2
const TIME_INTERVAL = 0.01667; // 60Hz = 16.67ms
const INCHES_PER_METER = 39.3701;
const CALIBRATION_FACTOR = 38.85; //* Adjust based on real-world testing (example 38.85)

export function calculateDepth(z) {
  const verticalAcceleration = Math.abs(z - GRAVITY);
  const depth = 0.5 * verticalAcceleration * Math.pow(TIME_INTERVAL, 2);
  return (depth * INCHES_PER_METER * CALIBRATION_FACTOR).toFixed(2);
}

export function lowPassFilter(currentValue, previousValue, alpha = 0.6) {
  return alpha * currentValue + (1 - alpha) * previousValue;
}

export function isCompression(magnitude, lastCompressionTime) {
  const now = Date.now();

  return (
    magnitude > COMPRESSION_THRESHOLD &&
    (!lastCompressionTime || now - lastCompressionTime > 200) // Prevent double-counting of compression
  );
}

export function calculateMagnitude({ x, y, z }) {
  return Math.sqrt(x * x + y * y + z * z).toFixed(2);
}

export function getDepthScore(depth) {
  if (depth > 2.5) {
    return Score.TooDeep;
  } else if (depth < 2) {
    return Score.TooShallow;
  } else {
    return Score.Perfect;
  }
}

export function getTimingScore(compressionInterval) {
  //450ms ≤ compression_interval ≤ 550ms
    if (Math.abs(compressionInterval - TARGET_INTERVAL_MS) <= TOLERANCE_MS) {
      return Score.Perfect;
    } 
  //compression_interval < 450ms
  else if (compressionInterval < TARGET_INTERVAL_MS - TOLERANCE_MS) {
      return Score.TooFast;
    } 
  //compression_interval > 550ms
    else {
      return Score.Missed;
    }
  }
  

export function getOverallScore(timingScore, depthScore) {
  if (timingScore === Score.Perfect && depthScore === Score.Perfect) {
    return Feedback.Push;
  } else if (timingScore === Score.Perfect && depthScore === Score.TooShallow) {
    return Feedback.PushHarder;
  } else if (timingScore === Score.Perfect && depthScore === Score.TooDeep) {
    return Feedback.PushSoftly;
  } else if (timingScore === Score.TooFast && depthScore === Score.Perfect) {
    return Feedback.PushSlower;
  } else if (timingScore === Score.TooFast && depthScore === Score.TooShallow) {
    return Feedback.PushSlowerHarder;
  } else if (timingScore === Score.TooFast && depthScore === Score.TooDeep) {
    return Feedback.PushSlowerSoftly;
  } else if (timingScore === Score.Missed && depthScore === Score.TooShallow) {
    return Feedback.PushFasterHarder;
  } else if (timingScore === Score.Missed && depthScore === Score.Perfect) {
    return Feedback.PushFaster;
  } else if (timingScore === Score.Missed && depthScore === Score.TooDeep) {
    return Feedback.PushFasterSoftly;
  } else if (timingScore === Score.Missed && depthScore === Score.Missed) {
    return Feedback.PleasePush;
  } else {
    return Feedback.Push;
  }
}

const colorStyle = {
  green: {
    backgroundColor: "#22C55E",
    borderColor: "#1CAE52",
  },
  darkerGreen: {
    backgroundColor: "#16A34A",
    borderColor: "#138E3B",
  },
  red: {
    backgroundColor: "#DC2626",
    borderColor: "#BB1E1E",
  },
  yellow: {
    backgroundColor: "#F59E0B",
    borderColor: "#D48806",
  },
  gray: {
    backgroundColor: "#bab8b8",
    borderColor: "#a6a6a6",
  },
};

export function getOverallScoreColor(score) {
  switch (score) {
    case Feedback.Push:
      return colorStyle.green;
    case Feedback.PushSlower:
    case Feedback.PushSoftly:
    case Feedback.PushFasterSoftly:
    case Feedback.PushSlowerSoftly:
    case Feedback.PushSlowerHarder:
    case Feedback.PleasePush:
      return colorStyle.red;
    case Feedback.PushFaster:
    case Feedback.PushHarder:
    case Feedback.PushFasterHarder:
      return colorStyle.yellow;
    default:
      return colorStyle.gray;
  }
}

export function getScoreColor(score) {
  switch (score) {
    case Score.Perfect:
      return colorStyle.green;
    case Score.TooShallow:
      return colorStyle.yellow;
    case Score.TooDeep:
    case Score.TooFast:
    case Score.Missed:
      return colorStyle.red;
    default:
      return colorStyle.gray;
  }
}
