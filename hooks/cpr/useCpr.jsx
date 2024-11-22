import { useEffect, useRef, useCallback, useState } from "react";
import { Accelerometer } from "expo-sensors";

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
const EMPTY_COMPRESSION_VALUE = {
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
  const { history, clear: clearHistory, record: recordHistory } = useHistory();
  const [isSubscribed, setIsSubscribed] = useState(false);
  const timingScore = useRef(null);
  const compressionDepth = useRef(null);
  const [currentCompressionScore, setCurrentCompressionScore] = useState(
    EMPTY_COMPRESSION_VALUE
  );

  //prevCompressionScores stores the previous compression scores to be use for audio cue
  const prevCompressionScores = useRef(EMPTY_COMPRESSION_VALUE);
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
  const observeAcceleration = useCallback((currentZ, compressionTimer) => {
    const currentLowestZ = getLowestZ(lowestZ.current, currentZ);

    //Marks the beginning of a chest compression.
    if (isCompressionStarted(prevZ.current, currentZ)) {
      isCompressing.current = true; // Compression starts when Z drops below a threshold
      lowestZ.current = currentLowestZ;
    }
    //Marks the end of the compression and getting the scores for depth and timing
    if (isCompressionEnded(prevZ.current, currentZ, isCompressing.current)) {
      compressionDepth.current = calculateDepth(currentLowestZ, currentZ);
      timingScore.current = getTimingScore(compressionTimer);

      // Reset compression-related variables
      isCompressing.current = false;
      lowestZ.current = 0;
      prevZ.current = 0;
    }

    prevZ.current = currentZ;
  }, []);

  const calculateDepth = useCallback((lowestZ, currentZ) => {
    const zDisplacement = Math.abs(currentZ - lowestZ);
    const inchesPerMeter = 39.37;
    const sensitivity = 0.025; //* for tuning accuracy, the greater the number the more sensitive the calculation of gap is
    const depthInInches = Math.abs(
      zDisplacement * inchesPerMeter * sensitivity
    );
    return Number(depthInInches.toFixed(1));
  }, []);

  const getCompressionScores = useCallback((currentTimeInSeconds) => {
    const currentCompressionDepth = compressionDepth.current;
    const currentTimingScore = timingScore.current ?? "Missed";
    const currentDepthScore = getDepthScore(currentCompressionDepth);
    const currentOverallScore = getOverallScore(
      timingScore.current,
      currentDepthScore
    );

    const currentCompressionScore = {
      depthScore: currentDepthScore,
      compressionDepth: currentCompressionDepth,
      overallScore: currentOverallScore,
      timingScore: currentTimingScore,
    };
    setCurrentCompressionScore(currentCompressionScore);
    //hold current compression scores in prevCompressionScores for audio cue
    prevCompressionScores.current = currentCompressionScore;

    //record cpr scores for history purpose
    const compressionScoreRecord = {
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
