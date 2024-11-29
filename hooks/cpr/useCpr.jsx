import { useEffect, useRef, useCallback, useState } from "react";
import { Accelerometer } from "expo-sensors";

import {
  isCompressionStarted,
  isCompressionEnded,
  getTimingScore,
  getDepthScore,
  getOverallScore,
  calculateDepth,
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
  const audioIsNotPlaying = useRef(true);

  //prevCompressionScores stores the previous compression scores to be use for audio cue
  const prevCompressionScores = useRef(EMPTY_COMPRESSION_VALUE);
  const isCompressing = useRef(false);
  const prevZ = useRef(0);
  const peakZ = useRef(null);

  // this will be executed when start and stop cpr is called
  useEffect(() => {
    if (isSubscribed) {
      // here we observe the acceleration of z data to determine if compression is performed
      Accelerometer.setUpdateInterval(16);
      const subscription = Accelerometer.addListener((data) => {
        observeAcceleration(data.z, compressionTimer);
      });

      //This is where we check if the audio cue should be played and when should get the compression score
      if (
        compressionTimer >= 400 &&
        compressionTimer < 600 &&
        audioIsNotPlaying.current
      ) {
        playAudioCue(prevCompressionScores.current);
        audioIsNotPlaying.current = false;
      }
      if (compressionTimer >= 600) {
        getCompressionScores(timerInSeconds);
        resetCompressionTimer();
        audioIsNotPlaying.current = true;
      }

      return () => subscription && subscription.remove();
    }

    return () => Accelerometer.removeAllListeners();
  }, [isSubscribed, compressionTimer]);

  // This will observe the acceleration of z data to check if there is movement or compression is performed
  const observeAcceleration = useCallback((currentZ, compressionTimer) => {
    if (isCompressionStarted(prevZ.current, currentZ)) {
      if (peakZ.current === null || currentZ < peakZ.current) {
        peakZ.current = currentZ;
      }

      if (!isCompressing.current) {
        isCompressing.current = true;
      }
    }
    if (isCompressionEnded(prevZ.current, currentZ, isCompressing.current)) {
      compressionDepth.current = calculateDepth(peakZ.current);
      timingScore.current = getTimingScore(compressionTimer);

      // Reset compression-related variables
      isCompressing.current = false;
      peakZ.current = null;
    }

    prevZ.current = currentZ;
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
