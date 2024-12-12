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
const UPDATE_INTERVAL = 16.67;

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
      Accelerometer.setUpdateInterval(UPDATE_INTERVAL); // update interval to 60Hz (16.67ms)
      subscription.current = Accelerometer.addListener(handleAccelerometerData);

      compressionTimerStartTime.current = Date.now(); // Initialize the start time
      const timerInterval = setInterval(() => {
        const elapsed = Date.now() - compressionTimerStartTime.current; // Calculate the elapsed time

        // If timer exceeds the target interval, handle "Missed" scores
        if (
          elapsed >= TARGET_INTERVAL_MS + 30 &&
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
          console.log("missed");
          resetCompressionScores();
          isCompressed.current = false;
          compressionTimerStartTime.current = Date.now();
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
    const magnitude = calculateMagnitude({ x: data.x, y: data.y, z: currentZ });

    if (currentZ < lowestZ.current) {
      lowestZ.current = currentZ;
    }

    if (isCompression(magnitude, lastCompressionTime.current)) {
      console.log("compressed");
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
    }, 150);
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
