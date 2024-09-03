import { useRef, useState, useEffect, useCallback } from "react";
import { Accelerometer } from "expo-sensors";
import {
  getDepthScore,
  getOverallScore,
  getTimingScore,
  playAudioCue,
} from "./helper";
import usePreloadedAudio from "./usePreloadedAudio";
import useTimer from "./useTimer";
import { type Compression, type CompressionRecord } from "./useCpr.types";

// Initial empty compression value
const EMPTY_COMPRESSION_VALUE: Compression = {
  depthAttempt: 0,
  depthScore: null,
  timingScore: null,
  overallScore: null,
};

const useCpr = () => {
  const soundsRef = usePreloadedAudio(); // pre load the audio files for cues
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);
  const prevZ = useRef<number>(0);
  const depth = useRef<number>(0);
  const {
    msCounter,
    rawTimer,
    timer,
    timerOn,
    setTimerOn,
    resetTimer,
    resetMsCounter,
  } = useTimer();

  const [currentCompressionScore, setCurrentCompressionScore] =
    useState<Compression>(EMPTY_COMPRESSION_VALUE);
  const prevCompressionScore = useRef<Compression>(EMPTY_COMPRESSION_VALUE); //it is used for voice cue
  const compressionHistory = useRef<Array<CompressionRecord>>([]);
  const formattedTime = (rawTimer * 0.001).toFixed(1);

  // perform playinfAudioCue and getting compression score when conditions are met
  useEffect(() => {
    if (timerOn) {
      if (msCounter >= 500 && msCounter < 600) {
        playAudioCue(prevCompressionScore, soundsRef);
      }
      if (msCounter >= 600) {
        getCompressionScore(formattedTime);
        resetMsCounter();
      }
    }
  }, [timerOn, msCounter]);

  const calculateDepth = useCallback(
    (z: number): void => {
      const deltaZ: number = z - prevZ.current;
      const calibrationFactor: number = 4.5;
      const gForceToInches: number = 0.3937;
      const compressionDepth: number = Math.abs(
        deltaZ * calibrationFactor * gForceToInches
      );
      depth.current = Number(compressionDepth.toFixed(1));
      prevZ.current = z;
    },
    [isSubscribed]
  );

  const getCompressionScore = useCallback(
    (formattedTime: string): void => {
      if (timerOn) {
        const depthAttempt = depth.current;
        const depthScore = getDepthScore(depthAttempt);
        const timingScore = getTimingScore(depthAttempt);
        const overallScore = getOverallScore(depthScore, timingScore);

        const currentScore: Compression = {
          depthAttempt,
          depthScore,
          timingScore,
          overallScore,
        };

        setCurrentCompressionScore(currentScore);
        prevCompressionScore.current = currentScore;

        // Record the current compression score with a timestamp
        recordCompressionHistory(currentScore, formattedTime);

        
        // Clear the current compression score after a brief delay
        setTimeout(() => {
          setCurrentCompressionScore(EMPTY_COMPRESSION_VALUE);
        }, 150);
      }
    },
    [timerOn]
  );

  const recordCompressionHistory = (score: Compression, time: string): void => {
    const currentCompressionRecord: CompressionRecord = {
      score: score,
      time: time,
    };

    compressionHistory.current.push(currentCompressionRecord);
  };

  const clearCompressionHistory = (): void => {
    compressionHistory.current.length = 0;
  };

  const subscribe = useCallback((): void => {
    Accelerometer.setUpdateInterval(16);

    const subscription = Accelerometer.addListener((data) => {
      calculateDepth(data.z);
    });

    if (subscription) setIsSubscribed(true);
  }, [isSubscribed]);

  const unsubscribe = (): void => {
    Accelerometer.removeAllListeners();
    setIsSubscribed(false);
    depth.current = 0;
    prevCompressionScore.current = EMPTY_COMPRESSION_VALUE;
    setCurrentCompressionScore(EMPTY_COMPRESSION_VALUE);
    resetTimer();
    clearCompressionHistory();
  };

  const startCpr = (): void => {
    subscribe();
    setTimerOn(true);
  };

  const stopCpr = (): void => {
    unsubscribe();
    setTimerOn(false);
  };


  return {
    timerOn,
    timer,
    startCpr,
    stopCpr,
    currentCompressionScore,
    depth: depth.current,
    compressionHistory: compressionHistory.current,
  };
};

export default useCpr;
