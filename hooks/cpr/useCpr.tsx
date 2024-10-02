import { useEffect, useRef, useCallback, useState } from "react";
import { Accelerometer } from "expo-sensors";

import {
  type TimingScore,
  type Compression,
  type CompressionRecord,
} from "./useCpr.types";
import {
  isCompressionStarted,
  isCompressionEnded,
  getLowestZ,
  getTimingScore,
  getDepthScore,
  getOverallScore,
} from "./useCpr.helper";
import useTimer from "./useTimer";
import useAudioCue from "./useAudioCue";
import useHistory from "./useHistory";

// Initial empty compression value
const EMPTY_COMPRESSION_VALUE: Compression = {
  compressionDepth: null,
  depthScore: null,
  timingScore: null,
  overallScore: null,
};

const useCpr = () => {
  const { playAudioCue } = useAudioCue();
  const {
    timer,
    timerInSeconds,
    compressionTimer,
    resetCompressionTimer,
    startTimer,
    resetTimer,
  } = useTimer();
  const {
    history,
    clear: clearHistory,
    record: recordHistory,
  } = useHistory<CompressionRecord>();
  const [isSubscribed, setIsSubscribed] = useState(false);
  const timingScore = useRef<TimingScore | null>(null);
  const compressionDepth = useRef<number | null>(null);
  const [currentCompressionScore, setCurrentCompressionScore] =
    useState<Compression>(EMPTY_COMPRESSION_VALUE);

  //prevCompressionScores stores the previous compression scores to be use for audio cue
  const prevCompressionScores = useRef<Compression>(EMPTY_COMPRESSION_VALUE);
  const prevZ = useRef(0);
  const lowestZ = useRef(0);
  const isCompressing = useRef(false);

  // this will be executed when start and stop cpr is called
  useEffect(() => {
    if (isSubscribed) {
      // here we observe the acceleration of z data to determine if compression is performed
      Accelerometer.setUpdateInterval(16);
      const subscription = Accelerometer.addListener((data) => {
        observeAcceleration(data.z, compressionTimer);
      });

      //This is where we check if the audio cue should be played and when should get the compression score
      if (compressionTimer >= 400 && compressionTimer < 600) {
        playAudioCue(prevCompressionScores.current);
      }
      if (compressionTimer >= 600) {
        getCompressionScores(timerInSeconds);
        resetCompressionTimer();
      }

      return () => subscription && subscription.remove();
    }

    return () => Accelerometer.removeAllListeners();
  }, [isSubscribed, compressionTimer]);

  // This will observe the acceleration of z data to check if there is movement or compression is performed
  const observeAcceleration = useCallback(
    (currentZ: number, compressionTimer: number) => {
      const currentLowestZ = getLowestZ(lowestZ.current, currentZ);
      
      if (isCompressionStarted(prevZ.current, currentZ)) {
        isCompressing.current = true;
        lowestZ.current = currentLowestZ;
      }
      if (isCompressionEnded(prevZ.current, currentZ, isCompressing.current)) {
        compressionDepth.current = calculateDepth(currentLowestZ, currentZ);
        timingScore.current = getTimingScore(compressionTimer);

        //reset compression state
        isCompressing.current = false;
        lowestZ.current = 0;
        prevZ.current = 0;
      }

      prevZ.current = currentZ;
    },
    []
  );

  const getCompressionScores = useCallback((currentTimeInSeconds: number) => {
    const currentCompressionDepth = compressionDepth.current;
    const currentTimingScore = timingScore.current ?? "Missed";
    const currentDepthScore = getDepthScore(currentCompressionDepth);
    const currentOverallScore = getOverallScore(
      timingScore.current,
      currentDepthScore
    );

    const currentCompressionScore: Compression = {
      depthScore: currentDepthScore,
      compressionDepth: currentCompressionDepth,
      overallScore: currentOverallScore,
      timingScore: currentTimingScore,
    };
    setCurrentCompressionScore(currentCompressionScore);
    prevCompressionScores.current = currentCompressionScore;

    //record cpr scores for history purpose
    const compressionScoreRecord: CompressionRecord = {
      scores: currentCompressionScore,
      time: currentTimeInSeconds,
    };
    recordHistory(compressionScoreRecord);

    //reset compression state
    compressionDepth.current = null;
    timingScore.current = null;
    //The timeout delay is the duration the score ui will be shown
    setTimeout(() => {
      setCurrentCompressionScore(EMPTY_COMPRESSION_VALUE);
    }, 150);
  }, []);

  // Function to calculate compression depth in inches
  const calculateDepth = useCallback(
    (lowestZ: number, currentZ: number): number => {
      const zAccelerationPeakGap = Math.abs(currentZ - lowestZ);
      const gForceToInches = 0.3937;
      //* for tuning accuracy, the greater the number the more sensitive
      const calibrationFactor = 4;
      const depthInInches = Math.abs(
        zAccelerationPeakGap * calibrationFactor * gForceToInches
      );
      return Number(depthInInches.toFixed(1));
    },
    []
  );

  const start = () => {
    startTimer();
    setIsSubscribed(true);
  };

  const stop = () => {
    resetTimer();
    resetCompressionTimer();
    setIsSubscribed(false);
    Accelerometer.removeAllListeners();
    clearCprState();
    clearHistory();
  };

  const clearCprState = () => {
    lowestZ.current = 0;
    prevZ.current = 0;
    timingScore.current = null;
    compressionDepth.current = null;
  };

  return {
    start,
    stop,
    currentCompressionScore,
    timer,
    compressionTimer,
    history,
  };
};

export default useCpr;
