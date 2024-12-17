import { useState, useRef, useEffect, useCallback } from "react";
import { Accelerometer } from "expo-sensors";
import {
  calculateDepth,
  calculateMagnitude,
  getDepthScore,
  getOverallScore,
  getTimingScore,
  isCompression,
  lowPassFilter,
} from "./useCpr.helper";

const TARGET_INTERVAL_MS = 500;
const UPDATE_INTERVAL = 16.67; //60Hz (16.67ms)

const useCpr = () => {
  const [isSessionStarted, setIsSessionStarted] = useState(false);
  const subscription = useRef(null);
  const lowestZ = useRef(1);
  const lastCompressionTime = useRef(null);
  const isCompressed = useRef(false);
  const compressionTimerStartTime = useRef(null);
  const [compressionScores, setCompressionScores] = useState({
    timing: "",
    depth: "",
    overall: "",
  });

  useEffect(() => {
    if (isSessionStarted) {
      Accelerometer.setUpdateInterval(UPDATE_INTERVAL);
      subscription.current = Accelerometer.addListener(handleAccelerometerData);

      //set initial value the first time session started
      lastCompressionTime.current = Date.now() - 100;
      compressionTimerStartTime.current = Date.now();

      const timerInterval = setInterval(() => {
        const elapsed = Date.now() - compressionTimerStartTime.current;

        // If timer exceeds the target interval, handle "Missed" scores
        if (
          elapsed >= TARGET_INTERVAL_MS + 25 &&
          compressionScores.overall === ""
        ) {
          if (isCompressed.current === false) {
            const overallScore = getOverallScore("Missed", "Missed");
            setCompressionScores({
              timing: "Missed",
              depth: "Missed",
              overall: overallScore,
            });
          }
          resetCompressionScores();
          isCompressed.current = false;
          compressionTimerStartTime.current = Date.now();
          lastCompressionTime.current = Date.now();
        }
      }, UPDATE_INTERVAL);

      return () => {
        clearInterval(timerInterval);
        subscription.current?.remove();
      };
    } else {
      subscription.current?.remove();
    }
  }, [isSessionStarted]);

  const handleAccelerometerData = useCallback((data) => {
    const currentZ = lowPassFilter(data.z, lowestZ.current);
    const magnitude = calculateMagnitude({ x: data.x, y: data.y, z: data.z });

    if (currentZ < lowestZ.current) {
      lowestZ.current = currentZ;
    }

    if (isCompression(magnitude, lastCompressionTime.current)) {
      isCompressed.current = true;

      // Calculate depth based on the z-axis acceleration
      const depth = calculateDepth(lowestZ.current);
      const depthScore = getDepthScore(depth);

      // Evaluate timing
      const now = Date.now();
      const compressionInterval = now - lastCompressionTime.current;

      const timingScore = getTimingScore(compressionInterval);

      const overallScore = getOverallScore(timingScore, depthScore);
      setCompressionScores({
        timing: timingScore,
        depth: depthScore,
        overall: overallScore,
      });

      resetCompressionScores();
      lastCompressionTime.current = now;
      compressionTimerStartTime.current = Date.now();
      lowestZ.current = 1;
    } else {
      isCompressed.current = false;
    }
  }, []);

  const resetCompressionScores = () => {
    setTimeout(() => {
      setCompressionScores({
        timing: "",
        depth: "",
        overall: "",
      });
    }, 100);
  };

  const startSession = () => {
    setCompressionScores({
      timing: "",
      depth: "",
      overall: "",
    });
    lastCompressionTime.current = null;
    compressionTimerStartTime.current = Date.now();
    setIsSessionStarted(true);
  };

  const stopSession = () => {
    setIsSessionStarted(false);
  };

  return {
    compressionScores,
    isSessionStarted,
    startSession,
    stopSession,
  };
};

export default useCpr;
